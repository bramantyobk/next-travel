import { HiOutlineMailOpen } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { GrEdit } from "react-icons/gr";
import { useState } from "react";
import ModalUser from "@/components/ModalUser";
import axios from "axios";
import { useRouter } from "next/router";
const CardUser = ({ user, item }) => {
	const router = useRouter();
	const [isEditRole, setIsEditRole] = useState(false);
	const [userRole, setUserRole] = useState("");

	const handleChange = (event) => {
		setUserRole(event.target.value);
	};

	const handleEdit = () => {
		setIsEditRole(true);
	};

	const handleUpdate = async (id) => {
		const payload = { role: userRole };
		const configHeaders = {
			headers: {
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		};
		try {
			const res = await axios.post(
				`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
				payload,
				configHeaders
			);
			setIsEditRole(false);
			router.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			key={item}
			className="w-full p-4 overflow-hidden bg-white rounded-lg shadow-md"
		>
			<img
				src={user.profilePictureUrl}
				alt={user.name}
				className="object-cover w-full h-48"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold">{user.name}</h3>
				<div className="flex items-center justify-start gap-x-2">
					<HiOutlineMailOpen />
					<p className="text-gray-600">{user.email}</p>
				</div>
				<div className="flex items-center justify-start gap-x-2">
					<FaPhone />
					<p className="text-gray-600">{user.phoneNumber}</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start gap-x-2">
						<GrUserAdmin />
						<p className="text-gray-600">Role: {user.role}</p>
					</div>
					<button
						className="border border-slate-300 bg-[#FF9357] hover:border hover:border-[#FF9357] hover:bg-white p-3 rounded-full"
						onClick={handleEdit}
					>
						<GrEdit />
					</button>
					<ModalUser
						isEditRole={isEditRole}
						onClose={() => setIsEditRole(false)}
					>
						<div className="flex flex-col items-center justify-center gap-y-3 w-fit">
							<div className="mx-auto w-fit">
								<span className="block text-xl font-bold text-[#FF9357]">
									Update User Role
								</span>
							</div>
							<div className="flex flex-col items-center justify-center md:flex-row md:gap-x-4">
								<img
									src={user.profilePictureUrl}
									alt={user.name}
									className="block object-cover w-20 h-20 rounded-full"
								/>

								<div className="flex flex-col gap-y-2">
									<span className="block font-bold">{user.name}</span>
									<select
										name="userRole"
										id="userRole"
										defaultValue={user.role}
										className="block border w-60 border-slate-300"
										onChange={handleChange}
									>
										<option value="admin">Admin</option>
										<option value="user">User</option>
									</select>
								</div>
							</div>
							<div className="flex flex-col justify-center md:flex-row">
								<button
									className="block w-full btn bg-[#FF9357]"
									onClick={() => handleUpdate(user.id)}
								>
									Update
								</button>
							</div>
						</div>
					</ModalUser>
				</div>
			</div>
		</div>
	);
};

export default CardUser;
