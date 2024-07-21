// hooks/useIntersectionObserver.js
import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback) => {
	const observer = useRef(null);

	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				callback();
			}
		});

		const { current: currentObserver } = observer;
		return () => currentObserver.disconnect();
	}, [callback]);

	const observe = (element) => {
		if (observer.current && element) {
			observer.current.observe(element);
		}
	};

	return observe;
};

export default useIntersectionObserver;
