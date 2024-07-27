import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const FormPromoEdit = ({ promo }) => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		title: promo.title,
		description: promo.description,
		terms_condition: promo.terms_condition,
		promo_code: promo.promo_code,
		promo_discount_price: promo.promo_discount_price,
		minimum_claim_price: promo.minimum_claim_price,
	});
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleUploadPicure = (event) => {
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
		setIsLoading(true);

		const uploadImage = new FormData();
		uploadImage.append("image", file);

		const configUpload = {
			headers: {
				"content-type": "multipart/form-data",
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		};

		const configHeaders = {
			headers: {
				"content-type": "application/json",
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		};

		try {
			let promoPicture = "";

			if (!file) {
				promoPicture = promo.imageUrl;
			} else {
				const resUploadPicture = await axios.post(
					"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
					uploadImage,
					configUpload
				);
				promoPicture = resUploadPicture.data.url;
			}

			const payload = {
				title: formData.title,
				description: formData.description,
				terms_condition: formData.terms_condition,
				promo_code: formData.promo_code,
				promo_discount_price: Number(formData.promo_discount_price),
				minimum_claim_price: Number(formData.minimum_claim_price),
				imageUrl: promoPicture,
			};

			console.log(payload);

			const res = await axios.post(
				`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promo.id}`,
				payload,
				configHeaders
			);
			console.log(res);
			setIsSuccess(true);
			setTimeout(() => {
				router.push("/dashboard/promo");
				setIsLoading(false);
				setIsSuccess(false);
			}, 3000);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center py-3 mt-3 bg-white rounded-lg shadow-lg px-7 gap-y-3 w-fit">
			<div className="mx-auto mt-5 w-fit">
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
						<span className="text-white">Success Updating Promo</span>
						<span className="loading loading-spinner loading-md"></span>
					</div>
				) : (
					<span className="block text-xl font-bold text-[#FF9357]">
						Add Promo
					</span>
				)}
			</div>
			<form onSubmit={onSubmit}>
				<div className="mb-2">
					<label className="block p-2 text-gray-700" htmlFor="title">
						Title
					</label>
					<input
						onChange={handleChange}
						type="text"
						name="title"
						id="title"
						defaultValue={formData?.title}
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						required
					/>
				</div>

				<div className="mb-2">
					<label className="block p-2 text-gray-700" htmlFor="description">
						Description
					</label>
					<textarea
						name="description"
						id="description"
						className="w-full textarea textarea-bordered h-32 border rounded-xl focus:outline-none focus:ring focus:ring-[#FF9357"
						defaultValue={formData?.description}
						onChange={handleChange}
						required
					></textarea>
				</div>

				<div className="mb-2">
					<label className="block p-2 text-gray-700" htmlFor="terms_condition">
						Terms & Conditon
					</label>
					<input
						type="text"
						name="terms_condition"
						id="terms_condition"
						defaultValue={formData?.terms_condition}
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-2">
					<label className="block p-2 text-gray-700" htmlFor="promo_code">
						Promo Code
					</label>
					<input
						type="text"
						name="promo_code"
						id="promo_code"
						defaultValue={formData?.promo_code}
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-2">
					<label
						className="block p-2 text-gray-700"
						htmlFor="promo_discount_price"
					>
						Promo Discount Price
					</label>
					<input
						type="number"
						name="promo_discount_price"
						id="promo_discount_price"
						defaultValue={formData?.promo_discount_price}
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-2">
					<label
						className="block p-2 text-gray-700"
						htmlFor="minimum_claim_price"
					>
						Minimum Claim Price
					</label>
					<input
						type="number"
						name="minimum_claim_price"
						id="minimum_claim_price"
						placeholder="example: 1000000"
						className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring focus:ring-[#FF9357]"
						defaultValue={formData?.minimum_claim_price}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-2">
					<label className="block p-2 text-gray-700" htmlFor="imageUrl">
						Upload Promo Picture
					</label>
					<input
						onChange={handleUploadPicure}
						type="file"
						name="imageUrl"
						id="imageUrl"
						className="w-full px-3 py-2 border rounded-full bg-white focus:outline-none focus:ring focus:ring-[#FF9357]"
					/>
				</div>

				<button
					type="submit"
					className="flex items-center justify-center w-full px-4 py-2 mt-5 mb-3 font-bold text-white bg-orange-500 rounded-md gap-x-3 hover:bg-orange-600 "
					disabled={isSuccess}
				>
					{isLoading && (
						<span className="block loading loading-spinner loading-md"></span>
					)}
					Update Promo
				</button>
			</form>
		</div>
	);
};

export default FormPromoEdit;
