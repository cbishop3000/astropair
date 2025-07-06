'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  // Handle client-side authentication
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              ✨ AstroPair
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/profile" 
                className="text-purple-200 hover:text-white transition-colors"
              >
                Profile
              </Link>
              <Link 
                href="/matches" 
                className="text-purple-200 hover:text-white transition-colors"
              >
                Matches
              </Link>
              <button
                onClick={handleLogout}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {user.name}! ✨
          </h1>
          <p className="text-xl text-purple-200">
            Your cosmic journey continues...
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Astrological Profile</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-purple-200 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-purple-300">Name:</span>
                  <span className="text-white ml-2">{user.name}</span>
                </div>
                <div>
                  <span className="text-purple-300">Email:</span>
                  <span className="text-white ml-2">{user.email}</span>
                </div>
                <div>
                  <span className="text-purple-300">Birth Date:</span>
                  <span className="text-white ml-2">
                    {new Date(user.birthDate).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-purple-300">Birth Time:</span>
                  <span className="text-white ml-2">{user.birthTime}</span>
                </div>
                <div>
                  <span className="text-purple-300">Birth Location:</span>
                  <span className="text-white ml-2">{user.birthLocation}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-200 mb-4">Astrological Signs</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-purple-300">Sun Sign:</span>
                  <span className="text-white ml-2">{user.sunSign}</span>
                </div>
                <div>
                  <span className="text-purple-300">Moon Sign:</span>
                  <span className="text-white ml-2">{user.moonSign}</span>
                </div>
                <div>
                  <span className="text-purple-300">Rising Sign:</span>
                  <span className="text-white ml-2">{user.risingSign}</span>
                </div>
                <div>
                  <span className="text-purple-300">Looking For:</span>
                  <span className="text-white ml-2 capitalize">{user.lookingFor}</span>
                </div>
              </div>
            </div>
          </div>

          {user.sunSign === 'TBD' && (
            <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-100">
                🔮 Your astrological signs are being calculated! This will be updated once our astrology engine is implemented.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/profile"
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">👤</div>
            <h3 className="text-lg font-semibold text-white mb-2">Edit Profile</h3>
            <p className="text-purple-200">Update your information and preferences</p>
          </Link>

          <Link 
            href="/matches"
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">💫</div>
            <h3 className="text-lg font-semibold text-white mb-2">Find Matches</h3>
            <p className="text-purple-200">Discover your cosmic connections</p>
          </Link>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 opacity-50">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-white mb-2">Messages</h3>
            <p className="text-purple-200">Coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  )
}
