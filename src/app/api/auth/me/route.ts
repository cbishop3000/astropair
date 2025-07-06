import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, AuthError } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get user from JWT token
    const tokenPayload = getUserFromRequest(request)

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        birthTime: true,
        birthLocation: true,
        latitude: true,
        longitude: true,
        sunSign: true,
        moonSign: true,
        risingSign: true,
        venusSign: true,
        marsSign: true,
        lookingFor: true,
        bio: true,
        profileImage: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      user
    })

  } catch (error) {
    console.error('Get user error:', error)
    
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
