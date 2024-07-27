import axios from "axios";
import { useRouter } from "next/router";
const DeletePromo = ({ promo, setDelete }) => {
	const router = useRouter();

	const handleDelete = async () => {
		const config = {
			headers: {
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		};

		const url = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${promo.id}`;
		try {
			const res = await axios.delete(url, config);
			console.log(res);
			setDelete(false);
			router.reload();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="flex flex-col items-center justify-center gap-y-5 w-fit">
			<div className="text-lg font-bold text-red-500">Delete Promo</div>
			<div>
				Are you sure to delete{" "}
				<span className="text-lg font-bold text-black">{promo.title}</span>'s
				promo?
			</div>
			<button
				className="w-full p-3 mt-3 font-bold text-white bg-red-500 rounded-full hover:text-red-500 hover:bg-white hover:border hover:border-red-500"
				onClick={handleDelete}
			>
				DELETE
			</button>
		</div>
	);
};

export default DeletePromo;
