import { NextResponse } from "next/server";

export function middleware(req) {
	const { pathname } = req.nextUrl;

	if (pathname.startsWith("/dashboard")) {
		const url = req.nextUrl.clone();
		url.pathname = "/auth/login";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}
