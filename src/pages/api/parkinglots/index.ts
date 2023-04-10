import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import cloudinary from "@/utils/cloudinary";

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '4mb',
      },
    },
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { id } = req.body
        const response = await prisma.parkingLot.findUnique({
            where: {
                id: id
            }
        })
        res.status(200).json(response)
    }

    // Create Parking Lot 
    if (req.method === "POST") {
        const { name, image, description, location, longitude, latitude, hourlyFee } = req.body

        let photoPublicId = null
        try {
            const result = await cloudinary.uploader.upload(image, {
                upload_preset: "parking_photo",
                overwrite: true
            })

            console.log(result)
            photoPublicId = result.public_id
           
            // return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(error)
        }

        const response = await prisma.parkingLot.create({
            data: {
                name: name,
                description: description,
                location: location,
                image: photoPublicId,
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                hourlyFee: hourlyFee.toString(),
            }
        }).then((r) => {
            return res.status(200).json(r)
        }).catch((error) => {
            return res.status(500).json(error)
        })
        // console.log(response)
    }
}