import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <Navbar />
      <div>
        <main className="lg:p-32 flex items-center justify-between flex-col-2 min-h-screen bg-gradient-to-r from-white to-blue-700">
          <div className="lg:grid grid-cols-2 ">
            <div className="">
              <div className="mx-auto flex-col flex w-3/4 py-5 ">
                <h1 className="antialiased text-6xl font-sans text-left text-black font-bold">Temukan Lahan Parkiran Terdekat Denganmu</h1>
                <div className="py-5">
                  <h2 className="text-xl font-sans text-left text-black font-bold">Mempermudah anda dalam menemukan lahan parkir.</h2>
                  <p className="text-s font-sans text-left text-black">Segera daftarkan diri anda jika belum mempunyai akun</p>
                </div>
                <div className="flex lg:py-6 ">
                  <button
                    type="button"
                    className="h-12 w-36 inline-block bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-m mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <Link href="/login">Login</Link>
                  </button>
                  <button
                    type="button"
                    className="ml-16 h-12 w-36 inline-block text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-m  mr-2 mb-2  dark:hover:bg-grey-200 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <Link href="/registration">Daftar</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <Image
                src="/cone.png"
                alt="cone"
                width="935"
                height="0"
                objectFit="cover" // change to suit your needs
                className="scale-100 ml-auto " // just an example
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
