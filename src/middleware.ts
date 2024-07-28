import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  if (request.nextUrl.pathname.startsWith('/work/organisation')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // @ts-ignore (remove this if you've properly typed your token)
    if (!token.admin) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/work/organisation/:path*']
}