import axios from "axios";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("@/components/CardActivityPage"));

const config = {
	headers: {
		apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
	},
};

const ActivityPage = () => {
	const [activities, setActivities] = useState([]);
	const [visibleActivity, setVisibleActivity] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFiltered, setIsFiltered] = useState(false);
	const [filteredActivities, setFilteredActivities] = useState([]);

	const getActivity = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
				config
			);
			const activityData = res?.data.data;
			setActivities(activityData);
			setVisibleActivity(activityData.slice(0, 6));
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const getCategory = async () => {
		try {
			const res = await axios.get(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
				config
			);
			const categoriesData = res?.data.data;
			setCategories(categoriesData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getActivity();
		getCategory();
	}, []);

	const handleChangeCategory = (event) => {
		setSelectedCategory(event.target.value);
	};

	const handleFilter = () => {
		const filtered = activities.filter(
			(activity) => activity.categoryId === selectedCategory
		);
		setIsFiltered(true);
		setHasMore(false);
		setFilteredActivities(filtered);
	};

	const handleReset = () => {
		setIsFiltered(false);
		setSelectedCategory("");
		if (activities.length > visibleActivity.length) setHasMore(true);
		setFilteredActivities([]);
	};

	const loadMore = () => {
		if (activities.length > visibleActivity.length) {
			setHasMore(true);
			setTimeout(() => {
				setVisibleActivity((prev) => [
					...prev,
					...activities.slice(prev.length, prev.length + 2),
				]);
			}, 1000);
		} else {
			setHasMore(false);
		}
	};

	return (
		<main className="">
			<Navbar />
			<InfiniteScroll
				dataLength={visibleActivity.length}
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
					<h1 className="mt-10 text-3xl font-bold text-center ">Activities</h1>
					<div>
						<div className="flex items-center justify-center gap-x-6">
							<select
								name="select_category"
								id="select_category"
								value={selectedCategory}
								onChange={handleChangeCategory}
								className="block"
							>
								<option value="">- Select Category -</option>
								{categories.map((category, item) => (
									<option value={category.id} key={item}>
										{category.name}
									</option>
								))}
							</select>
							<button
								className="block p-3 bg-green-400 rounded-lg"
								onClick={handleFilter}
							>
								Filter
							</button>
							<button
								className="block p-3 bg-orange-200 rounded-lg"
								onClick={handleReset}
							>
								Reset
							</button>
						</div>
					</div>
					<div
						className={`grid w-2/3 grid-cols-1 gap-x-5 gap-y-7 mx-auto md:w-4/6 md:grid-cols-2 place-content-center text-wrap`}
					>
						{isFiltered
							? filteredActivities.map((activity, item) => (
									<Card key={item} activity={activity} />
							  ))
							: visibleActivity.map((activity, item) => (
									<Card key={item} activity={activity} />
							  ))}
					</div>
				</section>
			</InfiniteScroll>
		</main>
	);
};

export default ActivityPage;
