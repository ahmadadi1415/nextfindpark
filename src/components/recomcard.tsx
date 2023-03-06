import { ppid } from 'process';

export function Recomcard() {
  return (
    <>
      <div className="flex justify-center">
        <div className="block max-w-lg rounded-lg bg-white shadow-lg dark:bg-neutral-700">
          <div className="p-6">
            <div>
              <a href="#!">
                <img className="rounded-t-lg" src="https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg" alt="" />
              </a>
            </div>
            <h5 className="py-5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Nama Parkiran</h5>
            <p className="text-base text-neutral-600 dark:text-neutral-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, maiores exercitationem excepturi dignissimos quis illum! Adipisci ratione quod ipsum, voluptate, vitae inventore consequatur, harum a voluptatum excepturi
              voluptates atque delectus?
            </p>
          </div>
          <div className="grid grid-cols-4 mb-5 max-w-lg h-20 rounded-r-full items-center bg-black">
            <div className=" text-center">
              <img className="" src="/lokasi.png" alt="" width="36" />
              <p>Jarak</p>
            </div>
            <div className=" text-center">
              <img className="" src="/motor.png" alt="" width="52" />
              <p>Kapasitas</p>
            </div>
            <div>
              <img className="" src="/star.png" alt="" />
            </div>
            <div>
              <button className="w-12 h-12 bg-neutral-700 rounded-full">
                <a href="">Cek</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
