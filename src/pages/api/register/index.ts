import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) 
{
    if (req.method === "POST")
    {
        const data = req.body

        await prisma.user.create(
            {
                data
            }
        )

        res.status(200).json({
            message: "OK"
        })
    }    
}