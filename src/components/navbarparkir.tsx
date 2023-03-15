import Link from 'next/link';

export function Navbarparkir() {
  return (
    <nav className="bg-blue-800">
      <div className="">
        <div className="flex text-5xl pt-5 px-5">
          <div className="px-10">
            <h1>@namaparkiran</h1>
          </div>
          <div className="flex text-3xl items-center bg-yellow-400 py-3 px-10 rounded-full">
            <img src="/lokasi.png" alt="" width={30} />
            <p className="pl-3">800 m</p>
          </div>
        </div>
        <div className="flex text-3xl px-24 items-center">
          <div className="py-10">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt ipsum et alias, inventore recusandae. Omnis porro eos dolorum, iure exercitationem, soluta adipisci totam expedita nihil eum quia voluptates alias!</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
