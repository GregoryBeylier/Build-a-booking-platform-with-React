import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value as string;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/favorites", "/messages", "/add-property"],
};
