import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { TbHomeShare } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import SideUser from "./SideUser";
import SideLogout from "./SideLogout";

const Sidebar = () => {
	const user = useSelector((state) => state.userLogged.user);
	const [open, setOpen] = useState(false);
	const menus = [
		{ name: "Preview", link: "/", icon: TbHomeShare },
		{ name: "User", link: "/dashboard/user", icon: AiOutlineUser },
		{ name: "Banner", link: "/dashboard/banner", icon: ImFilePicture },
		{ name: "Promo", link: "/dashboard/promo", icon: HiOutlineReceiptPercent },
		{ name: "Category", link: "/dashboard/category", icon: MdOutlineCategory },
		{ name: "Activity", link: "/dashboard/activity", icon: FiShoppingCart },
	];
	return (
		<section>
			<div
				className={`bg-gray-500 min-h-screen fixed top-0 left-0 z-0  ${
					open ? "w-1/2 lg:w-1/6" : "w-16"
				} duration-500 text-gray-100 px-4`}
			>
				<div className="flex items-center justify-between py-3">
					{open && (
						<div className="flex items-center gap-2 p-3 bg-white rounded-lg">
							<Image
								src="/favicon.svg"
								width={30}
								height={30}
								alt="Logo Next Travel"
							/>
							<span className="block font-bold text-black">Next Travel</span>
						</div>
					)}
					<div className=" hover:rounded-md hover:bg-gray-800">
						<HiMenuAlt3
							size={26}
							className="cursor-pointer"
							onClick={() => setOpen(!open)}
						/>
					</div>
				</div>
				<div className="relative flex flex-col gap-4 mt-4">
					{menus?.map((menu, item) => (
						<Link
							href={menu?.link}
							key={item}
							className={` ${
								menu?.margin && "mt-5"
							} group flex items-center text-sm  gap-3 font-medium p-2 hover:bg-gray-800 rounded-md text-wrap border-b border-white`}
						>
							<div>{React.createElement(menu?.icon, { size: "20" })}</div>
							<h2
								style={{
									transitionDelay: `${item + 3}00ms`,
								}}
								className={`whitespace-pre duration-500 ${
									!open && "opacity-0 translate-x-28 overflow-hidden"
								}`}
							>
								{menu?.name}
							</h2>
							<h2
								className={`${
									open && "hidden"
								} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
							>
								{menu?.name}
							</h2>
						</Link>
					))}
					<Link className="block mt-10" href={"/profile"}>
						<SideUser open={open} />
					</Link>
					<SideLogout open={open} />
				</div>
			</div>
		</section>
	);
};

export default Sidebar;
