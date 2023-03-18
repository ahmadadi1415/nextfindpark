import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {searchQuery} = req.query
    
    const response = await prisma.parkingLot.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchQuery as string
                    }
                },
                {
                    location: {
                        contains: searchQuery as string
                    }
                },
            ]
        }
    })

    res.status(200).json(response)
} 