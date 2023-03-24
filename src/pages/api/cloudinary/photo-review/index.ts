import cloudinary from "@/utils/cloudinary";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {id, image} = req.body

        try {
            const result = await cloudinary.uploader.upload(image, {
                upload_preset: "photo_review",
            })

            res.status(200).json(result)
            
        } catch (error) {
            console.log(error)
        }
    }
}