import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const FormProfile = ({ setIsEditProfile }) => {
	const router = useRouter();
	const user = useSelector((state) => state.userLogged.user);
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleUploadPicure = (event) => {
		console.log(event.target.files[0]);
		setFile(event.target.files[0]);
	};

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	useEffect(() => {}, [formData]);

	const onSubmit = async (event) => {
		event.preventDefault();

		const uploadImage = new FormData();
		uploadImage.append("image", file);

		const configHeaders = {
			headers: {
				"content-type": "multipart/form-data",
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		};

		try {
			let profilePicture = "";

			if (!file) {
				profilePicture = user.profilePictureUrl;
			} else {
				const resUploadPicture = await axios.post(
					"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
					uploadImage,
					configHeaders
				);
				profilePicture = resUploadPicture.data.url;
			}

			const payload = {
				name: formData.name,
				phoneNumber: formData.phoneNumber,
				profilePictureUrl: profilePicture,
				email: formData.email,
			};

			const res = await axios.post(
				`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`,
				payload,
				configHeaders
			);
			setIsSuccess(true);
			setTimeout(() => {
				setIsEditProfile(false);
				router.reload();
				setIsSuccess(false);
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-y-3 w-fit">
			<div className="mx-auto w-fit">
				{isSuccess ? (
					<div role="alert" className="alert alert-success">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 stroke-current shrink-0"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="text-white">Success updating profile</span>
						<span className="loading loading-spinner loading-md"></span>
					</div>
				) : (
					<span className="block text-xl font-bold text-[#FF9357]">
						Update User Profile
					</span>
				)}
			</div>
			<form onSubmit={onSubmit}>
				<div className="mb-4">
					<label className="block p-2 text-gray-700" htmlFor="name">
						Name
					</label>
					<input
						onChange={handleChange}
						type="name"
						name="name"
						id="name"
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						defaultValue={user.name}
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block p-2 text-gray-700" htmlFor="email">
						Email Address
					</label>
					<input
						onChange={handleChange}
						type="email"
						name="email"
						id="email"
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						defaultValue={user.email}
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block p-2 text-gray-700" htmlFor="phoneNumber">
						Phone Number
					</label>
					<input
						type="text"
						name="phoneNumber"
						placeholder="0812345678"
						maxLength={13}
						defaultValue={user.phoneNumber}
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-4">
					<label
						className="block p-2 text-gray-700"
						htmlFor="profilePictureUrl"
					>
						Upload Profile Picture
					</label>
					<input
						onChange={handleUploadPicure}
						type="file"
						name="profilePictureUrl"
						id="profilePictureUrl"
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
					/>
				</div>

				<button
					type="submit"
					className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
					disabled={isSuccess}
				>
					{isSuccess && (
						<span className="loading loading-spinner loading-md"></span>
					)}
					Update Profile
				</button>
			</form>
		</div>
	);
};

export default FormProfile;
