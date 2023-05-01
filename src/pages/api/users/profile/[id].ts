import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import cloudinary from "@/utils/cloudinary";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({req})
    const { id } = req.query
    const { fullname, photo } = req.body
    
    const profile = await prisma.profile.findUnique({
        where: {
            user_id: id as string
        }
    })

    if (id !== session?.user?.id) {
        return res.status(403).json({error: "You are forbidden to do this"})
    }

    if (!profile) {
        // Create profile if user profile doesnt exist
        await prisma.profile.create({
            data: {
                user_id: id as string,
            }
        })
    }

    if (req.method === "PATCH") {

        // Upload user photo to cloudinary
        try {
            const result = await cloudinary.uploader.upload(photo, {
                upload_preset: "profile_photo",
                public_id: (profile!.photo) ? profile!.photo.replace('profile-photos/', '') as string : "",
                overwrite: true
            })
            console.log(result)
            const photoPublicId = result.public_id
            const response = await prisma.profile.update({
                where: {
                    user_id: id as string
                },
                data: {
                    photo: photoPublicId
                }
            })

            const session = await getSession({req})
            session!.user!.image = result.secure_url
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    if (req.method === "PUT") {
        const response = await prisma.profile.update({
            where: {
                user_id: id as string
            },
            data: {
                fullname: fullname,            
            }
        })

        console.log(fullname, response)
        res.status(200).json(response)
    }
}