import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Rating } from '@/components/userRatings';
import dynamic from 'next/dynamic';
import { BarRating } from '@/components/barRatings';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
const Maps = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function ParkingDetails(props: any) {
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
            <Maps />
          </div>
          <div className="container lg:pl-10">
            <div className=" py-2 px-2 lg:px-5 rounded-xl bg-gray-300">
              <div className=" flex justify-center text-4xl font-bold text-black">
                <h1>PARKIRAN KUNING</h1>
              </div>
              <div className="flex justify-center pt-2">
                <img src="/contohpark.png" alt="" />
              </div>
              <div className="py-5">
                <BarRating countRates={[]} />
              </div>
              <div>
                <Komentar />
                <Komentar />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center rounded-full bg-blue-700 py-2 px-5">
                  <img src="/star.svg" alt="" />
                  <p className="text-xl">5</p>
                </div>
                <div className="flex items-center rounded-full text-xl bg-blue-700 py-2 px-5">
                  <a href="">BERI PENILAIAN</a>
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

export function Komentar() {
  return (
    <>
      <div className="pb-2">
        <div className="flex justify-between items-center text-black">
          <div className="w-10">
            <img src="/gambarprofile.svg" alt="" />
          </div>
          <div className="font-bold">
            <p>Nama Pengguna</p>
          </div>
          <div className="flex">
            <Rating />
          </div>
        </div>
        <div className="text-black">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error debitis corrupti laboriosam laborum sit magnam? Quis hic voluptatem, impedit, neque fuga maiores quae placeat ducimus vitae, beatae dolores aperiam quos.</p>
        </div>
        <div className="flex justify-center">
          <img src="/contohpark.png" alt="" />
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
