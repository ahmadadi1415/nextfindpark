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

    _count: {
      parkinghistory: number
    }
  };
  userDistance: number;
}

export function Recomcard(props: Props) {
  const { parkingLot, userDistance } = props;

  function convertDistance(): string {
    if (userDistance === undefined) {
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
    <Link href={`/parking-lot/${parkingLot.id}/details`}>
      <div className="flex justify-center">
        <div className="block max-w-sm rounded-lg bg-white drop-shadow-2xl ">
          <div className="p-6">
            <div className="h-48 relative">
              <Image className="object-cover" fill sizes="50vw" priority={true} src={parkingLot.image} alt="" />
            </div>
            <h5 className="py-5 text-xl font-bold leading-tight text-black">{parkingLot.name}</h5>
            <p className="text-justify text-base text-black">{parkingLot.description}</p>
          </div>
          
          <div className="flex mb-5 max-w-lg px-2 h-20 rounded-r-full items-center bg-blue-700 text-white">
            <div>
              <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex px-2 w-24 justify-center">
                <p className="">{convertDistance()} </p>
              </div>
            </div>
            <div>
              <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <div className='mx-2'>
                  {parkingLot._count.parkinghistory}
                </div>
              </div>
              <div className="flex px-2 w-40 justify-center">
                <p className="">{parkingLot.status ? 'PENUH' : 'BELUM PENUH'}</p>
              </div>
            </div>
            <div className="flex items-center text-2xl pr-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd"
                />
              </svg>

              <p className='text-base'>{parkingLot.rate}</p>
            </div>
            
          </div>
        </div>
      </div>
      </Link>
    </>
  );
}

export function Findcard(props: Props) {
  const { parkingLot } = props;
  function convertDistance(): string {
    if (parkingLot.distance === undefined) {
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
            <div className="flex h-10 justify-between text-white">
              <div className="flex bg-yellow-500  w-24 justify-center py-3 items-center rounded-full mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>{parkingLot.rate}</p>
              </div>
              <div className="flex bg-yellow-500  w-24 py-3 justify-center items-center rounded-full mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                <p className="p-1">{parkingLot._count.parkinghistory}</p>
              </div>
              
              <div className="flex bg-yellow-500 w-24 py-3 justify-center items-center rounded-full mx-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="pl-1">{convertDistance()}</p>
              </div>
            </div>
          </div>
          <div className="flex lg:items-center justify-center py-2 px-2 bg-yellow-500 hover:bg-yellow-600 rounded-r-lg">
            <div className="flex items-center justify-center border-8 border-white border-lg text-white w-24 h-24 rounded-full">
              <p className="text-center text-sm">{parkingLot.status ? 'PENUH' : 'MASIH KOSONG'}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
