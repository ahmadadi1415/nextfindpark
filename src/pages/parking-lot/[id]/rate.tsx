import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Rating } from "@/components/userRatings";
import dynamic from "next/dynamic";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getSession, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import prisma from "lib/prisma";
import { useState } from "react";
import axios from "axios";
const Maps = dynamic(() => import("@/components/map"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

interface ParkingLot {
	id: number,
	name: string,
	description: string,
	location: string,
	image: string,
	latitude: string,
	longitude: string,
	status: boolean,
	hourlyFee: string,
	rate: number,
	createdAt: string,
	updatedAt: string
}

interface Props {
  parkingLot: ParkingLot
}

export default function ParkingRate({parkingLot}: Props) {

  const [rating, setRating] = useState("0")
  const [review, setReview] = useState("")

  const session = useSession()
  const user_id = session.data?.user?.id

  async function submitReview() {
    console.log(rating, review)
    console.log(user_id)
    const response  = await axios.post("/api/rating", {
      parkinglot_id: parkingLot.id,
      user_id: user_id,
      review: review,
      rate: rating
    })
    console.log(response)
  }

  return (
    <>
      <Head>
        <title>Rating Parkir</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="lg:flex px-10 py-10">
          <div className="container rounded-xl pb-2">
            <Maps latitude={parkingLot.latitude} longitude={parkingLot.longitude} />
          </div>
          <div className="container lg:pl-10">
            <div className=" py-5 px-5 rounded-xl bg-gray-300">
              <div className=" lg:flex justify-center text-4xl font-bold text-black">
                <h1>{ parkingLot.name }</h1>
              </div>
              <div className="flex justify-center py-5">
                <Rating onChange={setRating} />
              </div>
              <div className="flex justify-center text-black font-bold">
                <p>BAGAIMANA MENURUTMU KAMU?</p>
              </div>
              <div className="flex justify-center text-black py-2">
                <textarea name="" id="" className="w-96 h-36" onChange={(e) => { e.preventDefault(); setReview(e.target.value) }}></textarea>
              </div>
              <div className="flex justify-center pt-5">
                <div className="flex items-center rounded-full text-xl bg-blue-700 py-2 px-5">
                  <button onClick={() => submitReview()}>BERI PENILAIAN</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log(session)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const id = context.query.id as string

  const response = await prisma.parkingLot.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  const parkingLot = JSON.parse(JSON.stringify(response))


  return {
    props: {
      parkingLot
    }
  }
}
