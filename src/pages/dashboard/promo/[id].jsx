import FormPromoEdit from "@/components/FormPromoEdit";
import Sidebar from "@/components/Sidebar";
import axios from "axios";

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

const UpdatePromo = ({ promo }) => {
	return (
		<main>
			<Sidebar />
			<section className="flex items-center justify-center pt-3">
				<FormPromoEdit promo={promo} />
			</section>
		</main>
	);
};

export default UpdatePromo;
