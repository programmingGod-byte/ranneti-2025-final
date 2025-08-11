'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Trophy, Zap, Crown, Flame, Play, Users, Calendar, MapPin, Instagram, Twitter, Youtube, ChevronLeft, ChevronRight, Star, Target, Medal, Gamepad2 } from 'lucide-react'
import Link from 'next/link'

const heroVideos = [
  {
    id: 1,
    title: "Epic Cricket Battles",
    description: "Witness the thunder in every strike",
    video: "/cricket-highlights.mp4",
    thumbnail: "/cricket-action-olympus.png"
  },
  {
    id: 2,
    title: "Lightning Football",
    description: "Speed meets skill of champions",
    video: "/football-highlights.mp4",
    thumbnail: "/football-action-olympus.png"
  },
  {
    id: 3,
    title: "Titan Basketball",
    description: "Rise above like true champions",
    video: "/basketball-highlights.mp4",
    thumbnail: "/basketball-action-olympus.png"
  }
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-slide for videos
  useEffect(() => {
    if (!isVideoPlaying) {
      const interval = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % heroVideos.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isVideoPlaying])

  // Enhanced particle animation with yellow theme
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number, y: number, vx: number, vy: number, 
      size: number, opacity: number, color: string, pulse: number
    }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.3 ? '#fbbf24' : '#eab308', // Yellow variations
        pulse: Math.random() * Math.PI * 2
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulse += 0.02
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        const pulsedSize = particle.size + Math.sin(particle.pulse) * 0.5
        const pulsedOpacity = particle.opacity + Math.sin(particle.pulse) * 0.1
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulsedSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.floor(pulsedOpacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
        
        // Add glow effect
        ctx.shadowBlur = 8
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const playVideo = () => {
    setIsVideoPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const pauseVideo = () => {
    setIsVideoPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-yellow-400/30' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-wider group cursor-pointer">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 animate-pulse group-hover:from-yellow-300 group-hover:to-yellow-400 transition-all duration-300">RANEETI</span> 
            <span className="text-white ml-2 group-hover:text-yellow-400 transition-colors duration-300">2025</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="relative group py-2 px-4 rounded-full hover:bg-yellow-400/10 transition-all duration-300 font-medium">
              <span className="group-hover:text-yellow-400 transition-colors duration-300">About</span>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-8"></span>
            </a>
            <Link href="/events" className="relative group py-2 px-4 rounded-full hover:bg-yellow-400/10 transition-all duration-300 font-medium">
              <span className="group-hover:text-yellow-400 transition-colors duration-300">Events</span>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-8"></span>
            </Link>
            <Link href="/merch" className="relative group py-2 px-4 rounded-full hover:bg-yellow-400/10 transition-all duration-300 font-medium">
              <span className="group-hover:text-yellow-400 transition-colors duration-300">Merch</span>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-8"></span>
            </Link>
            <a href="#gallery" className="relative group py-2 px-4 rounded-full hover:bg-yellow-400/10 transition-all duration-300 font-medium">
              <span className="group-hover:text-yellow-400 transition-colors duration-300">Gallery</span>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-8"></span>
            </a>
          </div>
          <Link href="/auth" className="hidden md:block relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-yellow-400/50 group">
            <span className="relative z-10">JOIN NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl p-2 rounded-full hover:bg-yellow-400/20 transition-colors duration-300">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors duration-300">About</a>
            <Link href="/events" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors duration-300">Events</Link>
            <Link href="/merch" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors duration-300">Merch</Link>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-400 transition-colors duration-300">Gallery</a>
            <Link href="/auth" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-8 rounded-full">
              JOIN NOW
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section with Video Background */}
      <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {isVideoPlaying ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onEnded={() => setIsVideoPlaying(false)}
              autoPlay
              muted
              loop
            >
              <source src={heroVideos[currentVideo].video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroVideos[currentVideo].thumbnail || "/placeholder.svg"}
              alt={heroVideos[currentVideo].title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-[10s]"
            />
          )}
        </div>

        {/* Video Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10"></div>

        {/* Particle Canvas Overlay */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Video Controls */}
        <div className="absolute inset-0 z-30">
          {/* Play Button */}
          {!isVideoPlaying && (
            <button
              onClick={playVideo}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400/20 hover:bg-yellow-400/30 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-yellow-400/30"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentVideo((prev) => (prev - 1 + heroVideos.length) % heroVideos.length)}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentVideo((prev) => (prev + 1) % heroVideos.length)}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Video Info */}
          <div className="absolute bottom-6 left-6">
            <h3 className="text-lg font-bold text-white mb-1">{heroVideos[currentVideo].title}</h3>
            <p className="text-yellow-300 text-sm">{heroVideos[currentVideo].description}</p>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {heroVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideo ? 'bg-yellow-400' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content Overlay */}
        <div className="container mx-auto px-6 relative z-40">
          <div className="max-w-6xl mx-auto">
            {/* Animated Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                <Target className="relative w-24 h-24 md:w-32 md:h-32 text-yellow-400 animate-bounce drop-shadow-2xl" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider mb-6 drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-pulse">
                RANEETI
              </span>
              <br />
              <span className="text-white">
                2025
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mt-6 text-white max-w-3xl mx-auto leading-relaxed font-medium mb-12 drop-shadow-lg">
              ⚡ IIT Mandi's Ultimate Sports Festival ⚡<br />
              <span className="text-yellow-300">Where Champions Are Made & Legends Are Born</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/events" className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-full text-lg uppercase hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-400/50">
                <Flame className="w-6 h-6 group-hover:animate-bounce" />
                Explore Events
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Link>
              
              <Link href="/merch" className="group relative inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-full text-lg uppercase hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-105">
                <Trophy className="w-6 h-6 group-hover:animate-spin" />
                Get Merch
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, number: "500+", label: "Athletes", color: "from-yellow-400 to-yellow-600" },
                { icon: Trophy, number: "15+", label: "Sports", color: "from-yellow-500 to-yellow-700" },
                { icon: Calendar, number: "3", label: "Days", color: "from-yellow-400 to-yellow-500" },
                { icon: Zap, number: "∞", label: "Energy", color: "from-yellow-300 to-yellow-500" }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-3xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg">{stat.number}</div>
                  <div className="text-gray-300 font-medium drop-shadow-md">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About College Section */}
      <section id="about" className="py-20 md:py-32 relative z-10 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="transform hover:scale-105 transition-transform duration-500">
              <h2 className="text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-8">
                IIT Mandi
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                🏔️ Nestled in the breathtaking Himalayas, IIT Mandi stands as a beacon of innovation and excellence. Our campus is where brilliant minds converge to push the boundaries of technology and human potential.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                From cutting-edge research to world-class athletics, we embody the spirit of holistic development. Our students don't just excel academically—they dominate in sports, arts, and leadership.
              </p>
              <div className="flex items-center gap-4 group">
                <MapPin className="w-6 h-6 text-yellow-400 group-hover:animate-bounce" />
                <span className="text-yellow-400 font-semibold">Kamand, Himachal Pradesh</span>
              </div>
            </div>
            
            {/* Enhanced Image */}
            <div className="relative perspective-1000">
              <div className="relative transform-gpu hover:rotate-y-6 transition-transform duration-700 preserve-3d">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border border-yellow-400/20">
                  <img 
                    src="/iit-mandi-campus-mountains.png" 
                    alt="IIT Mandi Campus" 
                    className="w-full h-full object-cover transform-gpu transition-transform duration-700"
                  />
                  
                  {/* Overlay with campus info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">IIT Mandi Campus</h3>
                    <p className="text-yellow-300">Himalayan Excellence</p>
                  </div>
                </div>
                
                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-2xl blur-xl transform translate-y-4 -z-10 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About RANEETI Festival Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-gray-900 to-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-8">
              About RANEETI
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              🔥 RANEETI - The Sanskrit word meaning "Strategy" - represents the ultimate sports festival where strategy meets strength, skill meets spirit, and champions are forged in the fires of competition!
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              For three electrifying days, IIT Mandi transforms into a battleground where the finest athletes from across India converge to showcase their prowess, determination, and strategic brilliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Target className="w-12 h-12 text-yellow-400" />,
                title: "Strategic Excellence",
                desc: "Every sport demands strategy. RANEETI celebrates the perfect blend of physical prowess and tactical brilliance that defines true champions."
              },
              {
                icon: <Medal className="w-12 h-12 text-yellow-400" />,
                title: "Championship Glory",
                desc: "Massive prize pools, prestigious trophies, and the ultimate glory of being crowned RANEETI champions await the worthy!"
              },
              {
                icon: <Gamepad2 className="w-12 h-12 text-yellow-400" />,
                title: "Epic Competition",
                desc: "From traditional sports to modern esports, RANEETI features diverse competitions that test every aspect of athletic and mental excellence."
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gray-900/60 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-8 text-center hover:border-yellow-400/40 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RANEETI Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "₹10L+", label: "Prize Pool", icon: "💰" },
              { number: "100+", label: "Colleges", icon: "🏫" },
              { number: "24/7", label: "Live Action", icon: "📺" },
              { number: "100%", label: "Pure Adrenaline", icon: "⚡" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* What Makes RANEETI Special */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8">What Makes RANEETI Special?</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-900/40 border border-yellow-400/20 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-400 mb-3">🎯 Strategic Sports</h4>
                <p className="text-gray-300">Every event is designed to test not just physical ability, but strategic thinking and tactical execution.</p>
              </div>
              <div className="bg-gray-900/40 border border-yellow-400/20 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-400 mb-3">🏆 Elite Competition</h4>
                <p className="text-gray-300">Top-tier athletes and teams from premier institutions across India compete for ultimate glory.</p>
              </div>
              <div className="bg-gray-900/40 border border-yellow-400/20 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-400 mb-3">🎪 Festival Atmosphere</h4>
                <p className="text-gray-300">Beyond sports - cultural events, food festivals, and entertainment that create unforgettable memories.</p>
              </div>
              <div className="bg-gray-900/40 border border-yellow-400/20 rounded-xl p-6">
                <h4 className="text-xl font-bold text-yellow-400 mb-3">🌟 Legacy Building</h4>
                <p className="text-gray-300">RANEETI champions become part of a prestigious legacy that inspires future generations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Media Gallery */}
      <section id="gallery" className="py-20 md:py-32 relative z-10 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black uppercase text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-16">
            Epic Moments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <img 
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  src={`/sports-action-${i + 1}.png`}
                  alt={`Sports moment ${i + 1}`}
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="text-yellow-400 font-bold text-lg">Epic Action</div>
                  <div className="text-gray-300">RANEETI 2024</div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-yellow-400/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Enhanced Social Media */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8">Follow the Action</h3>
            <div className="flex justify-center space-x-8">
              <a href="#" className="group relative bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                <Instagram className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-full hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                <Twitter className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </a>
              <a href="#" className="group relative bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                <Youtube className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-500/5 animate-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Target className="w-20 h-20 text-yellow-400 mx-auto mb-8 animate-bounce" />
          <h2 className="text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-8">
            Ready to Strategize?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            🚀 Don't just watch from the sidelines—become part of the strategy! Register now and claim your spot among the champions of RANEETI.
          </p>
          <Link href="/auth" className="inline-flex items-center gap-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-6 px-12 rounded-full text-xl uppercase hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-yellow-400/50">
            <Flame className="w-8 h-8 animate-pulse" />
            Join RANEETI
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-400/20 text-gray-400 py-12 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-black text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">RANEETI</span> 2025
          </h3>
          <p className="text-lg mb-6">Where Strategy Meets Victory 🏆</p>
          <p className="text-sm">&copy; 2025 IIT Mandi Sports Festival. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
