const CardUser = ({ user, item }) => {
	return (
		<div
			key={item}
			className="w-full m-4 overflow-hidden bg-white rounded-lg shadow-md"
		>
			<img
				src={user.profilePictureUrl}
				alt={user.name}
				className="object-cover w-full h-48"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold">{user.name}</h3>
				<p className="text-gray-600">{user.email}</p>
				<p className="text-gray-600">{user.phoneNumber}</p>
				<p className="text-gray-600">Role: {user.role}</p>
			</div>
		</div>
	);
};

export default CardUser;
