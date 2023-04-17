import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {

        const session = await getSession({ req })
        const { id } = req.query

        const history = await prisma.parkingHistory.findUnique({
            where: {
                id: parseInt(id as string)
            }
        })

        if (history?.user_id !== session?.user?.id) {
            return res.status(403).json({ message: "Forbidden to change another user history" })
        }

        const { parking_end } = req.body

        const response = await prisma.parkingHistory.update({
            data: {
                parking_end: parking_end as Date
            },
            where: {
                id: parseInt(id as string)
            }
        })

        res.status(200).json(response)
    }
}