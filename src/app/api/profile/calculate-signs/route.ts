import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, AuthError } from '@/lib/auth'
import { calculateAstrologicalSigns } from '@/lib/astrology'

export async function POST(request: NextRequest) {
  try {
    // Get user from JWT token
    const tokenPayload = getUserFromRequest(request)

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Calculate astrological signs
    const birthData = {
      date: user.birthDate,
      time: user.birthTime,
      location: user.birthLocation,
      latitude: user.latitude || undefined,
      longitude: user.longitude || undefined,
    }

    const signs = calculateAstrologicalSigns(birthData)

    // Update user with calculated signs
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        sunSign: signs.sunSign,
        moonSign: signs.moonSign,
        risingSign: signs.risingSign,
        venusSign: signs.venusSign,
        marsSign: signs.marsSign,
      },
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

    return NextResponse.json({
      message: 'Astrological signs calculated successfully',
      user: updatedUser,
      signs
    })

  } catch (error) {
    console.error('Calculate signs error:', error)
    
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
