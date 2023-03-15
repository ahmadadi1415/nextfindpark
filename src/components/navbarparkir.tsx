import Link from 'next/link';

export function Navbarparkir() {
  return (
    <nav className="bg-blue-800">
      <div className="">
        <div className="lg:flex text-5xl pt-5">
          <div className="flex justify-center px-10 pb-5">
            <h1>@namaparkiran</h1>
          </div>
          <div>
            <div className="flex justify-center">
              <div className="flex text-3xl items-center bg-yellow-400 py-3 px-10 rounded-full">
                <img src="/lokasi.png" alt="" width={30} />
                <p className="pl-3">800 m</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex text-xl px-24">
          <div className="py-5">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt ipsum et alias, inventore recusandae. Omnis porro eos dolorum, iure exercitationem, soluta adipisci totam expedita nihil eum quia voluptates alias!</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
