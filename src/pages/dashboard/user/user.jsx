import useAuth from "@/hooks/useAuth";

const user = () => {
	useAuth("admin");
	return (
		<>
			<div>user</div>
		</>
	);
};

export default user;
