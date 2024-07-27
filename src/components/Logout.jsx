import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/slice/userLoggedSlice";
import { GrLogout } from "react-icons/gr";

const Logout = ({ className }) => {
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
			dispatch(clearUser());
			localStorage.removeItem("accessToken");
			localStorage.removeItem("userRole");
			router.push("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button onClick={handleLogout} className={className}>
			<GrLogout />
			Logout
		</button>
	);
};

export default Logout;
