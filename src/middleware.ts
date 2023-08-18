import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getDataFromToken } from "./helpers/getDataFromToken"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isSetPassPath = path.split("/")[1] === "set-password"

  const isPublicPath = ["/", "/sign-up"].includes(path) || isSetPassPath

  const isAdminPath = ["/admin-dashboard", "/admin-dashboard/:path*"].includes(path)
  const isUserPath = ["/dashboard"].includes(path)

  const token = request.cookies.get("token")?.value || ""

  const { role }: any = token ? await getDataFromToken(token) : {}
  if (token && isPublicPath) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.nextUrl))
    }

    return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if (token && isAdminPath) {
    if (role === "USER") {
      return NextResponse.redirect(new URL("/access-not-granted", request.nextUrl))
    }
  }

  if (token && isUserPath) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/access-not-granted", request.nextUrl))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/sign-up",
    "/admin-dashboard",
    "/dashboard",
    "/admin-dashboard/:path*",
    "/set-password/:path*",
  ],
}
