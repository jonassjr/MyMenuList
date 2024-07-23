import { NextResponse, NextRequest } from "next/server"

export default function middleware(request: NextRequest) {

  const token = request.cookies.get('authjs.session-token')
  const pathName = request.nextUrl.pathname

  const dashboardPath = new URL('/dashboard', request.url)
  const loginPath = new URL('/login', request.url)

  if (pathName === "/login" && token) {
    return NextResponse.redirect(dashboardPath)
  }

  const protectedRoutes = ["/dashboard", "/edit", "/settings", "/upgrade"]
  const isProtectedRoute = protectedRoutes.some(route => pathName.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(loginPath)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}