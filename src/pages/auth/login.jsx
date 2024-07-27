import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userLoggedSlice";
import LoginSuccess from "@/components/LoginSuccess";
import LoginFailed from "@/components/LoginFailed";

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errMessage, setErrMessage] = useState("");

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	useEffect(() => {}, [formData]);

	const onSubmit = async (event) => {
		event.preventDefault();

		const dataLogin = { email: formData.email, password: formData.password };
		const configHeaders = {
			headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
		};
		setIsLoading(true);
		try {
			const res = await axios.post(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
				dataLogin,
				configHeaders
			);
			localStorage.setItem("accessToken", res?.data.token);
			localStorage.setItem("userRole", res?.data.data.role);
			dispatch(setUser(res?.data.data));
			setIsSuccess(true);
			setTimeout(() => {
				if (res?.data.data.role === "admin") {
					router.push("/dashboard/user");
					setIsSuccess(false);
					setIsLoading(false);
				} else {
					router.push("/");
				}
			}, 3000);
		} catch (err) {
			setIsLoading(false);
			setIsError(true);
			if (err?.response.data.message === "User not found") {
				let message = `${message}, please create an account first`;
				setErrMessage(message);
			}
			setErrMessage("Please check your email or password again");
			setTimeout(() => {
				setIsError(false);
				setErrMessage("");
			}, 3000);
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-100 lg:bg-center lg:bg-cover lg:bg-img-login lg:justify-end">
			<section className="w-full max-w-md p-8 bg-white shadow-lg rounded-[30px] lg:mr-32">
				<h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
				{isSuccess && <LoginSuccess isSusccess={`Login Success`} />}
				{isError && <LoginFailed errMessage={errMessage} />}
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
						{isLoading ? (
							<span className="loading loading-spinner loading-lg">
								Loading
							</span>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				<Link
					href="/auth/register"
					className="block w-full px-4 py-2 mt-6 font-bold text-center text-gray-500 bg-white rounded-full hover:bg-orange-200 hover:text-gray-700"
				>
					Create New Account
				</Link>
			</section>
		</main>
	);
};

export default Login;
