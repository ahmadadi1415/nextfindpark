import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"
import { createUser } from "../users";

interface ResponseData {
    error?: string,
    msg?: string
}

const validateEmail = (email: string): boolean => {
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regEx.test(email);
}

const validateForm = async (fullname: string, email: string, password: string) => {
    // if (!username) {
    //     return { error: "Required" }
    // }

    if (!fullname) {
        return { error: "Required"}
    }
    if (!validateEmail(email)) {
        return { error: "Invalid email" }
    }

    const userEmail = await prisma?.user.findUnique({
        where: {
            email: email
        }
    })

    if (userEmail) {
        return {
            error: "email already used"
        }
    }

    if (password.length < 8) {
        return { error: "Password at least 8 characters" }
    }

    return null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    if (req.method !== "POST") {
        return res.status(400).json({ error: "Only support POST method" })
    }

    const { fullname, email, password } = req.body;

    const errorMessage = await validateForm(fullname, email, password)
    if (errorMessage) {
        return res.status(400).json(errorMessage as ResponseData)
    }
    
    // Creating new user 

    await createUser(req.body).then(() =>
        res.status(201).json({ msg: "Successful create " })
    ).catch((error: string) =>
        res.status(400).json({ error: "API error" + error })
    )
}