import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import cloudinary from "@/utils/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query

    // Update User Review
    if (req.method === "PUT") {
        const { rate_id, parkinglot_id, user_id, rate, review, images } = req.body
        
        const rating = await prisma.rating.update({
            where: {
                id: rate_id
            },
            data: {
                rate: parseFloat(rate),
                review: review,
                parkinglot_id: parkinglot_id,
                user_id: user_id,
            }
        })

        const countRates = await prisma.rating.groupBy({
            by: ['rate'],
            _count: {
              rate: true
            }
          })

        console.log(countRates)

        let newRate = 0
        let counts = 0
        countRates.map((parkingRate) => {
            newRate += parkingRate.rate * parkingRate._count.rate
            counts += parkingRate._count.rate
        })
        
        newRate /= counts
        console.log(newRate)

        const newParkingRate = await prisma.parkingLot.update({
            where: {
                id: parseInt(parkinglot_id as string)
            },
            data: {
                rate: newRate
            }
        })

        // for (const image in images) {
        //     try {
        //         const result = await cloudinary.uploader.upload(image, {
        //             upload_preset: "user_review",
        //             overwrite: true,
        //         })

        //         const response = await prisma.ratingPictures.create({
        //             data: {
        //                 image: result.public_id,
        //                 rating_id: rating.id
        //             }
        //         })

        //     } catch (error) {
        //         return res.status(500).json(error)
        //     }
        // }


        res.status(200).json({message: "Rating is updated"})
    }

    // Delete User Review
    if (req.method === "DELETE") {

        // Get all image that user uploaded
        const rateImages = await prisma.ratingPictures.findMany({
            where: {
                rating_id: parseInt(id as string)
            },
            select: {
                image: true
            }
        })

        // Remove every image that user uploaded on the corresponding review
        for (const image in rateImages) {
            try {
                const result = await cloudinary.uploader.destroy(image)
            } catch (error) {
                res.status(500).json(error)
            }
        }
        
        // Delete user review data
        const response = await prisma.rating.delete({
            where: {
                id: parseInt(id as string)
            },
            include: {
                pict_review: true
            }
        })

        res.status(200).json(response)
    }
}