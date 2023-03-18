import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import bcrypt, { compare } from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: any = getSession({req})
    const {id} = req.query

    // If id in query is not the same as in session, then say errors 403 Forbidden
    if (id !== session.data.user.id) {
        return res.status(403).json({error: "You are forbidden to do this"})
    }

    // UPDATE USER PASSWORD
    if (req.method === "PATCH") {
        const {id, oldPassword, newPassword} = req.body

        const user: any = await prisma.user.findUnique({
            where: {
                id: id as string
            },
            select: {
                password: true
            }
        })

        // Check if user old password is same as password in database
        const isPasswordCorrect = await compare(oldPassword, user.password)

        if (!isPasswordCorrect) {
            return res.status(403).json({error: "Your old password is wrong"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)

        const response = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: hashedPassword
            }
        })

        res.status(200).json(response)
    }
}