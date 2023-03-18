import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Recomcard } from '@/components/recomcard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <main className="p-24 grid grid-cols-3 items-center justify-between min-h-screen bg-white gap-2">
          <div className="">
            <Recomcard />
          </div>
          <div className='border container col-span-2'>
            <div className=''>
              <input className='form-input rounded-full w-4/6 mx-auto' type="search" name="" id="" />
            <Recomcard />
            </div>
            
          </div>
          <div>
            <Recomcard />
          </div>
          <div>
            <Recomcard />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
