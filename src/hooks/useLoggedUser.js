import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const getLoggedUser = async () => {
	const config = {
		headers: {
			apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	};

	try {
		const res = await axios.get(
			"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
			config
		);
		return res?.data.data;
	} catch (err) {
		console.log(err);
	}
};

const useLoggedUser = () => {
	const router = useRouter();

	useEffect(() => {
		const checkUser = async () => {
			const loggedUser = await getLoggedUser();
			if (!loggedUser) {
				router.push("/auth/login"); // Redirect to login page if not logged in
			}
		};
		checkUser();
	}, [router]);
};

export default useLoggedUser;
