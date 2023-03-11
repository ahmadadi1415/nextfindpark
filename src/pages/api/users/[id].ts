import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query
    if (req.method === "PATCH") {
        const { password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const response = await prisma.user.update({
            where: {
                id: id as string,
            },
            data: {
                password: hashedPassword
            }
        })

        res.status(200).json(response)
    }

    if (req.method === "DELETE") {
        const response = await prisma.user.delete({
            where: {
                id: id as string
            },
        })

        res.status(200).json(response)
    }
}