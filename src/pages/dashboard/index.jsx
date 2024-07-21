import useAuth from "@/hooks/useAuth";

const dashboard = () => {
	useAuth("admin");

	return (
		<>
			<div>dashboard</div>
		</>
	);
};

export default dashboard;
