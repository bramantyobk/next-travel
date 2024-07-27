import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Logout from "./Logout";
import NavUser from "./NavUser";

const Navbar = () => {
	const user = useSelector((state) => state.userLogged.user);
	const logged = useSelector((state) => state.userLogged.isLogged);
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);
	const [isDashboard, setIsDasboard] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const getUser = () => {
		if (user) {
			setIsDasboard(!isDashboard);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsSticky(true);
			}
		};
		window.addEventListener("scroll", handleScroll);
		getUser();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 w-full shadow-lg">
			<nav className="px-4 py-4 bg-white md:px-12">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start text-lg font-bold">
						<Image
							src="/favicon.svg"
							alt="Logo Next Travel"
							width={30}
							height={30}
						/>
						<span className="px-4 text-black">Next Travel</span>
					</div>

					{/* for larger device */}
					<div className="items-center hidden gap-3 lg:flex ">
						<Link
							href="/"
							className={`block px-4 py-2 cursor-pointer hover:text-[#ff9357] ${
								pathname === "/" && "text-primary font-bold"
							}`}
						>
							Home
						</Link>
						<Link
							href="/activity"
							className={`block px-4 py-2 cursor-pointer hover:text-[#ff9357] ${
								pathname === "/activity" && "text-primary font-bold"
							}`}
						>
							Activity
						</Link>
						<Link
							href="/promo"
							className={`block px-4 py-2 cursor-pointer hover:text-[#ff9357] ${
								pathname === "/promo" && "text-primary font-bold"
							}`}
						>
							Promo
						</Link>
						{isDashboard && (
							<Link
								href="/dashboard/user"
								className="block px-4 py-2 cursor-pointer hover:text-[#ff9357]"
							>
								Dashboard
							</Link>
						)}
					</div>

					{logged ? (
						<div className="hidden lg:block">
							<NavUser />
						</div>
					) : (
						<div className="hidden md:block px-7 py-2 bg-[#ff9357] hover:border-2 hover:border[#ff9357] hover:bg-white rounded-full font-bold text-white hover:text-black">
							<Link href="/auth/login">Login</Link>
						</div>
					)}

					{/* btn for small devices */}
					<button onClick={toggleMenu} className="text-3xl lg:hidden text-body">
						<HiMenu />
					</button>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="p-4 mt-4 text-black bg-white rounded-lg">
						<Link
							href="/"
							className={`block py-2 hover:text-[#ff9357] ${
								pathname === "/" && "text-primary font-bold"
							}`}
						>
							Home
						</Link>
						<Link
							href="/activity"
							className={`block py-2 hover:text-[#ff9357]${
								pathname === "/activity" && "text-primary font-bold"
							}`}
						>
							Skills
						</Link>
						<Link
							href="/promo"
							className={`block py-2 hover:text-[#ff9357]${
								pathname === "/promo" && "text-primary font-bold"
							}`}
						>
							Promo
						</Link>

						{isDashboard && (
							<Link
								href="/dashboard/user"
								className={`block py-2 hover:text-[#ff9357] mb-2`}
							>
								Dashboard
							</Link>
						)}

						{logged ? (
							<div className="lg:hidden">
								<NavUser />
							</div>
						) : (
							<div className="px-7 py-2 bg-[#ff9357] hover:border-2 hover:border[#ff9357] hover:bg-white rounded-full font-bold text-white hover:text-black">
								<Link href="/auth/login">Login</Link>
							</div>
						)}
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
