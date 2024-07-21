import useAuth from "@/hooks/useAuth";
import useIntersectionObserver from "@/hooks/useIntersectionObserer";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Card = dynamic(() => import("@/components/CardUser"));

const user = () => {
	useAuth("admin");
	const [users, setUsers] = useState([]);
	const [visibleUser, setVisibleUser] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	// const [loading, setLoading] = useState(false);

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
			setVisibleUser(userData.slice(0, 18));
			// setLoading(false);
			// setHasMore(userData.length > 0);
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
		<div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
			<InfiniteScroll
				dataLength={visibleUser.length}
				next={loadMore}
				hasMore={hasMore}
				loader={<p className="text-4xl text-center">Loading...</p>}
			>
				<div className="grid w-full max-w-screen-xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-3 place-content-center">
					{visibleUser.map((user, item) => (
						<Card key={item} user={user} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
};

export default user;
