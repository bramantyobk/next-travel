import { useSelector } from "react-redux";

const SideUser = ({ open }) => {
	const user = useSelector((state) => state.userLogged.user);
	const logged = useSelector((state) => state.userLogged.isLogged);

	return (
		<div
			className={`flex items-center py-2 text-sm font-medium border-b border-white rounded-md ${
				open && "hover:pl-2"
			} hover:bg-gray-800  text-wrap`}
		>
			{logged && (
				<div className="flex items-center gap-2">
					<img
						src={user.profilePictureUrl}
						alt={`Picture of ${user.name}`}
						className="block rounded-full w-9"
					/>
					<h2
						style={{
							transitionDelay: `1000ms`,
						}}
						className={`whitespace-pre duration-500 ${
							!open && "opacity-0 translate-x-28 overflow-hidden"
						}`}
					>
						{user?.name}
					</h2>
					<h2
						className={`${
							open && "hidden"
						} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit  `}
					>
						{user?.name}
					</h2>
				</div>
			)}
		</div>
	);
};

export default SideUser;
