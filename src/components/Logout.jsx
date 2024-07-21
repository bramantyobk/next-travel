import Axios from "axios";

const Logout = () => {
	const handleLogout = async () => {
		const accessToken = localStorage.getItem("accessToken");

		const configHeaders = {
			headers: {
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${accessToken}`,
			},
		};

		try {
			const res = await Axios.post(
				`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout`,
				configHeaders
			);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("userRole");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button>
			<div>Logout</div>
		</button>
	);
};

export default Logout;
