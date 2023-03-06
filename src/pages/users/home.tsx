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
        <main className="p-24 flex flex-col-3 items-center justify-between min-h-screen bg-white">
          <div>
            <Recomcard />
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
