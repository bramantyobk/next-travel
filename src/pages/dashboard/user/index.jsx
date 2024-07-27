import useAuth from "@/hooks/useAuth";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "@/components/Sidebar";

const Card = dynamic(() => import("@/components/CardUser"));

const User = () => {
	useAuth("admin");

	const [users, setUsers] = useState([]);
	const [visibleUser, setVisibleUser] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const getUsers = async () => {
		const config = {
			headers: {
				apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			},
		};

		try {
			const res = await axios.get(
				"https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
				config
			);

			const userData = res.data.data;
			setUsers(userData);
			setVisibleUser(userData.slice(0, 9));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const loadMore = () => {
		if (users.length > visibleUser.length) {
			setHasMore(true);
			setTimeout(() => {
				setVisibleUser((prev) => [
					...prev,
					...users.slice(prev.length, prev.length + 6),
				]);
			}, 2000);
		} else {
			setHasMore(false);
		}
	};

	return (
		<main className="flex flex-row items-center justify-center min-h-screen py-8 bg-gray-100">
			<Sidebar />
			<InfiniteScroll
				dataLength={visibleUser.length}
				next={loadMore}
				hasMore={hasMore}
				loader={
					<div className="flex justify-center mt-10">
						<span className="block loading loading-infinity loading-lg"></span>
					</div>
				}
			>
				<section
					className={`grid w-full grid-cols-1 gap-3 mx-auto lg:w-5/6 md:grid-cols-2 lg:grid-cols-3 place-content-center text-wrap`}
				>
					{visibleUser.map((user, item) => (
						<Card key={item} user={user} />
					))}
				</section>
			</InfiniteScroll>
		</main>
	);
};

export default User;
