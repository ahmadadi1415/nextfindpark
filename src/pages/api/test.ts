import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handler (req: NextApiRequest, res: NextApiResponse)
{
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.send(allUsers)
}