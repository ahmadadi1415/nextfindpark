import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import { time, timeStamp } from "console";
import { stringify } from "querystring";

type User = {
    id: string,
    email: string,
    password:string,
    createdAt: string,
    isAdmin: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

}