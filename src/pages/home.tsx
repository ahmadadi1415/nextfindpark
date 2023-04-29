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
import cloudinary from '@/utils/cloudinary';

const inter = Inter({ subsets: ['latin'] });

interface GeoCoding {
  label: string;
  name: string;
  country: string;
  postcode: string;
  state: string;
  county: string;
  city: string;
  district: string;
  locality: string;
  admin: {
    level4: string;
    level5: string;
    level7: string;
    level9: string;
  };
}

interface Props {
  bestParkingLot: ParkingLot[];
}
interface ParkingLot {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  latitude: string;
  longitude: string;
  status: boolean;
  hourlyFee: string;
  rate: number;
  createdAt: string;
  updatedAt: string;

  distance: number;
}

export default function Home({ bestParkingLot }: Props) {
  // console.log(bestParkingLot)

  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; accuracy: number }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRes, setSearchRes] = useState<ParkingLot[]>();

  function getDistances(parkingLots: ParkingLot[]): Promise<any> {
    const latitude = coords?.latitude;
    const longitude = coords?.longitude;

    const promises = parkingLots.map(async (parkingLot, index) => {
      const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${parkingLot.longitude},${parkingLot.latitude}?overview=false`);
      // console.log(response)
      const distance = response.data.routes[0].distance;

      parkingLots[index] = {
        ...parkingLot,
        distance: distance,
      };
    });
    return Promise.all(promises);
  }

  async function getRealLocation() {
    if (!location && coords) {
      const { latitude, longitude } = coords;
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`);
      const geocoding: GeoCoding = response.data.features[0].properties.geocoding;
      getDistances(bestParkingLot);
      setLocation(geocoding.label);
    }
  }

  async function search() {
    console.log(searchQuery);
    const response = await axios.get(`/api/search/${searchQuery}`);
    let parkingLots: ParkingLot[] = await response.data;

    if (coords) {
      const { latitude, longitude } = coords;

      const promises = parkingLots.map(async (parkingLot, index) => {
        const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${parkingLot.longitude},${parkingLot.latitude}?overview=false`);
        // console.log(response)
        const distance = await response.data.routes[0].distance;

        parkingLots[index] = {
          ...parkingLot,
          distance: distance,
        };
      });

      await Promise.all(promises).then(() => {
        setSearchRes(parkingLots);
      });
    }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            setCoords({ latitude, longitude, accuracy });
          },
          (err) => {
            console.error(err.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }, 3000);
    }

    getRealLocation();
  }, [coords, location, searchRes, bestParkingLot]);

  return (
    <>
      <Navbar />
      <div>
        <main className="px-10 lg:flex min-h-screen bg-white">
          <div className="">
            <div className="mx-auto text-black">
              <h1 className="text-center py-5 font-bold text-3xl">REKOMENDASI</h1>
              <div>
                {bestParkingLot.map((parkingLotData: ParkingLot) => {
                  return (
                    <div className="pb-5">
                      <Recomcard userDistance={parkingLotData.distance} parkingLot={parkingLotData} key={parkingLotData.id} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="lg:pl-10">
              <div className=" bg-blue-700 rounded-xl">
                <div className="flex justify-center py-5">
                  <div className="flex text-black">
                    <input
                      type="text"
                      className="lg:w-96 rounded-l-lg"
                      value={searchQuery}
                      onChange={(e) => {
                        e.preventDefault();
                        setSearchQuery(e.target.value);
                      }}
                    />
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 py-2 px-2 rounded-r-lg text-white"
                      disabled={!coords}
                      onClick={() => {
                        if (coords) {
                          search();
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="lg:flex mx-auto px-5 text-white">
                  <div className="flex">
                    <div className="w-20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-14 h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="pl-1">
                      <p>{location}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-white py-5 lg:pl-20">
                    <div className="text-xl">
                      <button className="flex items-center justify-center bg-yellow-500 lg:w-48  w-36 py-3 rounded-full">TERDEKAT</button>
                    </div>
                    <div className="text-xl lg:pl-10">
                      <button className="flex items-center justify-center bg-yellow-500 lg:w-48 w-36 lg-28 py-3 rounded-full">TIDAK RAMAI</button>
                    </div>
                  </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 lg:pt-5 pt-1">
                  {searchRes?.map((parkingLot: ParkingLot) => [
                    <div className="pr-5 pb-5">
                      <Findcard key={parkingLot.id} userDistance={parkingLot.distance} parkingLot={parkingLot}></Findcard>
                    </div>,
                  ])}
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
  let bestParkingLot = await prisma.parkingLot.findMany({
    where: {
      status: false,
      rate: {
        gte: 4.0,
      },
    },
    orderBy: {
      rate: 'desc',
    },
    take: 2,
  });

  bestParkingLot = JSON.parse(JSON.stringify(bestParkingLot));

  const promises = bestParkingLot.map(async (parkingLot) => {
    const image = parkingLot.image;
    try {
      const cldImage: any = await cloudinary.api.resource(image as string).then((result) => {
        console.log(result);
        const photo_url = JSON.parse(JSON.stringify(result)).secure_url;
        parkingLot.image = photo_url;
        // console.log(photo_url)
      });
    } catch (error) {
      console.log(error);
    }
  });

  const res = await Promise.all(promises);

  return {
    props: {
      bestParkingLot,
    },
  };
}
