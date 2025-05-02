import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // If someone tries to access the API error route directly
  if (request.nextUrl.pathname === "/api/auth/error") {
    // Redirect them to our custom error page
    return NextResponse.redirect(new URL("/auth/error", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/auth/error"],
}
