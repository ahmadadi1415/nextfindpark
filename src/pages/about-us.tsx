import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
export default function Aboutus() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-black text-3xl lg:text-4xl font-bold leading-9 pb-4">
                About Us
              </h1>
              <p className="font-normal text-base leading-6 text-black">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aperiam tempora quibusdam libero, sapiente itaque aspernatur et
                quas magnam! Consectetur suscipit natus necessitatibus vero quo
                ipsa repudiandae consequuntur ipsum minus amet?
              </p>
            </div>
            <div className="w-full lg:w-8/12">
              <img
                className="w-full h-full"
                src="/cone.png"
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
                  src="/cone.png"
                  alt="adipict"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                    alt="instagram"
                  />
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/cone.png"
                  alt="zayyanpict"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                    alt="instagram"
                  />
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/cone.png"
                  alt="figopic"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                    alt="instagram"
                  />
                </div>
              </div>
              <div className="relative group">
                <img
                  src="/cone.png"
                  alt="diffapict"
                  className="shadow-xl rounded-xl lg:block hidden w-full"
                />
                <div className="opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/social-1-svg1.svg"
                    alt="instagram"
                  />
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
