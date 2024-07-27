import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { GrEdit, GrTrash } from "react-icons/gr";
import ModalDelete from "./ModalDelete";
import DeletePromo from "./DeletePromo";
const CardPromo = ({ item, promo }) => {
	const [isDelete, setDelete] = useState(false);
	const handleDelete = () => {
		setDelete(!isDelete);
	};
	return (
		<div
			key={item}
			className="w-full p-4 overflow-hidden bg-white rounded-lg shadow-md"
		>
			<img
				src={promo.imageUrl}
				alt={promo.title}
				className="object-cover w-full h-48 rounded-md"
			/>
			<div className="p-4">
				<h3 className="text-lg font-bold">{promo?.title}</h3>

				<div className="flex items-center justify-start mt-1 gap-x-2">
					<p className="font-semibold text-gray-600">Promo Code : </p>
					<span className="text-lg font-semibold">{promo?.promo_code}</span>
				</div>
				<div className="flex items-center justify-start mt-1 gap-x-2">
					<p className="font-semibold text-gray-600">Discount Price : </p>
					<span className="text-lg font-semibold">
						{promo?.promo_discount_price?.toLocaleString("id-ID", {
							style: "currency",
							currency: "IDR",
							maximumFractionDigits: 0,
						})}
					</span>
				</div>
				<div className="flex items-center justify-start mt-1 gap-x-2">
					<p className="font-semibold text-gray-600">Minimum Claim :</p>
					<span className="text-lg font-semibold">
						{promo?.minimum_claim_price?.toLocaleString("id-ID", {
							style: "currency",
							currency: "IDR",
							maximumFractionDigits: 0,
						})}
					</span>
				</div>
				<div className="flex items-center justify-start mt-1 gap-x-2">
					<p className="font-semibold text-gray-600">Updated At : </p>
					{moment(promo?.updatedAt).format("DD MMMM YYYY => HH:mm:ss")}
				</div>
				<div className="flex flex-col items-center justify-center mt-2 gap-y-3">
					<Link
						className="hover:text-gray-600 text-white gap-x-2 border flex items-center justify-center border-slate-300 bg-[#FF9357] hover:border hover:border-[#FF9357] hover:bg-white w-full p-2 rounded-full"
						href={`/dashboard/promo/${promo?.id}`}
					>
						<GrEdit />
						<span className="block font-semibold ">Edit</span>
					</Link>
					<button
						className="flex items-center justify-center w-full p-2 font-bold text-red-800 bg-gray-200 rounded-full hover:text-red-500 hover:bg-white hover:border hover:border-red-500 gap-x-2"
						onClick={handleDelete}
					>
						<GrTrash />
						Delete
					</button>

					<ModalDelete isDelete={isDelete} onClose={() => setDelete(!isDelete)}>
						<DeletePromo promo={promo} setDelete={setDelete} />
					</ModalDelete>
				</div>
			</div>
		</div>
	);
};

export default CardPromo;
