import { getURL } from "next/dist/shared/lib/utils"
import { NextResponse, NextRequest } from "next/server"

export default function middleware(request: NextRequest) {

  const token = request.cookies.get('authjs.session-token')
  const pathName = request.nextUrl.pathname

  const dashboardPath = new URL('/dashboard', request.url)
  const loginPath = new URL('/login', request.url)

  if (pathName === "/login" && token) {
    return NextResponse.redirect(dashboardPath)
  }

  if (pathName.includes('/dashboard') && !token) {
    return NextResponse.redirect(loginPath)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}