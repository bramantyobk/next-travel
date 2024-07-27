import { useSelector } from "react-redux";
import Logout from "./Logout";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const NavUser = () => {
	const user = useSelector((state) => state.userLogged.user);

	return (
		<div className="dropdown dropdown-end px-4 py-1 transition-all duration-300 rounded-lg hover:bg-[#ff9357] text-black bg-white border border-[#ff9357] hover:text-white">
			<div tabIndex={0} role="button" className="flex items-center gap-1">
				<img
					src={user.profilePictureUrl}
					className="block w-auto h-6 rounded-full"
				/>
				<span className="block">{user.name}</span>
				<span className="block">
					<FaChevronDown />
				</span>
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-4"
			>
				<li>
					<Link
						href="/profile"
						className="hover:bg-[#ff9753] hover:border p-2 hover:text-white text-black flex items-center justify-center text-center mb-2"
					>
						<CgProfile />
						Profile
					</Link>
				</li>
				<li>
					<Logout
						className={
							"hover:bg-[#ff9753] hover:border p-2 hover:text-white text-black flex items-center justify-center"
						}
					/>
				</li>
			</ul>
		</div>
	);
};

export default NavUser;
