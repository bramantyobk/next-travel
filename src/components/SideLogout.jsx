import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/slice/userLoggedSlice";
import { GrLogout } from "react-icons/gr";
import axios from "axios";

const SideLogout = ({ open }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		const accessToken = localStorage.getItem("accessToken");

		const configHeaders = {
			headers: {
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${accessToken}`,
			},
		};

		try {
			const res = await axios.get(
				`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout`,
				configHeaders
			);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("userRole");
			dispatch(clearUser());
			router.push("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className={`flex items-center py-2 mt-3 text-sm font-medium border-b border-white rounded-md ${
				open && "hover:pl-2"
			} hover:bg-gray-800  text-wrap`}
		>
			<div className="flex items-center gap-2">
				<GrLogout className="block w-9" size={20} />
				<h2
					style={{
						transitionDelay: `1100ms`,
					}}
					className={`whitespace-pre duration-500 ${
						!open && "opacity-0 translate-x-28 overflow-hidden"
					}`}
				>
					Logout
				</h2>
				<h2
					className={`${
						open && "hidden"
					} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit  `}
				>
					Logout
				</h2>
			</div>
		</button>
	);
};

export default SideLogout;
