import FormPromo from "@/components/FormPromo";
import Sidebar from "@/components/Sidebar";

const createPromo = () => {
	return (
		<main>
			<Sidebar />
			<section className="flex items-center justify-center pt-3">
				<FormPromo />
			</section>
		</main>
	);
};

export default createPromo;
