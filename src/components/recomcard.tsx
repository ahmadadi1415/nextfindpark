import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { ppid } from 'process';

interface Props {
  parkingLot: {
    id: number;
    name: string;
    description: string;
    location: string;
    image: string;
    latitude: string;
    longitude: string;
    status: boolean;
    hourlyFee: string;
    rate: number;
    createdAt: string;
    updatedAt: string;
    distance: number;
  };
  userDistance: number;
}

export function Recomcard(props: Props) {
  const { parkingLot, userDistance } = props;

  function convertDistance(): string {
    if (!userDistance) {
      return 'Counting...';
    }
    if (userDistance > 500) {
      const cDistance = (userDistance / 1000).toFixed(1);
      return `${cDistance} km`;
    }

    return `${userDistance} m`;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="block max-w-sm rounded-lg bg-white drop-shadow-2xl ">
          <div className="p-6">
            <div className="h-48 relative">
              <Image className="object-cover" fill sizes="50vw" priority={true} src={parkingLot.image} alt="" />
            </div>
            <h5 className="py-5 text-xl font-bold leading-tight text-black">{parkingLot.name}</h5>
            <p className="text-justify text-base text-black">{parkingLot.description}</p>
          </div>
          <div className="flex blocked mb-5 max-w-lg px-2 h-20 rounded-r-full items-center bg-blue-700 text-white">
            <div className="flex justify-center  px-2 ">
              <p className="">{convertDistance()} </p>
            </div>
            <div className="flex justify-center  px-2">
              <p className="">{parkingLot.status ? 'PENUH' : 'BELUM PENUH'}</p>
            </div>
            <div className="flex text-2xl  px-2">
              <Image className="" src="/star.png" alt="" width={35} height={35} />
              <p>{parkingLot.rate}</p>
            </div>
            <div className="flex items-center px-2">
              <button className=" px-3 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full">
                <Link href={`/parking-lot/${parkingLot.id}/details`}>
                  <img src="/panahnext.png" alt="" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Findcard(props: Props) {
  const { parkingLot } = props;
  function convertDistance(): string {
    if (!parkingLot.distance) {
      return 'Counting...';
    }
    if (parkingLot.distance > 500) {
      const cDistance = (parkingLot.distance / 1000).toFixed(1);
      return `${cDistance} km`;
    }

    return `${parkingLot.distance} m`;
  }
  return (
    <Link href={`/parking-lot/${parkingLot.id}/details`}>
      <div className="flex justify-center drop-shadow-md">
        <div className="flex flex-col rounded-lg bg-white  md:max-w-xl md:flex-row">
          <div className="flex flex-col justify-start p-6">
            <h5 className="mb-2 text-3xl font-bold text-black">{parkingLot.name}</h5>
            <h6 className="mb-2 text-base font-sans text-black">{parkingLot.location}</h6>
            <p className="mb-4 text-sm text-black">{parkingLot.description}</p>
            <div className="flex h-10 justify-between text-black">
              <button className="w-28 bg-yellow-500 hover:bg-yellow-600 rounded-full">{parkingLot.rate}</button>
              <button className="w-28 bg-yellow-500 hover:bg-yellow-600 rounded-full">{convertDistance()}</button>
            </div>
          </div>
          <div className="flex lg:items-center justify-center py-2 px-2 bg-yellow-500 rounded-r-lg">
            <div className="flex items-center justify-center border-8 border-white border-lg text-white w-24 h-24 rounded-full">
              <p className="text-center text-sm">{parkingLot.status ? 'PENUH' : 'MASIH KOSONG'}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
