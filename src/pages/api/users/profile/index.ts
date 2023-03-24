import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const { fullname, user_id } = req.body

        const response = await prisma.profile.create({
            data: {
                fullname: fullname,
                user_id: user_id,
            }
        })
        res.status(200).json(response)
    }

    if (req.method === "GET") {
        const session = await getSession({req})
        const user_id = session?.user?.id
        const response = await prisma.profile.findUnique({
            where: {
                user_id: user_id as string
            }
        })
        res.status(200).json(response)
    }
}
