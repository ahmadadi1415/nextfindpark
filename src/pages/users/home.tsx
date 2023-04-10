import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Findcard, Recomcard } from '@/components/recomcard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import prisma from 'lib/prisma';

const inter = Inter({ subsets: ['latin'] });

interface GeoCoding {
	label: string,
	name: string,
	country: string,
	postcode: string,
	state: string,
	county: string,
	city: string,
	district: string,
	locality: string,
	admin: {
		level4: string,
		level5: string,
		level7: string,
		level9: string
	}
}

interface Props {
	bestParkingLot: ParkingLot[]	
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

	distance: number
}

export default function Home({bestParkingLot}: Props) {

	//console.log(bestParkingLot)

	const [location, setLocation] = useState("")
	const [coords, setCoords] = useState<{latitude: number, longitude: number, accuracy: number}>()
	const [searchQuery, setSearchQuery] = useState("")
	const [searchRes, setSearchRes] = useState<ParkingLot[]>()

	function getDistances(parkingLots: ParkingLot[]): Promise<any> {
		
		const latitude = coords?.latitude
		const longitude = coords?.longitude

		const promises = parkingLots.map(async (parkingLot, index) => {
			const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${parkingLot.longitude},${parkingLot.latitude}?overview=false`)
			// console.log(response)
			const distance = response.data.routes[0].distance

			parkingLots[index] = {
				...parkingLot,
				distance: distance
			}
		})
		return Promise.all(promises)
	}

	async function getRealLocation() {
		if (!location && coords) {
			const {latitude, longitude} = coords
			const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`)
			const geocoding: GeoCoding = response.data.features[0].properties.geocoding
			setLocation(geocoding.label)
		}
	}

	async function search() {
		console.log(searchQuery)
		const response = await axios.get(`/api/search/${searchQuery}`)
		let parkingLots: ParkingLot[] = await response.data

		const latitude = coords?.latitude
		const longitude = coords?.longitude

		const promises = parkingLots.map(async (parkingLot, index) => {
			const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${parkingLot.longitude},${parkingLot.latitude}?overview=false`)
			// console.log(response)
			const distance = await response.data.routes[0].distance

			parkingLots[index] = {
				...parkingLot,
				distance: distance
			}
			
		})

		await Promise.all(promises).then((r) => console.log(r)).then(()=> {
			setSearchRes(parkingLots)
		})
		
	}

	useEffect(() => {
		if ('geolocation' in navigator) {
			setInterval(async ()=> {

				navigator.geolocation.getCurrentPosition(async (position) => {
					const { latitude, longitude, accuracy } = position.coords
					setCoords({ latitude, longitude, accuracy })
					
				},
					(err) => {
						console.error(err.message)
					}, {
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0
				})

			}, 3000)
		}
		
		getRealLocation()

	}, [coords, location, searchRes, bestParkingLot])

	return (
		<>
			<Navbar />
			<div>
				<main className="px-10 lg:flex min-h-screen bg-white">
					<div className="">
						<div className="mx-auto text-black">
							<h1 className="text-center py-5 font-bold text-3xl">REKOMENDASI</h1>
							<div>
								{
									bestParkingLot.map((parkingLotData: ParkingLot) => {
										return (
											<div className="pb-5">
												<Recomcard
													userDistance={parkingLotData.distance}
													parkingLot={parkingLotData}
													key={parkingLotData.id} />
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
					<div className="py-5">
						<div className="lg:pl-10">
							<div className=" bg-gray-300 rounded-xl">
								<div className="flex justify-center py-5">
									<div className="flex text-black">
										<input type="text"  
											className="lg:w-96 rounded-l-lg" 
											value={searchQuery} 
											onChange={(e) => {
												e.preventDefault() 
												setSearchQuery(e.target.value)
												}} />
										<button className="bg-blue-700 py-1 px-1 rounded-r-lg" disabled={!coords} onClick={
											() => {
												if (coords) {
													search()
												}
											}
										}>
											<img src="/search.png" alt="" />
										</button>
									</div>
								</div>
								<div className="lg:flex mx-auto px-5 text-blue-800">
									<div className="flex">
										<div className="w-20">
											<img src="/lokasi.png" alt="" />
										</div>
										<div className="pl-1">
											<p>{location}</p>
										</div>
									</div>
									<div className="flex justify-between text-green-700 lg:pl-20">
										<div className="text-xl">
											<button className="lg:border-8  border-green-700 lg:w-48 lg:h-12 rounded-full">TERDEKAT</button>
										</div>
										<div className="text-xl lg:pl-10">
											<button className="lg:border-8 border-green-700 lg:w-48 lg:h-12 rounded-full">TIDAK RAMAI</button>
										</div>
									</div>
								</div>
								<div className="lg:grid lg:grid-cols-2 pl-5 lg:pt-5 pt-1">
									{
										searchRes?.map((parkingLot: ParkingLot) => [
											<div className='pr-5 pb-5'>
												<Findcard key={parkingLot.id} userDistance={parkingLot.distance} parkingLot={parkingLot}></Findcard>
											</div>
										])
									}
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
}

export async function getServerSideProps() {

	const response = await prisma.parkingLot.findMany({
		where: {
			status: false,
			rate: {
				gte: 4.0
			}
		},
		orderBy: {
			rate: 'asc'
		}
	})

	const bestParkingLot = JSON.parse(JSON.stringify(response))

	return {
		props: {
			bestParkingLot 
		}
	}
}