import moment from "moment";
import Link from "next/link";

const CardPromoPage = ({ item, promo }) => {
	return (
		<Link
			key={item}
			className="w-full p-4 overflow-hidden duration-200 bg-white rounded-lg shadow-md hover:-translate-y-2"
			href={`/promo/${promo.id}`}
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
					{moment(promo?.updatedAt).format("DD MMMM YYYY")}
				</div>
			</div>
		</Link>
	);
};

export default CardPromoPage;
