import axios from "axios";
import Navbar from "@/components/Navbar";
import moment from "moment";

export async function getServerSideProps(context) {
	const config = {
		headers: {
			apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
		},
	};

	const res = await axios.get(
		`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${context.params.id}`,
		config
	);
	const data = res?.data.data;
	return { props: { promo: data } };
}

const PromoPage = ({ promo }) => {
	return (
		<main>
			<Navbar />
			<div className="flex flex-col items-center justify-center pt-40">
				<div className="mb-10 text-2xl font-bold">{promo.title}'s Promo</div>
				<div className="flex flex-col items-center justify-center p-5 bg-white rounded-xl">
					<div className="p-5">
						<img
							src={promo.imageUrl}
							alt={`Picture of ${promo.title}`}
							className="block rounded-lg h-1/3"
						/>
					</div>
					<div className="flex flex-col items-start justify-center w-full rounded-lg p-7 bg-emerald-200 gap-y-5">
						<div className="w-full">
							<div className="font-bold border-b border-[#ff9357">
								Promo Name
							</div>
							<div>{promo?.title}</div>
						</div>
						<div className="w-full border-b border-[#ff9357">
							<div className="font-bold">Description</div>
							<div>{promo?.description}</div>
						</div>
						<div className="w-full border-b border-[#ff9357">
							<div className="font-bold">Terms and Condition</div>
							<div>{promo?.terms_condition}</div>
						</div>
						<div className="w-full border-b border-[#ff9357">
							<div className="font-bold">Promo Code</div>
							<div>{promo?.promo_code}</div>
						</div>
						<div className="w-full border-b border-[#ff9357">
							<div className="font-bold">Discount Price</div>
							<div>
								{promo?.promo_discount_price?.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
									maximumFractionDigits: 0,
								})}
							</div>
						</div>
						<div className="w-full border-b border-[#ff9357">
							<div className="font-bold">Minimum Price to Claim</div>
							<div>
								{promo?.minimum_claim_price?.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
									maximumFractionDigits: 0,
								})}
							</div>
						</div>
						<div className="w-full border-b border-[#ff9357">
							<div className="font-bold">Created At </div>
							<div>
								{moment(promo?.createdAt).format("DD MMMM YYYY => HH:mm")}
							</div>
						</div>
						<div className="w-full border-b border-[#ff9357]">
							<div className="font-bold">Updated At </div>
							<div>
								{moment(promo?.updated).format("DD MMMM YYYY => HH:mm")}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PromoPage;
