import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // if (
  //   request.method === "POST" ||
  //   request.method === "PUT" ||
  //   request.method === "DELETE"
  // ) {
  //   const token = await getToken({
  //     req: request,
  //     secret: process.env.NEXTAUTH_SECRET,
  //   });
  //   if (!token) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  // }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}
