import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <main className="flex flex-col justify-between items-center p-24 min-h-screen bg-zinc-400">
          <div className="flex w-3/4 container flex-col mr-auto py-28 relative">
            <Image
              src="/cone.png"
              alt="Picture of the author"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
              className="ml-96" // just an example
            />
            <h1 className="text-5xl font-sans text-left">Temukan Lahan Parkiran Terdekat Denganmu</h1>
            <div className="py-5">
              <h2 className="text-xl font-sans text-left">Mempermudah anda dalam menemukan lahan parkir.</h2>
              <p className="text-s font-sans text-left">Segera daftarkan diri anda jika belum mempunyai akun</p>
            </div>
            <div className="py-12">
              <button
                type="button"
                className="h-12 w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-m mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <a href="">Login</a>
              </button>
              <button
                type="button"
                className="h-12 w-32 text-black bg-blue-200 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-m  mr-2 mb-2  dark:hover:bg-grey-200 focus:outline-none dark:focus:ring-blue-800"
              >
                <a href="">Daftar</a>
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
