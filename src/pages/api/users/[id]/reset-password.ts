import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "PATCH") {
        const { id, password, token } = req.body

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                id: id as string
            },
            select: {
                password
            }
        })

        // User doesnt exist, then say errors 404 Not Found
        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" })
        }

        // User exists, then check the token validity
        const secret = process.env.JWT_SECRET ?? + !user.password
        
        try {
            const verified = jwt.verify(token as string, secret as jwt.Secret)
        } catch (error) {
            // Token invalid, then say errors 403 Forbidden
            console.log(error)
            return res.status(403).json(error)
        }

        // Token valid, then hash the password and update the password
        const hashedPassword = await bcrypt.hash(password, 12)
        const response = await prisma.user.update({
            where: {
                id: id as string
            },
            data: {
                password: hashedPassword
            }
        })

        return res.status(200).json(response)
    }
}