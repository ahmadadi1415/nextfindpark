import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    // Create Parking Lot 
    if (req.method === "POST") {
        const {name, description, location, longitude, latitude, hourlyFee} = req.body

        const response = await prisma.parkingLot.create({
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
}