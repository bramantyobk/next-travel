import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("@/components/CardPromoPage"));

const PromoPage = () => {
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
			<Navbar />
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
				<section className="flex flex-col gap-5 pt-20">
					<h1 className="mt-10 text-3xl font-bold text-center ">PROMO %</h1>
					<div
						className={`grid w-2/3 grid-cols-1 gap-x-5 gap-y-7 mx-auto md:w-4/6 md:grid-cols-2 place-content-center text-wrap`}
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

export default PromoPage;
