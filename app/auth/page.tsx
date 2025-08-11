'use client'

import { useState, useEffect } from 'react'
import { Target, ArrowLeft, ChevronDown, User, Mail, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'
import { College } from '@/lib/schemas'

export default function AuthPage() {
  const [step, setStep] = useState<'login' | 'college' | 'details'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [colleges, setColleges] = useState<College[]>([])
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    studentId: '',
    year: '',
    department: ''
  })

  // Load colleges from database
  useEffect(() => {
    const loadColleges = async () => {
      try {
        const response = await fetch('/api/colleges')
        if (response.ok) {
          const data = await response.json()
          setColleges(data.colleges || [])
        }
      } catch (error) {
        console.error('Failed to load colleges:', error)
      }
    }
    
    loadColleges()
  }, [])

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000))
    setUserDetails(prev => ({ ...prev, email: 'user@gmail.com' }))
    setStep('college')
    setIsLoading(false)
  }

  const handleCollegeSelect = (college: College) => {
    setSelectedCollege(college)
    setIsDropdownOpen(false)
    setSearchTerm('')
  }

  const handleCollegeSubmit = () => {
    if (selectedCollege) {
      setStep('details')
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call to save user data
    const userData = {
      ...userDetails,
      college: selectedCollege,
      registrationDate: new Date().toISOString()
    }
    
    console.log('Saving user data:', userData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to dashboard or events page
    window.location.href = '/events'
  }

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Sports Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/olympic-stadium-sports.png')`
        }}
      />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          {/* Auth Card */}
          <div className="bg-black/80 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-4">
                <Target className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
                JOIN RANEETI
              </h1>
              <p className="text-slate-400 mt-2">
                {step === 'login' && 'Rise to championship status'}
                {step === 'college' && 'Select your college'}
                {step === 'details' && 'Complete your profile'}
              </p>
            </div>

            {/* Step 1: Google Login */}
            {step === 'login' && (
              <div>
                <button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-6"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}

            {/* Step 2: College Selection */}
            {step === 'college' && (
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-yellow-400 font-semibold mb-3">
                    Select Your College
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl py-4 px-4 text-left text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300 flex items-center justify-between"
                    >
                      <span className={selectedCollege ? 'text-white' : 'text-slate-400'}>
                        {selectedCollege ? `${selectedCollege.name} - ${selectedCollege.location}` : 'Choose your college...'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl z-50 max-h-80 overflow-hidden">
                        <div className="p-4 border-b border-slate-600">
                          <input
                            type="text"
                            placeholder="Search colleges..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-xl py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {filteredColleges.map((college) => (
                            <button
                              key={college.id}
                              onClick={() => handleCollegeSelect(college)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors duration-200 border-b border-slate-700 last:border-b-0"
                            >
                              <div className="text-white font-medium">{college.name}</div>
                              <div className="text-slate-400 text-sm">{college.location} • {college.type}</div>
                            </button>
                          ))}
                          {filteredColleges.length === 0 && (
                            <div className="px-4 py-6 text-center text-slate-400">
                              {colleges.length === 0 ? 'Loading colleges...' : `No colleges found matching "${searchTerm}"`}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCollegeSubmit}
                  disabled={!selectedCollege}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 3: User Details */}
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={userDetails.name}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                      Gender *
                    </label>
                    <select
                      required
                      value={userDetails.gender}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={userDetails.dateOfBirth}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={userDetails.studentId}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, studentId: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                      placeholder="Your student ID"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                      Year of Study *
                    </label>
                    <select
                      required
                      value={userDetails.year}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    >
                      <option value="">Select</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-400 font-semibold mb-2 text-sm">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={userDetails.department}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="e.g., Computer Science, Mechanical Engineering"
                  />
                </div>

                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 mt-6">
                  <h4 className="text-yellow-400 font-semibold mb-2">Selected College:</h4>
                  <p className="text-white">{selectedCollege?.name}</p>
                  <p className="text-slate-400 text-sm">{selectedCollege?.location} • {selectedCollege?.type}</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-yellow-400">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs text-slate-400">Compete</div>
            </div>
            <div className="text-yellow-400">
              <div className="text-2xl mb-1">🛍️</div>
              <div className="text-xs text-slate-400">Shop Merch</div>
            </div>
            <div className="text-yellow-400">
              <div className="text-2xl mb-1">👑</div>
              <div className="text-xs text-slate-400">Win Glory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
