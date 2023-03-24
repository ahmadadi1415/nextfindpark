import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import cloudinary from "@/utils/cloudinary";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { image } = req.body

    if (req.method === "POST") {

        try {
            const userProfile = await prisma.profile.findUnique({
                where: {
                    user_id: "id"
                },
                select: {
                    photo: true
                }
            })

            const result = await cloudinary.uploader.upload(image, {
                upload_preset: "profile_photo",
                public_id: userProfile?.photo ?? "",
                overwrite: true
            })

            res.status(200).json(result)

        } catch (error) {
            console.log(error)
        }
    }
}