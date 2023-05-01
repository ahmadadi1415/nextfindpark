import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Aboutus() {
  return (
    <>
      <Navbar />
      <Head>
        <title>About Us</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white">
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-black text-3xl lg:text-4xl font-bold leading-9 pb-4">
                About Us
              </h1>
              <p className="font-normal text-base leading-6 text-gray-600 ">
                Tim yang terdiri dari 4 orang yang ahli di bidang teknologi
                informasi dan pengembangan perangkat lunak berkolaborasi untuk
                menciptakan solusi teknologi yang bermanfaat bagi masyarakat dan
                lingkungan sekitar. Kami berfokus pada pembuatan sistem
                informasi tempat parkir berbasis web dengan informasi detail
                secara realtime , dengan tujuan menyediakan solusi praktis dan
                efisien bagi pengguna.
              </p>
            </div>
            <div className="w-full lg:w-8/12">
              <img
                className="w-full h-full"
                src="/team.png"
                alt="A group of People"
              />
            </div>
          </div>
          <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
            <div className="text-center">
              <h2 className="font-semibold dark:text-white lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 md:w-full w-9/12 mx-auto">
                Follow Us on Instagram
              </h2>
              <p className="text-black text-3xl lg:text-4xl font-bold leading-9 pb-4 mx-auto">
                Follow us on instagram
              </p>
            </div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">
              <div className="relative group">
                <img
                  src="/adii.jpg"
                  alt="adipict"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <a
                    href="https://www.instagram.com/ahmad_adi.p/"
                    target="_blank"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                      alt="instagram"
                    />
                  </a>
                </div>
                <div className="pt-4">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    Ahmad Adi
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Back-End Developer</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/zayy.png"
                  alt="zayyanpict"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <a
                    href="https://www.instagram.com/zzzayyan_/"
                    target="_blank"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                      alt="instagram"
                    />
                  </a>
                </div>
                <div className="pt-4">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    Brillianta Zayyan Muhammad
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Front-End Developer</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/figoo.jpg"
                  alt="figopic"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <a
                    href="https://www.instagram.com/figgggg_o/"
                    target="_blank"
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                      alt="instagram"
                    />
                  </a>
                </div>
                <div className="pt-4">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    Figo Kurniawan
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Documentation & UI/UX Designer</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/diffaa.jpg"
                  alt="diffapict"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <a href="https://www.instagram.com/affid87_/" target="_blank">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                      alt="instagram"
                    />
                  </a>
                </div>
                <div className="pt-4">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    Diffa Hananta Firdaus AM
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Front-End Developer</p>
                  </div>
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
