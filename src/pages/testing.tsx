import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Rating } from "@/components/userRatings";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Operators</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className="px-10 min-h-screen bg-white ">
          <div className="px-4 ">
            <div className="py-5 flex -mx-2 ">
              <div className="container w-1/3 flex lg:pl-10">
                <div className="flex flex-col items-center bg-gray-300 rounded-xl h-screen ">
                  <h1 className="text-center px-4 py-5 text-black text-4xl font-serif font-bold">
                    Parkiran Fakultas Ilmu Sosial
                  </h1>
                  <div className="flex flex-col items-center box-content bg-blue-900 rounded-xl h-52 w-52 p-4 border-4">
                    <h1 className="font-bold text-2xl text-center py-2">
                      KENDARAAN TERPARKIR
                    </h1>
                    <h1 className="font-bold text-8xl py-4 text-center">150</h1>
                  </div>
                  <div>
                    <h1 className="text-red-500 font-bold text-4xl py-10 text-center">
                      PENUH ?
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <button className="bg-blue-900 rounded-xl font-bold text-center w-24 h-12">
                      YA
                    </button>
                    <button className="bg-gray-200 text-purple-800 rounded-xl font-bold text-center w-24 h-12">
                      TIDAK
                    </button>
                  </div>
                  <div className="mt-36">
                    <button className="bg-blue-900 rounded-xl font-bold text-center w-44 h-12">
                      SIMPAN
                    </button>
                  </div>
                  {/* <div>
                    <button className="bg-blue-900 rounded-xl font-bold text-center w-44 h-12">
                      LIHAT PARKIRAN
                    </button>
                  </div> */}
                </div>
              </div>
              <div className="container flex lg:pl-10">
                <div className="bg-gray-300 rounded-xl h-screen  py-2 px-16">
                  <img
                    src="/contohpark.png"
                    alt="fispark"
                    className="mx-auto py-5 rounded-xl lg:block hidden w-9/12"
                  />
                  <div className=" flex justify-center text-4xl font-bold text-black">
                    <h1>Parkiran Fakultas Ilmu Sosial</h1>
                  </div>
                  <div className="py-4 flex flex-col items-center ">
                    <button className="bg-blue-900 rounded-xl font-bold text-center w-64 h-14">
                      GANTI
                    </button>
                  </div>
                  <div className="py-2">
                    <div className=" bg-blue-700">bar</div>
                  </div>
                  <div className="py-2">
                    <div className=" bg-blue-700">bar</div>
                  </div>
                  <div className="py-2">
                    <div className=" bg-blue-700">bar</div>
                  </div>
                  <div className="py-2">
                    <div className=" bg-blue-700">bar</div>
                  </div>
                  <div className="py-2">
                    <div className=" bg-blue-700">bar</div>
                  </div>

                  <Komentar />
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

export function Komentar() {
  return (
    <>
      <div className="pb-2">
        <div className="flex justify-between items-center text-black">
          <div className="w-10">
            <img src="/gambarprofile.svg" alt="" />
          </div>
          <div>
            <p>Nama Anggota</p>
          </div>
        </div>
        <div className="text-black">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
            debitis corrupti laboriosam laborum sit magnam? Quis hic voluptatem,
            impedit, neque fuga maiores quae placeat ducimus vitae, beatae
            dolores aperiam quos.
          </p>
        </div>
      </div>
    </>
  );
}