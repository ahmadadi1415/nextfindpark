import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import cloudinary from "@/utils/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query

    // Update User Review
    if (req.method === "PUT") {
        const { review, rate } = req.body
        const response = await prisma.rating.update({
            where: {
                id: parseInt(id as string),
            },
            data: {
                review: review,
                rate: rate,
            }
        })

        res.status(200).json(response)
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