import { NextRequest, NextResponse } from 'next/server'
import { extractTokenFromRequest, verifyToken, AuthError } from '@/lib/auth'

// Define API routes that need authentication
const protectedApiRoutes = [
  '/api/matches',
  '/api/profile',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = extractTokenFromRequest(request)

  // Only protect API routes, let client-side handle page protection
  const isProtectedApiRoute = protectedApiRoutes.some(route =>
    pathname.startsWith(route)
  )

  // If it's a protected API route
  if (isProtectedApiRoute) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    try {
      // Verify token
      verifyToken(token)
      // Token is valid, continue
      return NextResponse.next()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  // For all other routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Only match API routes that need protection
     */
    '/api/matches/:path*',
    '/api/profile/:path*',
  ],
}
