import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MdFormatListBulletedAdd } from "react-icons/md";

const Card = dynamic(() => import("@/components/CardPromo"));

const Promo = () => {
	useAuth("admin");
	const [promos, setPromos] = useState([]);
	const [visiblePromo, setVisiblePromo] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const getPromos = async () => {
		const config = {
			headers: {
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
			},
		};

		try {
			const res = await axios.get(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
				config
			);
			const promoData = res.data.data;
			setPromos(promoData);
			setVisiblePromo(promoData.slice(0, 6));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPromos();
	}, []);

	const loadMore = () => {
		if (promos.length > visiblePromo.length) {
			setHasMore(true);
			setTimeout(() => {
				setVisiblePromo((prev) => [
					...prev,
					...promos.slice(prev.length, prev.length + 2),
				]);
			}, 2000);
		} else {
			setHasMore(false);
		}
	};

	return (
		<main className="">
			<Sidebar />
			<InfiniteScroll
				dataLength={visiblePromo.length}
				next={loadMore}
				hasMore={hasMore}
				loader={
					hasMore && (
						<div className="flex items-center justify-center mt-10">
							<span className="block loading loading-infinity loading-lg"></span>
						</div>
					)
				}
			>
				<section className="flex flex-col gap-5">
					<div className="flex items-center pt-10 justify-evenly">
						<h1 className="pl-24 text-3xl font-bold md:pl-64">PROMO %</h1>
						<Link
							href="/dashboard/promo/create"
							className="block px-4 py-2 font-semibold text-white rounded-full shadow-lg cursor-pointer bg-emerald-500 hover:border hover:border-emerald-500 hover:bg-white hover:text-gray-800 hover:shadow-sm"
						>
							<div className="flex items-center justify-center gap-x-2">
								<MdFormatListBulletedAdd />
								<span className="block text-xl">Create Promo</span>
							</div>
						</Link>
					</div>
					<div
						className={`grid w-2/3 grid-cols-1 gap-3 mx-auto lg:ml-72 lg:mr-auto md:w-4/6 md:grid-cols-2 place-content-center text-wrap`}
					>
						{visiblePromo.map((promo, item) => (
							<Card key={item} promo={promo} />
						))}
					</div>
				</section>
			</InfiniteScroll>
		</main>
	);
};

export default Promo;
