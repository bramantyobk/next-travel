import { useSelector } from "react-redux";
import useLoggedUser from "@/hooks/useLoggedUser";
import Navbar from "@/components/Navbar";
import { LiaUserTagSolid } from "react-icons/lia";
import { MdOutlineEmail, MdOutlineVerifiedUser } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import ModalProfile from "@/components/ModalProfile";
import FormProfile from "@/components/FormProfile";

const Profile = () => {
	useLoggedUser();
	const user = useSelector((state) => state.userLogged.user);
	const [isEditProfile, setIsEditProfile] = useState(false);

	const handleEdit = () => {
		setIsEditProfile(!isEditProfile);
	};

	return (
		<>
			<Navbar />
			<section className="grid h-screen pt-32 mx-auto md:place-content-center place-content-start">
				<div className="flex items-start justify-center md:items-center">
					<div className="flex flex-col items-center justify-center w-2/3 gap-5 p-5 bg-white shadow-xl lg:flex-row rounded-xl">
						<img
							src={user?.profilePictureUrl}
							alt={`Picture of ${user?.name}`}
							className="block object-cover w-5/6 h-auto md:w-2/6 rounded-xl"
						/>

						<div className="p-3 bg-amber-100 rounded-xl w-fit">
							<div className="items-center justify-between hidden gap-5 p-5 border border-orange-300 rounded-lg md:flex">
								<div className="font-semibold">
									<p className="flex items-center gap-1">
										<LiaUserTagSolid /> Name
									</p>
									<p className="flex items-center gap-1">
										<MdOutlineEmail /> Email
									</p>
									<p className="flex items-center gap-1">
										<FiPhone /> Phone Number
									</p>
									<p className="flex items-center gap-1 ">
										<MdOutlineVerifiedUser /> Role
									</p>
								</div>
								<div className="text-wrap">
									<p>
										<span className="font-semibold">:</span> {user?.name}
									</p>
									<p>
										<span className="font-semibold">:</span> {user?.email}
									</p>
									<p>
										<span className="font-semibold">:</span> {user?.phoneNumber}
									</p>
									<p>
										<span className="font-semibold">:</span> {user?.role}
									</p>
								</div>
							</div>
							<div className="flex flex-col items-start justify-center p-5 border border-orange-300 rounded-lg md:hidden gap-y-5">
								<div className="w-full border-b border-gray-400">
									<p className="flex items-center gap-1 font-semibold">
										<LiaUserTagSolid /> Name:
									</p>
									<p>{user?.name}</p>
								</div>
								<div className="w-full border-b border-gray-400">
									<p className="flex items-center gap-1 font-semibold">
										<MdOutlineEmail /> Email:
									</p>
									<p>{user?.email}</p>
								</div>
								<div className="w-full border-b border-gray-400">
									<p className="flex items-center gap-1 font-semibold">
										<FiPhone />
										Phone Number:
									</p>
									<p>{user?.phoneNumber}</p>
								</div>
								<div className="w-full border-b border-gray-400">
									<p className="flex items-center gap-1 font-semibold">
										<MdOutlineVerifiedUser /> Role:
									</p>
									<p>{user?.role}</p>
								</div>
							</div>
							<button
								className="bg-[#ff9753] block w-full rounded-full mt-3 text-white font-semibold p-2"
								onClick={handleEdit}
							>
								<div className="flex items-center justify-center gap-x-2">
									<TiEdit size={23} />
									<span className="block">Update Profile</span>
								</div>
							</button>
							<ModalProfile
								isEditProfile={isEditProfile}
								onClose={() => setIsEditProfile(!isEditProfile)}
							>
								<FormProfile setIsEditProfile={setIsEditProfile} />
							</ModalProfile>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Profile;
