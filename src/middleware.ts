import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  console.log(process.env.NEXTAUTH_SECRET)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  console.log(token)
  
  if (request.nextUrl.pathname.startsWith('/work')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }

  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/work/:path*']
}