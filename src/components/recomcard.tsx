import Image from 'next/image';
import { ppid } from 'process';

export function Recomcard() {
  return (
    <>
      <div className="flex justify-center">
        <div className="block max-w-sm rounded-lg bg-gray-300 shadow-lg ">
          <div className="p-6">
            <div>
              <a href="#!">
                <img className="rounded-t-lg" src="/contohpark.png" alt="" />
              </a>
            </div>
            <h5 className="py-5 text-xl font-bold leading-tight text-black">Nama Parkiran</h5>
            <p className="text-justify text-base text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, maiores exercitationem excepturi dignissimos quis illum! Adipisci ratione quod ipsum, voluptate, vitae inventore consequatur, harum a voluptatum excepturi
              voluptates atque delectus?
            </p>
          </div>
          <div className="flex mb-5 max-w-lg px-5 h-20 rounded-r-full justify-items-center items-center bg-blue-800 pr-3">
            <div className="container border w-48 h-15">
              <p className="flex justify-center">800 m</p>
            </div>
            <div className="container border w-48 h-15">
              <p className="flex justify-center">20%</p>
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

export function Findcard() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-blue-800 shadow-lg md:max-w-xl md:flex-row">
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-3xl font-bold text-neutral-800 dark:text-neutral-50">Nama Parkiran</h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit at, necessitatibus quia pariatur quasi numquam cupiditate. Fugit vel quasi numquam, asperiores eligendi alias perferendis ea beatae dignissimos quos quia
            aspernatur.
          </p>
          <div className="flex h-10 justify-between">
            <button className="w-28 bg-green-600 rounded-full">Rating</button>
            <button className="w-28 bg-green-600 rounded-full">Jarak</button>
          </div>
        </div>
        <div className="flex items-center px-2 bg-white rounded-r-lg">
          <div className="flex items-center justify-center border-8 border-red-700 border-lg text-red-700 w-24 h-24 rounded-full">
            <p>40%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
