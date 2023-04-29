import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react';
import { Cog6ToothIcon, PowerIcon, InboxArrowDownIcon, UserCircleIcon, LifebuoyIcon } from '@heroicons/react/24/outline';
import Router from 'next/router';

function NavLink({ to, children }: any) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}
function MobileNav({ open, setOpen }: any) {
  const session = useSession();
  return (
    <div className={`absolute top-0 left-0 w-screen bg-ungugelap transform ${open ? '-translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
      <div className="flex items-center justify-center filter drop-shadow-md border-2 bg-blue-700  h-20">
        {' '}
        {/*logo container*/}
        <a className="text-xl font-semibold text-white " href="/">
          FindPark
        </a>
      </div>
      <div className="flex flex-col text-white bg-blue-700">
        <div className="flex py-2">
          <a
            className="text-xl font-medium"
            href="/users/home"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            Home
          </a>
        </div>
        <div className="flex py-2">
          <a
            className="text-xl font-normal text-white"
            href="/about-us"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            About
          </a>
        </div>
        <div className="flex py-2">
          <a
            className="text-xl font-medium"
            href="/faq"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            FAQ
          </a>
        </div>
        <hr className="border border-white" />
        <div className="flex">
          {session.data?.user?.name && (
            <div className="flex-col ">
              <div className="flex py-2">
                <a
                  className="text-xl font-medium"
                  href="/edit-profile"
                  onClick={() =>
                    setTimeout(() => {
                      setOpen(!open);
                    }, 100)
                  }
                >
                  Profile
                </a>
              </div>

              <div className="flex py-2">
                <a
                  className="text-xl font-medium"
                  href="/history"
                  onClick={() =>
                    setTimeout(() => {
                      setOpen(!open);
                    }, 100)
                  }
                >
                  History
                </a>
              </div>

              <div className="flex py-2">
                <a
                  className="text-xl font-medium"
                  onClick={() =>
                    setTimeout(() => {
                      setOpen(!open);
                      signOut();
                    }, 100)
                  }
                >
                  Sign Out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  return (
    <nav className="bg-blue-700 border-gray-200  flex filter  px-4 py-4 h-20 items-center">
      {' '}
      <MobileNav open={open} setOpen={setOpen} />
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          {/* <img
            src="https://icons8.com/icon/b3DGakIISqAU/parking"
            className="h-6 mr-3 sm:h-9"
            alt="FindPark Logo"
          /> */}
          <span className="self-center text-xl font-bold whitespace-nowrap text-ungugelap">FindPark</span>
        </Link>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-3.5' : ''}`} />
          <span className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${open ? 'w-0' : 'w-full'}`} />
          <span className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? '-rotate-45 -translate-y-3.5' : ''}`} />
        </div>

        <div className="hidden md:flex w-full md:w-auto align-middle" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-yellow-500 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
            <li>
              <Link href="/home" className="py-2 pl-3 pr-4 text-white bg-transparent rounded md:text-green md:p-0" aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className=" py-2 pl-3 pr-4 text-white bg-transparent hover:bg-abu md:hover:bg-transparent md:border-0 md:p-0">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className=" py-2 pl-3 pr-4 text-white bg-transparent rounded hover:bg-abu md:hover:bg-transparent md:border-0 md:p-0">
                FAQ
              </Link>
            </li>

            {session.data?.user?.name && (
              <li>
                <Menu>
                  <MenuHandler>
                    <Avatar variant="circular" alt="person" className="cursor-pointer rounded-full w-8 h-8" src={(session.data.user.image as string) ? (session.data.user.image as string) : '/gambarprofile.svg'} />
                  </MenuHandler>
                  <MenuList className="bg-yellow-500 w-28 rounded-xl">
                    <MenuItem className="flex items-center hover:bg-yellow-600">
                      <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                      <Typography variant="small" className="font-normal px-1 text-white">
                        <a onClick={() => Router.push('/profile')}>Profile</a>
                      </Typography>
                    </MenuItem>
                    <MenuItem className="flex items-center hover:bg-yellow-600">
                      <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
                      <Typography variant="small" className="font-normal px-1 text-white">
                        History
                      </Typography>
                    </MenuItem>

                    <MenuItem className="flex items-center hover:bg-yellow-600">
                      <PowerIcon strokeWidth={2} className="h-4 w-4" />
                      <Typography variant="small" className="font-normal px-1 text-white">
                        <a onClick={() => signOut()}>Sign Out</a>
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
