import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {nearest, notCrowded} = req.query
    const {userLat, userLng} = req.body

    // Get the capacity of each parking lot
    // If capacity is low than 50%, it is not crowded
    // Return the those parkingLot
    

    // Get the user location (longitude and latitude)
    // Count the user and parkingLot distance
    // Sort it from nearest to farthest
    // Return top 3 after sorted
}