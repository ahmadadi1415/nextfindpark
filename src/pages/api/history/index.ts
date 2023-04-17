import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {

        const session = await getSession({ req })
        const { parkinglot_id, user_id } = req.body

        if (session?.user?.id !== user_id) {
            return res.status(403).json({ message: "You're forbidden to create another record other than yours" })
        }

        const response = await prisma.parkingHistory.create({
            data: {
                parkinglot_id: parseInt(parkinglot_id as string),
                user_id: user_id,
            }
        })

        res.status(201).json(response)
    }
}