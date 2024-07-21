import React, { useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [isSuccess, setIsSuccess] = useState(false);

	const onSubmit = async (event) => {
		event.preventDefault();

		const dataLogin = { email: formData.email, password: formData.password };
		const configHeaders = {
			headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
		};

		try {
			const res = await Axios.post(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
				dataLogin,
				configHeaders
			);
			localStorage.setItem("accessToken", res?.data.token);
			localStorage.setItem("userRole", res?.data.data.role);
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(true);
				router.push("/dashboard");
			}, 3000);
		} catch (err) {
			console.log(err.response.data.message);
			let errMessage = err.response.data.message;
			if (errMessage === "User not found")
				alert(`${errMessage}, please register first`);
			alert("Please check your email or password again");
		}
	};

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white shadow-lg rounded-[30px]">
				<h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
				<form onSubmit={onSubmit}>
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

					{/* {remember me} */}
					{/* {
						<div className="flex items-center justify-between mb-6">
							<label className="flex items-center">
								<input
									type="checkbox"
									className="border focus:border-2 hover:border-black checkbox [--chkbg:#FF9357] [--chkfg:white] focus:border-black checked:border-2"
								/>
								<span className="ml-2 text-gray-700">Remember me</span>
							</label>
						</div>
					} */}

					<button
						type="submit"
						className="w-full px-4 py-2 font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600"
					>
						Sign In
					</button>
				</form>
				<div className="mt-6 text-center">
					<a href="#" className="text-indigo-600 hover:underline">
						Create New Account
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
