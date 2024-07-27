import useAuth from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
const dashboard = () => {
	useAuth("admin");

	return (
		<>
			<Navbar />
			<main className="flex justify-between">
				<Sidebar />
				<div className="w-5/6 border border-red-500">
					<div>dashboard</div>
				</div>
			</main>
		</>
	);
};

export default dashboard;
