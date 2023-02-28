import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export default function login() {
  // Front End Login Form
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white container grid grid-cols-2">
        <div>
          <div>
            <p className="text-xl text-amber-900 pb-5 font-bold">Halo!</p>
            <p className="text-black pb-7">Kamu harus login dulu nih sebelum pakai app-nya</p>
          </div>
          <div className="pb-5">
            <input type="email" className="rounded-lg w-96 text-black" />
          </div>
          <div className="pb-3">
            <input type="password" className="rounded-lg w-96 text-black" />
          </div>
          <div className="grid grid-cols-3 pb-7">
            <div>
              <p className="text-black font-bold">
                <input type="checkbox" /> Tampilkan kata sandi
              </p>
            </div>
            <p className="text-black text-right font-bold">
              <a href="">Lupa sandinya?</a>
            </p>
          </div>
          <div>
            <div className="bg-purple-800 rounded-lg font-bold text-center w-44 h-12">
              <button className="py-3">
                <a href="">Login</a>
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-black">Gambar.png</p>
        </div>
      </div>
    </>
  );
}
