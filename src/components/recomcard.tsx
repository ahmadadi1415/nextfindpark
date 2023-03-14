import Image from 'next/image';
import { ppid } from 'process';

export function Recomcard() {
  return (
    <>
      <div className="flex justify-center">
        <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
          <div className="p-6">
            <div>
              <a href="#!">
                <img className="rounded-t-lg" src="/contohpark.png" alt="" />
              </a>
            </div>
            <h5 className="py-5 text-xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">Nama Parkiran</h5>
            <p className="text-justify text-base text-neutral-600 dark:text-neutral-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, maiores exercitationem excepturi dignissimos quis illum! Adipisci ratione quod ipsum, voluptate, vitae inventore consequatur, harum a voluptatum excepturi
              voluptates atque delectus?
            </p>
          </div>
          <div className="flex mb-5 max-w-lg px-5 h-20 rounded-r-full justify-items-center items-center bg-black pr-3">
            <div className="container">
              <Image className="" src="/lokasi.png" alt="" width={30} height={30}/>
              <p className="">800 m</p>
            </div>
            <div className="container">
              <Image className="" src="/motor1.png" alt="" width={40} height={40} />
              <p className="px-4">20%</p>
            </div>
            <div className="container flex text-2xl">
              <Image className="" src="/star.png" alt="" width={35} height={35} />
              <p>5</p>
            </div>
            <div>
              <button className="flex items-center px-3 w-12 h-12 bg-neutral-700 rounded-full">
                <a href="">
                  <img src="/panahnext.png" alt="" />
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
