import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { time, timeStamp } from "console";
import { stringify } from "querystring";

type User = {
    id: string,
    email: string,
    password:string,
    createdAt: string,
    isAdmin: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password }  = req.body
        const now = Date.now()
        const user = prisma.user.create({
            data: {
                id: 2,
                createdAt: now.toString(),
                isAdmin: false,
                email: email,
                password: password,
            }
        })

        res.status(201).json(user)
    }
}