import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>FindPark</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.card}>
          <nav className={styles.nav}>
            <h1>FindPark</h1>
          </nav>
          <div className={styles.rightend}>
            <nav>
              <a className={styles.rightspace} href="">
                {' '}
                About Us
              </a>
              <a href=""> FAQ</a>
            </nav>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.grid}>
            <div>
              <button>
                <a href="">Login</a>
              </button>
            </div>
            <div>
              <button>
                <a href="">Daftar</a>
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
