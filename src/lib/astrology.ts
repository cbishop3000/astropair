// Astrology calculation utilities for AstroPair

export interface BirthData {
  date: Date
  time: string // HH:MM format
  location: string
  latitude?: number
  longitude?: number
}

export interface AstrologicalSigns {
  sunSign: string
  moonSign: string
  risingSign: string
  venusSign?: string
  marsSign?: string
}

export interface CompatibilityScore {
  overall: number
  sun: number
  moon: number
  rising: number
  venus?: number
  mars?: number
}

// Zodiac signs in order
export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const

export type ZodiacSign = typeof ZODIAC_SIGNS[number]

// Elements for each sign
export const SIGN_ELEMENTS: Record<ZodiacSign, string> = {
  'Aries': 'Fire',
  'Taurus': 'Earth',
  'Gemini': 'Air',
  'Cancer': 'Water',
  'Leo': 'Fire',
  'Virgo': 'Earth',
  'Libra': 'Air',
  'Scorpio': 'Water',
  'Sagittarius': 'Fire',
  'Capricorn': 'Earth',
  'Aquarius': 'Air',
  'Pisces': 'Water'
}

// Modalities for each sign
export const SIGN_MODALITIES: Record<ZodiacSign, string> = {
  'Aries': 'Cardinal',
  'Taurus': 'Fixed',
  'Gemini': 'Mutable',
  'Cancer': 'Cardinal',
  'Leo': 'Fixed',
  'Virgo': 'Mutable',
  'Libra': 'Cardinal',
  'Scorpio': 'Fixed',
  'Sagittarius': 'Mutable',
  'Capricorn': 'Cardinal',
  'Aquarius': 'Fixed',
  'Pisces': 'Mutable'
}

// Basic compatibility matrix (0-1 scale)
export const COMPATIBILITY_MATRIX: Record<ZodiacSign, Record<ZodiacSign, number>> = {
  'Aries': {
    'Aries': 0.7, 'Taurus': 0.4, 'Gemini': 0.8, 'Cancer': 0.3, 'Leo': 0.9, 'Virgo': 0.4,
    'Libra': 0.6, 'Scorpio': 0.5, 'Sagittarius': 0.9, 'Capricorn': 0.4, 'Aquarius': 0.8, 'Pisces': 0.5
  },
  'Taurus': {
    'Aries': 0.4, 'Taurus': 0.8, 'Gemini': 0.5, 'Cancer': 0.9, 'Leo': 0.6, 'Virgo': 0.9,
    'Libra': 0.7, 'Scorpio': 0.8, 'Sagittarius': 0.4, 'Capricorn': 0.9, 'Aquarius': 0.3, 'Pisces': 0.8
  },
  'Gemini': {
    'Aries': 0.8, 'Taurus': 0.5, 'Gemini': 0.7, 'Cancer': 0.4, 'Leo': 0.8, 'Virgo': 0.6,
    'Libra': 0.9, 'Scorpio': 0.4, 'Sagittarius': 0.8, 'Capricorn': 0.3, 'Aquarius': 0.9, 'Pisces': 0.5
  },
  'Cancer': {
    'Aries': 0.3, 'Taurus': 0.9, 'Gemini': 0.4, 'Cancer': 0.8, 'Leo': 0.5, 'Virgo': 0.8,
    'Libra': 0.6, 'Scorpio': 0.9, 'Sagittarius': 0.3, 'Capricorn': 0.8, 'Aquarius': 0.4, 'Pisces': 0.9
  },
  'Leo': {
    'Aries': 0.9, 'Taurus': 0.6, 'Gemini': 0.8, 'Cancer': 0.5, 'Leo': 0.7, 'Virgo': 0.5,
    'Libra': 0.8, 'Scorpio': 0.6, 'Sagittarius': 0.9, 'Capricorn': 0.5, 'Aquarius': 0.8, 'Pisces': 0.6
  },
  'Virgo': {
    'Aries': 0.4, 'Taurus': 0.9, 'Gemini': 0.6, 'Cancer': 0.8, 'Leo': 0.5, 'Virgo': 0.8,
    'Libra': 0.7, 'Scorpio': 0.8, 'Sagittarius': 0.4, 'Capricorn': 0.9, 'Aquarius': 0.5, 'Pisces': 0.7
  },
  'Libra': {
    'Aries': 0.6, 'Taurus': 0.7, 'Gemini': 0.9, 'Cancer': 0.6, 'Leo': 0.8, 'Virgo': 0.7,
    'Libra': 0.8, 'Scorpio': 0.6, 'Sagittarius': 0.7, 'Capricorn': 0.6, 'Aquarius': 0.9, 'Pisces': 0.7
  },
  'Scorpio': {
    'Aries': 0.5, 'Taurus': 0.8, 'Gemini': 0.4, 'Cancer': 0.9, 'Leo': 0.6, 'Virgo': 0.8,
    'Libra': 0.6, 'Scorpio': 0.8, 'Sagittarius': 0.5, 'Capricorn': 0.8, 'Aquarius': 0.4, 'Pisces': 0.9
  },
  'Sagittarius': {
    'Aries': 0.9, 'Taurus': 0.4, 'Gemini': 0.8, 'Cancer': 0.3, 'Leo': 0.9, 'Virgo': 0.4,
    'Libra': 0.7, 'Scorpio': 0.5, 'Sagittarius': 0.8, 'Capricorn': 0.4, 'Aquarius': 0.9, 'Pisces': 0.6
  },
  'Capricorn': {
    'Aries': 0.4, 'Taurus': 0.9, 'Gemini': 0.3, 'Cancer': 0.8, 'Leo': 0.5, 'Virgo': 0.9,
    'Libra': 0.6, 'Scorpio': 0.8, 'Sagittarius': 0.4, 'Capricorn': 0.8, 'Aquarius': 0.5, 'Pisces': 0.7
  },
  'Aquarius': {
    'Aries': 0.8, 'Taurus': 0.3, 'Gemini': 0.9, 'Cancer': 0.4, 'Leo': 0.8, 'Virgo': 0.5,
    'Libra': 0.9, 'Scorpio': 0.4, 'Sagittarius': 0.9, 'Capricorn': 0.5, 'Aquarius': 0.8, 'Pisces': 0.6
  },
  'Pisces': {
    'Aries': 0.5, 'Taurus': 0.8, 'Gemini': 0.5, 'Cancer': 0.9, 'Leo': 0.6, 'Virgo': 0.7,
    'Libra': 0.7, 'Scorpio': 0.9, 'Sagittarius': 0.6, 'Capricorn': 0.7, 'Aquarius': 0.6, 'Pisces': 0.8
  }
}

