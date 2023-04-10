import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Rating } from "@/components/userRatings";
import dynamic from "next/dynamic";
import { BarRating } from "@/components/barRatings";
import prisma from "lib/prisma";
import { GetServerSidePropsContext } from "next";
import cloudinary from "@/utils/cloudinary";
import Router from "next/router";
import ReactStars from "react-stars";
import { select } from "@material-tailwind/react";

const inter = Inter({ subsets: ["latin"] });
const Maps = dynamic(() => import("@/components/map"), {
	ssr: false,
});

interface Props {
	parkingLotData: ParkingLot,
	parkingLotRates: number
	countRates: any,
	latestRates: any[]
}

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

interface CountRates {

}

export default function ParkingDetails({ parkingLotData, parkingLotRates, countRates, latestRates }: Props) {
	console.log(latestRates)
	return (
		// Front End Parking Rate and Review
		<>
			<Head>
				<title>Detail Parkir</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="min-h-screen bg-white">
				<div className="lg:flex px-10 py-10">
					<div className="container rounded-xl pb-2">
						<Maps latitude={parkingLotData.latitude} longitude={parkingLotData.longitude} />
					</div>
					<div className="container lg:pl-10">
						<div className=" py-2 px-2 lg:px-5 rounded-xl bg-gray-300">
							<div className=" flex justify-center text-4xl font-bold text-black">
								<h1>{parkingLotData.name}</h1>
							</div>
							<div className="flex justify-center pt-2">
								<img src={(parkingLotData.image) ? parkingLotData.image : "/contohpark.png"} alt="" />
							</div>
							<div className="py-5">
								<BarRating countRates={countRates} />
							</div>
							<div>
								{
									(latestRates) ? (
										latestRates.map((rate) => (
											<Komentar ratesData={rate} />
										))
									) : (
										<div>
											Belum ada penilaian sama sekali.
										</div>
									)
								}
								{/* <Komentar />
                <Komentar /> */}
							</div>
							<div className="flex justify-between">
								<div className="flex items-center rounded-full bg-blue-700 py-2 px-5">
									<img src="/star.svg" alt="" />
									<p className="text-xl">{parkingLotRates}</p>
								</div>
								<div className="flex items-center rounded-full text-xl bg-blue-700 py-2 px-5"
								>
									<a onClick={() => { Router.push(`/parking-lot/${parkingLotData.id}/rate`) }}>BERI PENILAIAN</a>
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

export function Komentar({ ratesData }: any) {
	return (
		<>
			<div className="pb-2">
				<div className="flex justify-between items-center text-black">
					<div className="w-10">
						<img src={(ratesData?.user.profile.photo) ? ratesData.user.profile.photo : "/gambarprofile.svg"} alt="" />
					</div>
					<div className="font-bold">
						<p>{(ratesData?.user.profile.fullname) ? ratesData.user.profile.fullname : ratesData.user.name}</p>
					</div>
					<div className="flex">
						<ReactStars count={5} size={48} color2={'#ffd700'} edit={false} value={ratesData?.rate} />
					</div>
				</div>
				<div className="text-black">
					<p>
						{ratesData?.review}
					</p>
				</div>
			</div>
		</>
	);
}

export function Chartbar() {
	return (
		<div>
			<p>tes bar</p>
		</div>
	);
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {

	const id = query.id
	console.log(id)

	const response = await prisma.parkingLot.findUnique({
		where: {
			id: parseInt(id as string),
		}
	})

	if (!response) {
		return {
			redirect: {
				destination: '/404'
			}
		}
	}

	let parkingLotData = JSON.parse(JSON.stringify(response))

	console.log(parkingLotData)
	try {
		const cldImage: any = await cloudinary.api.resource(parkingLotData?.image as string)
			.then((result) => {
				console.log(result)
				const photo_url = (JSON.parse(JSON.stringify(result))).secure_url
				parkingLotData!.image = photo_url
			})

	} catch (error) {
		console.log(error)
	}


	const parkingLotRate = await prisma.parkingLot.findUnique({
		where: {
			id: parseInt(id as string)
		},
		select: {
			rate: true
		},
	})

	const countRates = await prisma.rating.groupBy({
		by: ['rate'],
		where: {
			parkinglot_id: parseInt(id as string)
		},
		_count: {
			rate: true
		}
	})

	let parkingLotRates = (parkingLotRate?.rate) ? parkingLotRate.rate : 0

	let latestRates = await prisma.rating.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		where: {
			parkinglot_id: parseInt(id as string)
		},
		select: {
			rate: true,
			review: true,
			id: true,
			user: {
				select: {
					profile: {
						select: {
							fullname: true,
							photo: true
						}
					},
					name: true
				}
			}
		},
		take: 2
	})

	latestRates = JSON.parse(JSON.stringify(latestRates))
	console.log(latestRates)

	return {
		props: {
			parkingLotData, parkingLotRates, countRates, latestRates
		}
	}
}