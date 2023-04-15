import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Avatar,
	Typography,
} from "@material-tailwind/react";
import {
	Cog6ToothIcon,
	PowerIcon,
	InboxArrowDownIcon,
	UserCircleIcon,
	LifebuoyIcon,
} from "@heroicons/react/24/outline";
import Router from "next/router";

function NavLink({ to, children }: any) {
	return (
		<a href={to} className={`mx-4`}>
			{children}
		</a>
	);
}
function MobileNav({ open, setOpen }: any) {
	const session = useSession()
	return (
		<div
			className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out filter drop-shadow-md `}
		>
			<div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
				{" "}
				{/*logo container*/}
				<a className="text-xl font-semibold text-black" href="/">
					FindPark
				</a>
			</div>
			<div className="flex flex-col ml-4 text-black">
				<a
					className="text-xl font-medium my-4"
					href="/users/home"
					onClick={() =>
						setTimeout(() => {
							setOpen(!open);
						}, 100)
					}
				>
					Home
				</a>
				<a
					className="text-xl font-normal my-4 text-black"
					href="/about-us"
					onClick={() =>
						setTimeout(() => {
							setOpen(!open);
						}, 100)
					}
				>
					About
				</a>
				<a
					className="text-xl font-medium my-4"
					href="/faq"
					onClick={() =>
						setTimeout(() => {
							setOpen(!open);
						}, 100)
					}
				>
					FAQ
				</a>
				<hr className="my-2 border-blue-gray-50" />
				<div className="flex">
					{session.data?.user?.name && (
						<div className="flex-col ">
							<a
								className="text-xl font-medium my-4"
								href="/edit-profile"
								onClick={() =>
									setTimeout(() => {
										setOpen(!open);
									}, 100)
								}
							>
								Profile
							</a>
							<br />
							<a
								className="text-xl font-medium my-4"
								href="/history"
								onClick={() =>
									setTimeout(() => {
										setOpen(!open);
									}, 100)
								}
							>
								History
							</a>
							<hr className="my-2 border-blue-gray-50" />
							<a
								className="text-xl font-medium my-4"
								onClick={() =>
									setTimeout(() => {
										setOpen(!open)
										signOut();
									}, 100)
								}
							>
								Sign Out
							</a>
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
		<nav className="bg-gradient-to-r from-white to-blue-700 border-gray-200  flex filter  px-4 py-4 h-20 items-center">
			{" "}
			<MobileNav open={open} setOpen={setOpen} />
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<Link href="/" className="flex items-center">
					{/* <img
            src="https://icons8.com/icon/b3DGakIISqAU/parking"
            className="h-6 mr-3 sm:h-9"
            alt="FindPark Logo"
          /> */}
					<span className="self-center text-xl font-bold whitespace-nowrap text-black">
						FindPark
					</span>
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
					<span
						className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""
							}`}
					/>
					<span
						className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"
							}`}
					/>
					<span
						className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""
							}`}
					/>
				</div>

				<div
					className="hidden md:flex w-full md:block md:w-auto align-middle"
					id="navbar-default"
				>
					<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:border-gray-700">
						<li>
							<Link
								href="/home"
								className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-green md:p-0 dark:text-white"
								aria-current="page"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/about-us"
								className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								FAQ
							</Link>
						</li>

						{session.data?.user?.name && (
							<li>
								<Menu>
									<MenuHandler>
										<Avatar
											variant="circular"
											alt="person"
											className="cursor-pointer rounded-full w-7 h-7"
											src={(session.data.user.image as string) ? session.data.user.image as string : "/gambarprofile.svg"}/>
									</MenuHandler>
									<MenuList>
										<MenuItem className="flex items-center gap-2">
											<UserCircleIcon strokeWidth={2} className="h-4 w-4" />
											<Typography
												variant="small"
												className="font-normal text-black"
											>
												<a onClick={() => Router.push("/profile")}>Profile</a>
											</Typography>
										</MenuItem>
										<MenuItem className="flex items-center gap-2">
											<Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
											<Typography
												variant="small"
												className="font-normal text-black"
											>
												 History
											</Typography>
										</MenuItem>
										<hr className="my-2 border-blue-gray-50" />
										<MenuItem className="flex items-center gap-2 ">
											<PowerIcon strokeWidth={2} className="h-4 w-4" />
											<Typography
												variant="small"
												className="font-normal text-black"
											>
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
