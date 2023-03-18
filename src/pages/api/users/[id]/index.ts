import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import bcrypt from "bcrypt"
import { getSession, useSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const session: any = getSession({ req })

    // If id in query is not the same as in session, then say errors 403 Forbidden
    if (id !== session.data.user.id) {
        return res.status(403).json({ error: "You dont have permission to change" })
    }

    // UPDATE USER DATA
    if (req.method === "PATCH") {
        const { username, fullname, email } = req.body

        const response = await prisma.user.update({
            where: {
                id: id as string
            },
            data: {
                name: username,
                email: email,
                profile: {
                    update: {
                        fullname: fullname
                    }
                }
            }
        })
        res.status(200).json(response)
    }

    // DELETE USER ACCOUNT
    if (req.method === "DELETE") {
        const response = await prisma.user.delete({
            where: {
                id: id as string
            },
        })

        res.status(200).json(response)
    }

    // GET USER DATA
    if (req.method === "GET") {

        const response = await prisma.user.findUnique({
            where: {
                id: id as string
            },
            include: {
                profile: {
                    select: {
                        fullname: true
                    }
                }
            },
        })
        res.status(200).json(response)
    }
}