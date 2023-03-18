import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

interface BodyPropsUpdate {
    name: string,
    description: string,
    location: string,
    longitude: string,
    latitude: string,
    hourlyFee: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {id} = req.query

    // UPDATE PARKING LOT DATA
    if (req.method === "PATCH") {
        const {name, description, location, longitude, latitude, hourlyFee}: BodyPropsUpdate = req.body

        const response = await prisma.parkingLot.update({
            where: {
                id: parseInt(id as string) 
            },
            data: {
                name: name,
                description: description,
                location: location,
                longitude: longitude,
                latitude: latitude,
                hourlyFee: hourlyFee,
                updatedAt: Date.now().toString()
            }
        })

        res.status(200).json(response)
    }

    // DELETE PARKING LOT
    
}