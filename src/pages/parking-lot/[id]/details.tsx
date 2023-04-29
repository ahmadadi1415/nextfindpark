import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import dynamic from 'next/dynamic';
import { BarRating } from '@/components/barRatings';
import prisma from 'lib/prisma';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import cloudinary from '@/utils/cloudinary';
import Router from 'next/router';
import ReactStars from 'react-stars';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import SimpleDialog from '@/components/popuponload';

const inter = Inter({ subsets: ['latin'] });
const Maps = dynamic(() => import('@/components/map'), {
  ssr: false,
});

interface Props {
  parkingLotData: ParkingLot;
  parkingLotRates: number;
  countRates: any;
  latestRates: any[];
  isParking: boolean;
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

interface CountRates {}

export default function ParkingDetails({ parkingLotData, parkingLotRates, countRates, latestRates, isParking }: Props) {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; accuracy: number }>();
  const [nearParkingLot, setNearThisParkingLot] = useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      if (!coords && parkingLotData.distance === undefined) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            setCoords({ latitude, longitude, accuracy });
            console.log(coords);
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
      }
    }

    async function getUserDistance() {
      if (parkingLotData.distance === undefined && coords && coords.latitude && coords.longitude) {
        const latitude = coords.latitude;
        const longitude = coords.longitude;

        const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${longitude},${latitude};${parkingLotData.longitude},${parkingLotData.latitude}?overview=false`);
        // console.log(response)
        const distance = response.data.routes[0].distance;

        parkingLotData = {
          ...parkingLotData,
          distance: distance,
        };

        // Minimum distance in meter
        const minimumDistance = 100;
        console.log(parkingLotData);
        if (distance < minimumDistance) {
          setNearThisParkingLot(true);
        }
      }
    }

    getUserDistance();
  }, [coords, parkingLotData.distance, nearParkingLot]);

  // console.log(latestRates)
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
      <ToastContainer />
      <main className="min-h-screen bg-white">
        {nearParkingLot && !isParking && (
          <SimpleDialog
          message='Apakah kamu parkir di sini?'
            onActionYes={async () => {
              const session = await getSession();
              console.log(session);
              const user_id = session?.user?.id as string;
              const parkinglot_id = parkingLotData.id as number;
              // console.log(user_id, parkinglot_id)
              const response = await axios.post('/api/history', {
                parkinglot_id: parkinglot_id,
                user_id: user_id,
                parking_start: new Date(),
              });
            }}
            onActionNo={() => { }}
          />
        )}

        <div className="lg:flex px-10 py-10">
          <div className="container rounded-xl pb-2">
            <Maps latitude={parkingLotData.latitude} longitude={parkingLotData.longitude} />
          </div>
          <div className="container lg:pl-10">
            <div className=" py-2 px-2 lg:px-5 rounded-xl bg-white drop-shadow-2xl">
              <div className=" flex pb-2 justify-center text-4xl font-bold text-black">
                <h1>{parkingLotData.name}</h1>
              </div>
              <div className="flex justify-center pt-2 h-72 relative">
                <Image className="object-cover" fill sizes="50vw" priority={true} src={parkingLotData.image ? parkingLotData.image : '/contohpark.png'} alt="" />
              </div>
              <div className="py-5">
                <BarRating countRates={countRates} />
              </div>
              <div>
                {latestRates ? latestRates.map((rate) => <Komentar ratesData={rate} />) : <div>Belum ada penilaian sama sekali.</div>}
                {/* <Komentar />
                <Komentar /> */}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center rounded-full bg-yellow-500 hover:bg-yellow-600 py-3 px-5 drop-shadow-md">
                  <img src="/star.svg" alt="" />
                  <p className="text-xl">{parkingLotRates}</p>
                </div>
                <Link href={`/parking-lot/${parkingLotData.id}/rate`}>
                  <div className="flex items-center rounded-full text-xl bg-yellow-500 hover:bg-yellow-600 py-3 px-5 drop-shadow-md">BERI PENILAIAN</div>
                </Link>
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
        <div className="flex justify-between items-center text-white">
          <div className="w-10">
            <Image className="rounded-full" src={ratesData?.user.profile.photo ? ratesData.user.profile.photo : '/gambarprofile.svg'} alt="" width={50} height={50} />
          </div>
          <div className="font-bold">
            <p>{ratesData?.user.profile.fullname ? ratesData.user.profile.fullname : ratesData.user.name}</p>
          </div>
          <div className="flex">
            <ReactStars count={5} size={48} color2={'#ffd700'} edit={false} value={ratesData?.rate} />
          </div>
        </div>
        <div className="text-white">
          <p>{ratesData?.review}</p>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const parkinglot_id = Number(context.query.id);
  const user_id = (await getSession(context))?.user?.id as string;
  // console.log(id)

  const response = await prisma.parkingLot.findUnique({
    where: {
      id: parkinglot_id,
    },
  });

  const userHistory = await prisma.parkingHistory.findMany({
    where: {
      parkinglot_id: parkinglot_id,
      user_id: user_id,
      parking_end: null,
    },
  });

  const isParking = userHistory ? true : false;

  if (!response) {
    return {
      redirect: {
        destination: '/404',
      },
    };
  }

  let parkingLotData = JSON.parse(JSON.stringify(response));

  console.log(parkingLotData);
  try {
    const cldImage: any = await cloudinary.api.resource(parkingLotData?.image as string).then((result) => {
      console.log(result);
      const photo_url = JSON.parse(JSON.stringify(result)).secure_url;
      parkingLotData!.image = photo_url;
      console.log(photo_url);
    });
  } catch (error) {
    console.log(error);
  }

  const parkingLotRate = await prisma.parkingLot.findUnique({
    where: {
      id: parkinglot_id,
    },
    select: {
      rate: true,
    },
  });

  const countRates = await prisma.rating.groupBy({
    by: ['rate'],
    where: {
      parkinglot_id: parkinglot_id,
    },
    _count: {
      rate: true,
    },
  });

  let parkingLotRates = parkingLotRate?.rate ? parkingLotRate.rate : 0;

  let latestRates = await prisma.rating.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      parkinglot_id: parkinglot_id,
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
              photo: true,
            },
          },
          name: true,
        },
      },
    },
    take: 2,
  });

  latestRates = JSON.parse(JSON.stringify(latestRates));
  const promises = latestRates.map(async (rates) => {
    const image = rates.user.profile?.photo;
    try {
      const cldImage: any = await cloudinary.api.resource(image as string).then((result) => {
        console.log(result);
        const photo_url = JSON.parse(JSON.stringify(result)).secure_url;
        rates.user.profile!.photo = photo_url;
        console.log(photo_url);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const res = await Promise.all(promises);
  console.log(latestRates);
  console.log(res);
  return {
    props: {
      parkingLotData,
      parkingLotRates,
      countRates,
      latestRates,
      isParking,
    },
  };
}
