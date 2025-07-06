import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken, isValidEmail, isValidPassword, AuthError } from '@/lib/auth'
import { calculateAstrologicalSigns } from '@/lib/astrology'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, birthDate, birthTime, birthLocation } = body

    // Validate required fields
    if (!name || !email || !password || !birthDate || !birthTime || !birthLocation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = isValidPassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Parse birth date
    const parsedBirthDate = new Date(birthDate)
    if (isNaN(parsedBirthDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid birth date format' },
        { status: 400 }
      )
    }

    // Calculate astrological signs
    const birthData = {
      date: parsedBirthDate,
      time: birthTime,
      location: birthLocation,
    }

    const signs = calculateAstrologicalSigns(birthData)

    const userData = {
      name,
      email,
      password: hashedPassword,
      birthDate: parsedBirthDate,
      birthTime,
      birthLocation,
      sunSign: signs.sunSign,
      moonSign: signs.moonSign,
      risingSign: signs.risingSign,
      venusSign: signs.venusSign,
      marsSign: signs.marsSign,
      lookingFor: 'both', // Default value
    }

    // Create user
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        birthDate: true,
        birthTime: true,
        birthLocation: true,
        sunSign: true,
        moonSign: true,
        risingSign: true,
        venusSign: true,
        marsSign: true,
        lookingFor: true,
        createdAt: true,
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    })

    // Create response with token in cookie
    const response = NextResponse.json({
      message: 'User registered successfully',
      user,
      token,
    }, { status: 201 })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Registration error:', error)
    
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
