'use client'

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            ✨ AstroPair
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Find Your People,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Written in the Stars
            </span>
          </h1>

          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Discover meaningful connections through astrology-based compatibility matching.
            Let the cosmos guide you to your perfect match.
          </p>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/register"
              className="block sm:inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              Start Your Journey
            </Link>
            <Link
              href="/login"
              className="block sm:inline-block border-2 border-purple-400 text-purple-100 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold text-white mb-2">Cosmic Compatibility</h3>
            <p className="text-purple-200">
              Advanced astrological matching based on your sun, moon, and rising signs
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">💫</div>
            <h3 className="text-xl font-semibold text-white mb-2">Meaningful Connections</h3>
            <p className="text-purple-200">
              Find friends, romantic partners, or both based on deep compatibility
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized Insights</h3>
            <p className="text-purple-200">
              Get detailed compatibility breakdowns and relationship guidance
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
