import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import cloudinary from "@/utils/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get user rating based on parkinglot id 
    if (req.method === "GET") {
        const { parkinglot_id } = req.body
        const response = await prisma.rating.findMany({
            where: {
                parkinglot_id: parkinglot_id,
            }
        })

        res.status(200).json(response)
    }

    // User posting a review
    if (req.method === "POST") {
        const { parkinglot_id, user_id, rate, review, images } = req.body
        
        const rating = await prisma.rating.create({
            data: {
                rate: rate,
                review: review,
                parkinglot_id: parkinglot_id,
                user_id: user_id, 
            }
        })

        const parkingRating = await prisma.rating.findMany({
            where: {
                parkinglot_id: parkinglot_id
            },
            select: {
                _count: true,
                rate: true,
            }
        }).then((ratings) => {
            // Update Rate inside ParkingLot table
        })

        for (const image in images) {
            try {
                const result = await cloudinary.uploader.upload(image, {
                    upload_preset: "user_review"
                })

                const response = await prisma.ratingPictures.create({
                    data: {
                        image: result.public_id,
                        rating_id: rating.id
                    }
                })
                
            } catch (error) {
                return res.status(500).json(error)
            }
        }

        res.status(201).json({message: "Rating sended and photo was uploaded"})
    }
}