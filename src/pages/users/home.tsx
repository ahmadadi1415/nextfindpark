import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Findcard, Recomcard } from '@/components/recomcard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <main className="px-10 flex min-h-screen bg-white">
          <div className="">
            <div className="container text-black">
              <h1 className="text-center py-5 font-bold text-3xl">REKOMENDASI</h1>
              <div className="pb-5">
                <Recomcard />
              </div>
              <div className="pb-5">
                <Recomcard />
              </div>
            </div>
          </div>
          <div className="container py-5">
            <div className="container pl-10">
              <div className=" bg-gray-300 rounded-xl">
                <div className="flex justify-center py-5">
                  <div className="flex text-black">
                    <input type="text" className="w-96 rounded-l-lg" />
                    <button className="bg-blue-700 rounded-r-lg">
                      <img src="/lokasi.png" alt="" />
                    </button>
                  </div>
                </div>
                <div className="flex px-5 text-blue-800">
                  <div className="w-12">
                    <img src="/lokasi.png" alt="" />
                  </div>
                  <div className="w-96">
                    <p>Graha Cakrawala Universitas Negeri Malang Jl. Cakrawala, Sumbersari, Lowokwaru, Kota Malang</p>
                  </div>
                  <div className="flex items-center text-green-700 pl-20">
                    <div className="text-xl">
                      <button className="border-8 border-green-700 w-48 h-12 rounded-full">TERDEKAT</button>
                    </div>
                    <div className="text-xl pl-10">
                      <button className="border-8 border-green-700 w-48 h-12 rounded-full">TIDAK RAMAI</button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 pl-5 pt-5">
                  <div className="pr-5 pb-5">
                    <Findcard />
                  </div>
                  <div className="pr-5 pb-5">
                    <Findcard />
                  </div>
                  <div className="pr-5 pb-5">
                    <Findcard />
                  </div>
                  <div className="pr-5 pb-5">
                    <Findcard />
                  </div>
                  <div className="pr-5 pb-5">
                    <Findcard />
                  </div>
                  <div className="pr-5 pb-5">
                    <Findcard />
                  </div>
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
