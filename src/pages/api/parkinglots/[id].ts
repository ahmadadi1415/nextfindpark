import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

interface BodyPropsUpdate {
    name: string,
    description: string,
    status: boolean,
    location: string,
    hourlyFee: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {id} = req.query

    // UPDATE PARKING LOT DATA
    if (req.method === "PUT") {
        const {name, description, location, hourlyFee, status}: BodyPropsUpdate = req.body

        const response = await prisma.parkingLot.update({
            where: {
                id: parseInt(id as string) 
            },
            data: {
                name: name,
                description: description,
                location: location,
                hourlyFee: hourlyFee,
                status: status,
            }
        })

        res.status(200).json(response)
    }

    // DELETE PARKING LOT
    
}