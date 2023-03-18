import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {email} = req.body;

    const userData = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    const token = await prisma.verificationToken.count({
        where: {
            identifier: email
        }
    })
    
    // If user has verification token, return true
    const hasVerifToken = (token !== 0) ? true : false
    // Get the email verified of user
    const emailVerified = await userData?.emailVerified
    
    res.json({emailVerified, hasVerifToken})
}