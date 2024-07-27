import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const CardActivityPage = ({ item, activity }) => {
	return (
		<Link
			key={item}
			className="w-full p-4 overflow-hidden duration-200 bg-white rounded-lg shadow-md hover:-translate-y-2"
			href={`/activity/${activity.id}`}
		>
			<img
				src={activity.imageUrls}
				alt={activity.title}
				className="object-cover w-full h-48 rounded-md"
			/>
			<div className="p-4">
				<div className="border-t border-blue-400">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-bold">{activity?.title}</h3>
						<div className="flex items-center justify-center gap-1">
							Rating : {activity?.rating}{" "}
							<span className="text-yellow-400">
								<FaStar />
							</span>
						</div>
					</div>
					<div className="flex flex-col items-start justify-center mt-3">
						<div className="flex items-start justify-center mt-2 gap-x-5">
							<p className="font-semibold text-gray-700">Location : </p>
							<span className="block">
								{activity?.city}, {activity?.province}
							</span>
						</div>
						<div className="flex items-start justify-center mt-2 gap-x-5">
							<p className="font-semibold text-gray-700">Price : </p>
							<p className="block ">
								<span className="font-bold text-[#ff9357]">
									{activity?.price_discount.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
										maximumFractionDigits: 0,
									})}
								</span>{" "}
								<span className="text-gray-400 line-through font-extralight">
									{activity?.price.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
										maximumFractionDigits: 0,
									})}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CardActivityPage;
