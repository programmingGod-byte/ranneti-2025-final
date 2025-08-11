'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Clock, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'

const events = [
  {
    id: 1,
    name: "Thunder Cricket",
    god: "Zeus",
    images: [
      "/cricket-action-1.png",
      "/cricket-action-2.png",
      "/cricket-action-3.png"
    ],
    video: "/cricket-highlights.mp4",
    date: "March 15-17, 2025",
    venue: "Main Cricket Ground",
    participants: "16 Teams",
    prize: "₹50,000",
    description: "The ultimate cricket showdown where teams battle for supremacy under the watchful eyes of the Thunder God. Experience the raw power of Zeus as thunderous sixes light up the Himalayan sky.",
    longDescription: "This isn't just cricket—it's a divine spectacle! Teams from across India will clash in an epic tournament that combines traditional cricket with the mystical power of Mount Olympus. With Zeus himself blessing this tournament, expect lightning-fast bowling, thunderous batting, and catches that defy gravity.",
    category: "Team Sport",
    difficulty: "Pro",
    registrationFee: "₹2,000 per team",
    highlights: ["Professional umpires", "Live streaming", "Prize distribution ceremony", "Player of the match awards"],
    rules: ["Standard ICC rules apply", "16 teams knockout format", "Each match 20 overs", "DRS available in finals"]
  },
  {
    id: 2,
    name: "Lightning Football",
    god: "Hermes",
    images: [
      "/football-action-1.png",
      "/football-action-2.png",
      "/football-action-3.png"
    ],
    video: "/football-highlights.mp4",
    date: "March 16-18, 2025",
    venue: "Olympic Football Stadium",
    participants: "12 Teams",
    prize: "₹40,000",
    description: "Fast-paced football action blessed by the messenger of gods. Speed, skill, and strategy collide in this electrifying tournament.",
    longDescription: "Channel the speed of Hermes in this high-octane football tournament! With the blessing of the messenger god, players will showcase lightning-fast footwork, divine passes, and goals that would make the gods themselves cheer.",
    category: "Team Sport",
    difficulty: "Pro",
    registrationFee: "₹1,800 per team",
    highlights: ["FIFA standard pitch", "Professional referees", "Live commentary", "Golden boot award"],
    rules: ["11v11 format", "90 minutes per match", "Group stage + knockouts", "VAR in semifinals and finals"]
  },
  {
    id: 3,
    name: "Titan Basketball",
    god: "Atlas",
    images: [
      "/basketball-action-1.png",
      "/basketball-action-2.png",
      "/basketball-action-3.png"
    ],
    video: "/basketball-highlights.mp4",
    date: "March 17-19, 2025",
    venue: "Indoor Sports Complex",
    participants: "10 Teams",
    prize: "₹35,000",
    description: "Carry the weight of victory on your shoulders in this intense basketball tournament blessed by the mighty Atlas.",
    longDescription: "Rise like the Titans in this epic basketball showdown! With Atlas watching over, players will demonstrate superhuman strength, precision shooting, and teamwork that could move mountains.",
    category: "Team Sport",
    difficulty: "Pro",
    registrationFee: "₹1,500 per team",
    highlights: ["NBA standard court", "Professional scorekeepers", "MVP awards", "All-star team selection"],
    rules: ["5v5 format", "4 quarters of 10 minutes", "Shot clock: 24 seconds", "FIBA rules apply"]
  },
  {
    id: 4,
    name: "Athena's Chess",
    god: "Athena",
    images: [
      "/chess-wisdom-1.png",
      "/chess-wisdom-2.png",
      "/chess-wisdom-3.png"
    ],
    video: "/chess-highlights.mp4",
    date: "March 15-16, 2025",
    venue: "Academic Block",
    participants: "64 Players",
    prize: "₹15,000",
    description: "Battle of minds where wisdom and strategy determine the ultimate champion, blessed by Athena, goddess of wisdom.",
    longDescription: "Enter the realm of pure intellect! Under Athena's guidance, chess masters will engage in battles of wit and strategy. Every move is calculated, every sacrifice meaningful, every victory earned through divine wisdom.",
    category: "Mind Sport",
    difficulty: "All Levels",
    registrationFee: "₹300 per player",
    highlights: ["Digital chess boards", "Live analysis", "Grandmaster commentary", "Rating prizes"],
    rules: ["Swiss system", "90 minutes + 30 seconds increment", "FIDE rules", "Anti-cheating measures"]
  },
  {
    id: 5,
    name: "Poseidon's Swimming",
    god: "Poseidon",
    images: [
      "/swimming-water-1.png",
      "/swimming-water-2.png",
      "/swimming-water-3.png"
    ],
    video: "/swimming-highlights.mp4",
    date: "March 16-17, 2025",
    venue: "Aquatic Center",
    participants: "50 Swimmers",
    prize: "₹20,000",
    description: "Dive into glory with the blessing of the sea god in multiple swimming categories and distances.",
    longDescription: "Master the waters like Poseidon himself! Swimmers will compete across multiple strokes and distances, showcasing the fluid grace and power that only the sea god can bestow.",
    category: "Individual Sport",
    difficulty: "All Levels",
    registrationFee: "₹500 per swimmer",
    highlights: ["Olympic standard pool", "Electronic timing", "Multiple categories", "Record attempts"],
    rules: ["FINA regulations", "Multiple stroke categories", "Heats and finals format", "Drug testing for winners"]
  },
  {
    id: 6,
    name: "Apollo's Archery",
    god: "Apollo",
    images: [
      "/archery-precision-1.png",
      "/archery-precision-2.png",
      "/archery-precision-3.png"
    ],
    video: "/archery-highlights.mp4",
    date: "March 18-19, 2025",
    venue: "Archery Range",
    participants: "40 Archers",
    prize: "₹12,000",
    description: "Channel the precision of the sun god in this ultimate test of accuracy and focus.",
    longDescription: "Aim for perfection with Apollo's blessing! This archery tournament demands the precision of the sun god himself, where every arrow must find its mark with divine accuracy.",
    category: "Individual Sport",
    difficulty: "Intermediate",
    registrationFee: "₹400 per archer",
    highlights: ["World Archery standard", "Electronic scoring", "Precision awards", "Equipment provided"],
    rules: ["Recurve bow only", "70m distance", "World Archery rules", "Ranking and elimination rounds"]
  }
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const categories = ['All', 'Team Sport', 'Individual Sport', 'Mind Sport']

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.category === selectedCategory)

  // Auto-slide images
  useEffect(() => {
    if (selectedEvent && !isVideoPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [selectedEvent, isVideoPlaying])

  const nextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length)
    }
  }

  const prevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
            RANEETI EVENTS
          </h1>
          <Link href="/auth" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300">
            Register
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-6">
            Strategic Battles Await
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            🔥 Sharpen your strategy, master the game, and compete for ultimate victory in RANEETI! 🔥
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-yellow-400/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Slider Layout */}
        <div className="space-y-16">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
              }`}
            >
              {/* Image Section with 3D Effect */}
              <div className={`relative group ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="relative h-96 rounded-3xl overflow-hidden transform-gpu hover:rotate-y-6 transition-all duration-700 preserve-3d">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  
                  {/* Image Slider */}
                  <div className="relative h-full">
                    <img
                      src={event.images[0] || "/placeholder.svg"}
                      alt={event.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="absolute inset-0 flex items-center justify-center z-20 group"
                    >
                      <div className="bg-yellow-400/90 text-black p-4 rounded-full transform group-hover:scale-110 transition-all duration-300 shadow-2xl opacity-0 group-hover:opacity-100">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                    </button>
                  </div>

                  {/* Event Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                      {event.difficulty}
                    </div>
                  </div>

                  {/* God Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-black/70 text-yellow-400 px-4 py-2 rounded-full font-bold text-sm border border-yellow-400/30">
                      Strategic Sport
                    </div>
                  </div>
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 rounded-3xl blur-xl transform translate-y-4 -z-10 opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>

              {/* Content Section */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                <div>
                  <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4">
                    {event.name}
                  </h3>
                  <p className="text-xl text-slate-300 leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Date</span>
                    </div>
                    <p className="text-slate-300 text-sm">{event.date}</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Venue</span>
                    </div>
                    <p className="text-slate-300 text-sm">{event.venue}</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Teams</span>
                    </div>
                    <p className="text-slate-300 text-sm">{event.participants}</p>
                  </div>
                  
                  <div className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">Prize</span>
                    </div>
                    <p className="text-slate-300 text-sm font-bold">{event.prize}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View Details
                  </button>
                  <button className="px-6 py-4 border border-yellow-400 text-yellow-400 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-slate-900/95 border border-yellow-400/30 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Enhanced Image/Video Section */}
              <div className="relative">
                <div className="relative h-96 md:h-full min-h-[400px] rounded-l-3xl overflow-hidden">
                  {isVideoPlaying ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      onEnded={() => setIsVideoPlaying(false)}
                    >
                      <source src={selectedEvent.video} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <img
                        src={selectedEvent.images[currentImageIndex] || "/placeholder.svg"}
                        alt={selectedEvent.name}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Play Video Button */}
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-300"
                      >
                        <div className="bg-yellow-400/90 text-black p-4 rounded-full">
                          <Play className="w-8 h-8 ml-1" />
                        </div>
                      </button>
                      
                      {/* Image Navigation */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Image Dots */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {selectedEvent.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentImageIndex ? 'bg-yellow-400' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedEvent(null)
                    setIsVideoPlaying(false)
                    setCurrentImageIndex(0)
                  }}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-300 z-10"
                >
                  ✕
                </button>
              </div>
              
              {/* Enhanced Content Section */}
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl font-black text-yellow-400">{selectedEvent.name}</h3>
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {selectedEvent.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-2">Strategic Sport</p>
                </div>
                
                <p className="text-slate-300 text-lg leading-relaxed">{selectedEvent.longDescription}</p>
                
                {/* Detailed Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">Date</p>
                        <p className="text-slate-300 text-sm">{selectedEvent.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">Venue</p>
                        <p className="text-slate-300 text-sm">{selectedEvent.venue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">Participants</p>
                        <p className="text-slate-300 text-sm">{selectedEvent.participants}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">Prize Pool</p>
                        <p className="text-slate-300 text-sm font-bold">{selectedEvent.prize}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Event Highlights:</h4>
                  <ul className="space-y-2">
                    {selectedEvent.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rules */}
                <div>
                  <h4 className="text-lg font-bold text-yellow-400 mb-3">Rules & Format:</h4>
                  <ul className="space-y-2">
                    {selectedEvent.rules.map((rule, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Registration Fee */}
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-yellow-400 font-semibold">Registration Fee</p>
                      <p className="text-white font-bold">{selectedEvent.registrationFee}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105">
                    Register Now
                  </button>
                  <button className="px-6 py-4 border border-yellow-400 text-yellow-400 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