/**
 * Calculate sun sign based on birth date
 * This is a simplified calculation - in a real app you'd use precise ephemeris data
 */
export function calculateSunSign(birthDate: Date): ZodiacSign {
  const month = birthDate.getMonth() + 1 // JavaScript months are 0-indexed
  const day = birthDate.getDate()

  // Simplified sun sign calculation based on approximate dates
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces' // February 19 - March 20
}

/**
 * Calculate moon sign (simplified - would need lunar ephemeris for accuracy)
 * For MVP, we'll use a simplified calculation based on birth date
 */
export function calculateMoonSign(birthDate: Date): ZodiacSign {
  // Simplified: Moon changes signs approximately every 2.5 days
  // This is a placeholder calculation for MVP
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(birthDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  const moonCycle = Math.floor(dayOfYear / 2.5) % 12
  return ZODIAC_SIGNS[moonCycle]
}

/**
 * Calculate rising sign (simplified - would need birth time and location for accuracy)
 * For MVP, we'll use a simplified calculation
 */
export function calculateRisingSign(birthDate: Date, birthTime: string): ZodiacSign {
  // Simplified: Rising sign changes approximately every 2 hours
  // This is a placeholder calculation for MVP
  const [hours, minutes] = birthTime.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes
  const risingIndex = Math.floor(totalMinutes / 120) % 12
  return ZODIAC_SIGNS[risingIndex]
}

/**
 * Calculate all astrological signs for a person
 */
export function calculateAstrologicalSigns(birthData: BirthData): AstrologicalSigns {
  return {
    sunSign: calculateSunSign(birthData.date),
    moonSign: calculateMoonSign(birthData.date),
    risingSign: calculateRisingSign(birthData.date, birthData.time),
    // Venus and Mars would require more complex calculations
    venusSign: calculateSunSign(birthData.date), // Placeholder
    marsSign: calculateSunSign(birthData.date), // Placeholder
  }
}

/**
 * Calculate compatibility between two sets of astrological signs
 */
export function calculateCompatibility(signs1: AstrologicalSigns, signs2: AstrologicalSigns): CompatibilityScore {
  const sunCompatibility = COMPATIBILITY_MATRIX[signs1.sunSign as ZodiacSign][signs2.sunSign as ZodiacSign]
  const moonCompatibility = COMPATIBILITY_MATRIX[signs1.moonSign as ZodiacSign][signs2.moonSign as ZodiacSign]
  const risingCompatibility = COMPATIBILITY_MATRIX[signs1.risingSign as ZodiacSign][signs2.risingSign as ZodiacSign]

  // Calculate overall compatibility (weighted average)
  const overall = (sunCompatibility * 0.4 + moonCompatibility * 0.4 + risingCompatibility * 0.2)

  return {
    overall: Math.round(overall * 100) / 100,
    sun: Math.round(sunCompatibility * 100) / 100,
    moon: Math.round(moonCompatibility * 100) / 100,
    rising: Math.round(risingCompatibility * 100) / 100,
  }
}

/**
 * Get element compatibility
 */
export function getElementCompatibility(element1: string, element2: string): number {
  const compatibleElements: Record<string, string[]> = {
    'Fire': ['Fire', 'Air'],
    'Earth': ['Earth', 'Water'],
    'Air': ['Air', 'Fire'],
    'Water': ['Water', 'Earth']
  }

  if (element1 === element2) return 0.9
  if (compatibleElements[element1]?.includes(element2)) return 0.7
  return 0.4
}

/**
 * Generate compatibility description
 */
export function generateCompatibilityDescription(score: CompatibilityScore): string {
  const overall = score.overall

  if (overall >= 0.8) {
    return "Cosmic soulmates! Your stars align beautifully, creating a harmonious and deeply connected relationship."
  } else if (overall >= 0.6) {
    return "Strong cosmic connection! You complement each other well with great potential for a lasting bond."
  } else if (overall >= 0.4) {
    return "Moderate compatibility. With understanding and effort, you can build a meaningful connection."
  } else {
    return "Challenging but not impossible! Your differences can lead to growth and learning from each other."
  }
}
