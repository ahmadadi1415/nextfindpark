import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { createTransport } from "nodemailer"
import jwt from "jsonwebtoken"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        return res.status(404).json({ status: "User doesn't exist"})
    }

    const oldPassword = await user.password 
    const secret = process.env.JWT_SECRET?? + !oldPassword

    const token = jwt.sign({ email: user.email, id: user.id }, secret as jwt.Secret, {
        expiresIn: "5m"
    })

    const url = `http://localhost:3000/reset-password/${user.id}/${token}`
    console.log(url)
    // Send Reset Password Email with Token
    const result = sendResetPasswordEmail(user.email, url)
    res.status(200).json({result})
}

async function sendResetPasswordEmail(identifier: any, url: any) {
    const { host } = new URL(url)
    const server = {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        },
      }

    const transport = createTransport(server)
    const result = await transport.sendMail({
        to: identifier,
        from: process.env.EMAIL_FROM,
        subject: `Your Reset Password`,
        text: `Reset Password from ${host}\n${url}\n\n`
    })

    return result
}