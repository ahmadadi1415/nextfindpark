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
        },
        include: {
            _count: {
                select: {
                    parkinghistory: {
                        where: {
                            parking_end: null
                        }
                    }
                }
            }
        }
    })
    


    console.log(response)
    res.status(200).json(response)
} 