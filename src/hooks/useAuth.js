// hooks/useAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = (requiredRole) => {
	const router = useRouter();

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		const userRole = localStorage.getItem("userRole");

		if (!accessToken) {
			router.push("/auth/login");
		} else if (requiredRole && userRole !== requiredRole) {
			router.push("/"); // Redirect to an unauthorized page or handle it as needed
		}
	}, [router, requiredRole]);
};

export default useAuth;
