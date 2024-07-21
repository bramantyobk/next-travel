import React, { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [isConfirm, setIsConfirm] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [isError, setIsError] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const options = [
		{ label: "admin", value: "admin" },
		{ label: "user", value: "user" },
	];

	const handleUploadPicure = (event) => {
		console.log(event.target.files[0]);
		setFile(event.target.files[0]);
	};

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});

		if (formData.password === formData.passwordRepeat) setIsConfirm(true);
	};

	const onSubmit = async (event) => {
		event.preventDefault();

		const uploadImage = new FormData();
		uploadImage.append("image", file);

		const configHeaders = {
			headers: {
				"content-type": "multipart/form-data",
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
			},
		};

		try {
			const resUploadPicture = await Axios.post(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
				uploadImage,
				configHeaders
			);
			let profilePicture = resUploadPicture.data.url;

			const payload = {
				name: formData.name,
				role: formData.role,
				phoneNumber: formData.phoneNumber,
				profilePictureUrl: profilePicture,
				email: formData.email,
				password: formData.password,
				passwordRepeat: formData.passwordRepeat,
			};

			if (
				payload.name &&
				payload.role &&
				payload.profilePictureUrl &&
				payload.phoneNumber &&
				payload.email &&
				payload.password === payload.passwordRepeat
			) {
				const resRegister = await Axios.post(
					`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register`,
					payload,
					configHeaders
				);
				setTimeout(() => {
					router.push("/auth/login");
				}, 3000);
			} else {
				throw new Error("check the input");
			}
		} catch (err) {
			setIsError(err.response.data.message);
			setTimeout(() => {
				setIsError(false);
			}, 5000);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white shadow-lg rounded-[30px]">
				<h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
				{isError && (
					<div role="alert" className="m-1 alert alert-warning">
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
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span>{isError}!</span>
					</div>
				)}
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
							placeholder="Full Name"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block p-2 text-gray-700" htmlFor="role">
							Role
						</label>
						<select
							name="role"
							id="role"
							required
							className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
							onChange={handleChange}
						>
							<option value="">-- select your role account --</option>
							{options.map((option, key) => (
								<option value={option.value} key={key}>
									{option.label}
								</option>
							))}
						</select>
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
							required
							className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
							onChange={handleChange}
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
							placeholder="Email Address"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block p-2 text-gray-700" htmlFor="password">
							Password
						</label>
						<input
							onChange={handleChange}
							type="password"
							name="password"
							id="password"
							className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
							placeholder="Password"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block p-2 text-gray-700" htmlFor="passwordRepeat">
							Confirm Password
						</label>
						<input
							onChange={handleChange}
							type="password"
							name="passwordRepeat"
							id="passwordRepeat"
							className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
							placeholder="Input the password again"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
					>
						Create account
					</button>
				</form>
				{/* <div className="mt-6 text-center">
					<a href="#" className="text-indigo-600 hover:underline">
						Create New Account
					</a>
				</div> */}
			</div>
		</div>
	);
};

export default Login;
