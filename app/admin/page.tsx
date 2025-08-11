'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Plus, Edit, Trash2, Save, Users, Building, Home, Bed, AlertCircle, CheckCircle, Search, Filter, Download, Upload, Minus, X, Calendar, Trophy, ShoppingBag, Star } from 'lucide-react'
import { College, Event, MerchItem, Hostel } from '@/lib/schemas'

interface AccommodationItem {
  id: string
  name: string
  required: number
  available: number
  allocated: number
}

interface Room {
  id: string
  name: string
  type: 'common' | 'study'
  floor: number
  capacity: number
  items: AccommodationItem[]
}

const defaultItems = [
  { name: 'Mattress', required: 0, available: 0, allocated: 0 },
  { name: 'Pillow', required: 0, available: 0, allocated: 0 },
  { name: 'Pillow Cover', required: 0, available: 0, allocated: 0 },
  { name: 'Bedsheet', required: 0, available: 0, allocated: 0 },
  { name: 'Blanket', required: 0, available: 0, allocated: 0 }
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<'colleges' | 'hostels' | 'events' | 'merch' | 'users'>('colleges')
  const [colleges, setColleges] = useState<College[]>([])
  const [hostels, setHostels] = useState<Hostel[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [merch, setMerch] = useState<MerchItem[]>([])
  const [isAddingCollege, setIsAddingCollege] = useState(false)
  const [isAddingHostel, setIsAddingHostel] = useState(false)
  const [isAddingRoom, setIsAddingRoom] = useState<string | null>(null)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [isAddingMerch, setIsAddingMerch] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  const [newCollege, setNewCollege] = useState({
    name: '',
    location: '',
    type: 'IIT' as 'IIT' | 'NIT' | 'Private' | 'State',
    contactEmail: '',
    contactPhone: ''
  })
  
  const [newHostel, setNewHostel] = useState({
    name: ''
  })
  
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: 'common' as 'common' | 'study',
    floor: 1,
    capacity: 0
  })

  const [newEvent, setNewEvent] = useState({
    name: '',
    god: '',
    images: [''],
    video: '',
    date: '',
    venue: '',
    participants: '',
    prize: '',
    description: '',
    longDescription: '',
    category: 'Team Sport' as 'Team Sport' | 'Individual Sport' | 'Mind Sport',
    difficulty: 'Pro' as 'Beginner' | 'Intermediate' | 'Pro' | 'All Levels',
    registrationFee: '',
    highlights: [''],
    rules: ['']
  })

  const [newMerchItem, setNewMerchItem] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    images: [''],
    category: 'T-Shirts' as 'T-Shirts' | 'Hoodies' | 'Caps' | 'Jackets' | 'Shorts' | 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black'],
    description: '',
    longDescription: '',
    features: [''],
    inStock: true,
    trending: false,
    stockQuantity: 0
  })

  // Load data from database
  const loadFromDatabase = async () => {
    try {
      const response = await fetch('/api/admin/load')
      if (response.ok) {
        const data = await response.json()
        setColleges(data.colleges || [])
        setHostels(data.hostels || [])
        setEvents(data.events || [])
        setMerch(data.merch || [])
      }
    } catch (error) {
      console.error('Database load error:', error)
    }
  }

  const saveToDatabase = async () => {
    try {
      setIsSaving(true)
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ colleges, hostels, events, merch })
      })
      
      if (response.ok) {
        setSaveMessage('Data saved to database successfully!')
      } else {
        setSaveMessage('Error saving to database')
      }
    } catch (error) {
      console.error('Database save error:', error)
      setSaveMessage('Database connection error')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadFromDatabase()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginData.username === 'admin' && loginData.password === 'raneeti2025') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials! Use admin / raneeti2025')
    }
  }

  const handleAddCollege = () => {
    const college: College = {
      id: `college-${Date.now()}`,
      ...newCollege,
      registeredStudents: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setColleges(prev => [...prev, college])
    setNewCollege({ name: '', location: '', type: 'IIT', contactEmail: '', contactPhone: '' })
    setIsAddingCollege(false)
  }

  const handleAddEvent = () => {
    const event: Event = {
      id: `event-${Date.now()}`,
      ...newEvent,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setEvents(prev => [...prev, event])
    setNewEvent({
      name: '', god: '', images: [''], video: '', date: '', venue: '', participants: '', prize: '',
      description: '', longDescription: '', category: 'Team Sport', difficulty: 'Pro',
      registrationFee: '', highlights: [''], rules: ['']
    })
    setIsAddingEvent(false)
  }

  const handleAddMerch = () => {
    const merchItem: MerchItem = {
      id: `merch-${Date.now()}`,
      ...newMerchItem,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setMerch(prev => [...prev, merchItem])
    setNewMerchItem({
      name: '', price: 0, originalPrice: 0, images: [''], category: 'T-Shirts',
      sizes: ['S', 'M', 'L', 'XL'], colors: ['Black'], description: '', longDescription: '',
      features: [''], inStock: true, trending: false, stockQuantity: 0
    })
    setIsAddingMerch(false)
  }

  const handleAddHostel = () => {
    const hostel: Hostel = {
      id: `hostel-${Date.now()}`,
      ...newHostel,
      rooms: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setHostels(prev => [...prev, hostel])
    setNewHostel({ name: '' })
    setIsAddingHostel(false)
  }

  const handleAddRoom = (hostelId: string) => {
    const roomId = `room-${Date.now()}`
    const items = defaultItems.map((item, index) => ({
      id: `${roomId}-item-${index}`,
      ...item,
      required: newRoom.capacity
    }))

    const room = {
      id: roomId,
      ...newRoom,
      items
    }

    setHostels(prev => prev.map(hostel => {
      if (hostel.id === hostelId) {
        return {
          ...hostel,
          rooms: [...hostel.rooms, room]
        }
      }
      return hostel
    }))

    setNewRoom({ name: '', type: 'common', floor: 1, capacity: 0 })
    setIsAddingRoom(null)
  }

  const updateHostelItem = (hostelId: string, roomId: string, itemId: string, field: 'available' | 'allocated', value: number) => {
    setHostels(prev => prev.map(hostel => {
      if (hostel.id === hostelId) {
        return {
          ...hostel,
          rooms: hostel.rooms.map(room => {
            if (room.id === roomId) {
              return {
                ...room,
                items: room.items.map(item => {
                  if (item.id === itemId) {
                    return { ...item, [field]: Math.max(0, value) }
                  }
                  return item
                })
              }
            }
            return room
          })
        }
      }
      return hostel
    }))
  }

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || college.type === filterType
    return matchesSearch && matchesFilter
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/60 border border-yellow-400/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-4">
                <Building className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
                RANEETI ADMIN
              </h1>
              <p className="text-slate-400 mt-2">Administrative Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-yellow-400 font-semibold mb-3">Username</label>
                <input
                  type="text"
                  required
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl py-4 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  placeholder="Enter admin username"
                />
              </div>

              <div>
                <label className="block text-yellow-400 font-semibold mb-3">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-2xl py-4 px-4 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-yellow-400 transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
              >
                Login to Dashboard
              </button>
            </form>

            <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
              <p className="text-yellow-400 text-sm text-center">
                <strong>Demo Credentials:</strong><br />
                Username: admin<br />
                Password: raneeti2025
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900/60 border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
            RANEETI ADMIN DASHBOARD
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={saveToDatabase}
              disabled={isSaving}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save to DB'}
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-xl text-center ${
            saveMessage.includes('Error') || saveMessage.includes('error')
              ? 'bg-red-900/20 border border-red-400/30 text-red-400'
              : 'bg-green-900/20 border border-green-400/30 text-green-400'
          }`}>
            <CheckCircle className="w-5 h-5 inline mr-2" />
            {saveMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'colleges'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Building className="w-5 h-5 inline mr-2" />
            Colleges
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Trophy className="w-5 h-5 inline mr-2" />
            Events
          </button>
          <button
            onClick={() => setActiveTab('merch')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'merch'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <ShoppingBag className="w-5 h-5 inline mr-2" />
            Merchandise
          </button>
          <button
            onClick={() => setActiveTab('hostels')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'hostels'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Home className="w-5 h-5 inline mr-2" />
            Hostels
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Users
          </button>
        </div>

        {/* College Management Tab */}
        {activeTab === 'colleges' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-yellow-400">College Management</h2>
              <button
                onClick={() => setIsAddingCollege(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add College
              </button>
            </div>

            {/* Add College Form */}
            {isAddingCollege && (
              <div className="bg-gray-900/60 border border-yellow-400/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Add New College</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="College Name"
                    value={newCollege.name}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newCollege.location}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <select
                    value={newCollege.type}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, type: e.target.value as any }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="IIT">IIT</option>
                    <option value="NIT">NIT</option>
                    <option value="Private">Private</option>
                    <option value="State">State</option>
                  </select>
                  <input
                    type="email"
                    placeholder="Contact Email"
                    value={newCollege.contactEmail}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Phone"
                    value={newCollege.contactPhone}
                    onChange={(e) => setNewCollege(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleAddCollege}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Add College
                  </button>
                  <button
                    onClick={() => setIsAddingCollege(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Colleges Table */}
            <div className="bg-gray-900/60 border border-yellow-400/20 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="text-left py-4 px-6 text-yellow-400 font-bold">College Name</th>
                      <th className="text-left py-4 px-6 text-yellow-400 font-bold">Location</th>
                      <th className="text-left py-4 px-6 text-yellow-400 font-bold">Type</th>
                      <th className="text-left py-4 px-6 text-yellow-400 font-bold">Contact</th>
                      <th className="text-center py-4 px-6 text-yellow-400 font-bold">Students</th>
                      <th className="text-center py-4 px-6 text-yellow-400 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.map((college) => (
                      <tr key={college.id} className="border-b border-gray-700 hover:bg-gray-800/30">
                        <td className="py-4 px-6 text-white font-medium">{college.name}</td>
                        <td className="py-4 px-6 text-gray-300">{college.location}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            college.type === 'IIT' ? 'bg-blue-900/30 text-blue-400' :
                            college.type === 'NIT' ? 'bg-green-900/30 text-green-400' :
                            college.type === 'Private' ? 'bg-purple-900/30 text-purple-400' :
                            'bg-orange-900/30 text-orange-400'
                          }`}>
                            {college.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          <div className="text-sm">
                            <div>{college.contactEmail}</div>
                            <div>{college.contactPhone}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center text-white font-bold">{college.registeredStudents}</td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-300">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Events Management Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-yellow-400">Events Management</h2>
              <button
                onClick={() => setIsAddingEvent(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Event
              </button>
            </div>

            {/* Add Event Form */}
            {isAddingEvent && (
              <div className="bg-gray-900/60 border border-yellow-400/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Add New Event</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="God/Theme"
                    value={newEvent.god}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, god: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Venue"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, venue: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Participants"
                    value={newEvent.participants}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, participants: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Prize"
                    value={newEvent.prize}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, prize: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value as any }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Team Sport">Team Sport</option>
                    <option value="Individual Sport">Individual Sport</option>
                    <option value="Mind Sport">Mind Sport</option>
                  </select>
                  <select
                    value={newEvent.difficulty}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Pro">Pro</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Registration Fee"
                    value={newEvent.registrationFee}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, registrationFee: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 h-24"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleAddEvent}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Add Event
                  </button>
                  <button
                    onClick={() => setIsAddingEvent(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-gray-900/60 border border-yellow-400/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">{event.name}</h3>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300"><strong>Date:</strong> {event.date}</p>
                    <p className="text-gray-300"><strong>Venue:</strong> {event.venue}</p>
                    <p className="text-gray-300"><strong>Prize:</strong> {event.prize}</p>
                    <p className="text-gray-300"><strong>Category:</strong> {event.category}</p>
                    <p className="text-gray-300"><strong>Difficulty:</strong> {event.difficulty}</p>
                  </div>
                  <p className="text-gray-400 mt-4 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merchandise Management Tab */}
        {activeTab === 'merch' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-yellow-400">Merchandise Management</h2>
              <button
                onClick={() => setIsAddingMerch(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Merch Item
              </button>
            </div>

            {/* Add Merch Form */}
            {isAddingMerch && (
              <div className="bg-gray-900/60 border border-yellow-400/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Add New Merchandise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={newMerchItem.name}
                    onChange={(e) => setNewMerchItem(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <select
                    value={newMerchItem.category}
                    onChange={(e) => setNewMerchItem(prev => ({ ...prev, category: e.target.value as any }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Caps">Caps</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    value={newMerchItem.price || ''}
                    onChange={(e) => setNewMerchItem(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="number"
                    placeholder="Original Price"
                    value={newMerchItem.originalPrice || ''}
                    onChange={(e) => setNewMerchItem(prev => ({ ...prev, originalPrice: parseInt(e.target.value) || 0 }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={newMerchItem.stockQuantity || ''}
                    onChange={(e) => setNewMerchItem(prev => ({ ...prev, stockQuantity: parseInt(e.target.value) || 0 }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="checkbox"
                        checked={newMerchItem.inStock}
                        onChange={(e) => setNewMerchItem(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="rounded"
                      />
                      In Stock
                    </label>
                    <label className="flex items-center gap-2 text-white">
                      <input
                        type="checkbox"
                        checked={newMerchItem.trending}
                        onChange={(e) => setNewMerchItem(prev => ({ ...prev, trending: e.target.checked }))}
                        className="rounded"
                      />
                      Trending
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    placeholder="Item Description"
                    value={newMerchItem.description}
                    onChange={(e) => setNewMerchItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 h-24"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleAddMerch}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Add Merchandise
                  </button>
                  <button
                    onClick={() => setIsAddingMerch(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Merch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {merch.map((item) => (
                <div key={item.id} className="bg-gray-900/60 border border-yellow-400/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">{item.name}</h3>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300"><strong>Category:</strong> {item.category}</p>
                    <p className="text-gray-300"><strong>Price:</strong> ₹{item.price}</p>
                    <p className="text-gray-300"><strong>Stock:</strong> {item.stockQuantity}</p>
                    <div className="flex gap-2">
                      {item.inStock && (
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">In Stock</span>
                      )}
                      {item.trending && (
                        <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full text-xs">Trending</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 mt-4 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hostel Management Tab */}
        {activeTab === 'hostels' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-yellow-400">Hostel Management</h2>
              <button
                onClick={() => setIsAddingHostel(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Hostel
              </button>
            </div>

            {/* Add Hostel Form */}
            {isAddingHostel && (
              <div className="bg-gray-900/60 border border-yellow-400/30 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Add New Hostel</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Hostel Name"
                    value={newHostel.name}
                    onChange={(e) => setNewHostel(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleAddHostel}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Add Hostel
                  </button>
                  <button
                    onClick={() => setIsAddingHostel(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            {/* Hostels */}
            <div className="space-y-8">
              {hostels.map((hostel) => (
                <div key={hostel.id} className="bg-gray-900/40 border border-yellow-400/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Home className="w-8 h-8 text-yellow-400" />
                      <div>
                        <h3 className="text-2xl font-bold text-yellow-400">{hostel.name}</h3>
                        <p className="text-gray-500 text-sm">{hostel.rooms.length} rooms</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsAddingRoom(hostel.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-colors duration-300 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Room
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl transition-colors duration-300">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Add Room Form */}
                  {isAddingRoom === hostel.id && (
                    <div className="bg-black/40 border border-gray-700 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-bold text-yellow-400 mb-4">Add New Room</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                          type="text"
                          placeholder="Room Name"
                          value={newRoom.name}
                          onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                        />
                        <select
                          value={newRoom.type}
                          onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value as 'common' | 'study' }))}
                          className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-400"
                        >
                          <option value="common">Common Room</option>
                          <option value="study">Study Room</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Floor"
                          value={newRoom.floor || ''}
                          onChange={(e) => setNewRoom(prev => ({ ...prev, floor: parseInt(e.target.value) || 1 }))}
                          className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                        />
                        <input
                          type="number"
                          placeholder="Capacity"
                          value={newRoom.capacity || ''}
                          onChange={(e) => setNewRoom(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                        />
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button
                          onClick={() => handleAddRoom(hostel.id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                        >
                          Add Room
                        </button>
                        <button
                          onClick={() => setIsAddingRoom(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rooms */}
                  <div className="space-y-6">
                    {hostel.rooms.map((room) => (
                      <div key={room.id} className="bg-black/40 border border-gray-700 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Bed className="w-6 h-6 text-yellow-400" />
                            <div>
                              <h4 className="text-xl font-bold text-white">{room.name}</h4>
                              <p className="text-gray-400 capitalize">
                                {room.type} Room • Floor {room.floor} • Capacity: {room.capacity} people
                              </p>
                            </div>
                          </div>
                          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="text-left py-3 px-4 text-yellow-400 font-bold">Item</th>
                                <th className="text-center py-3 px-4 text-yellow-400 font-bold">Required</th>
                                <th className="text-center py-3 px-4 text-yellow-400 font-bold">Available</th>
                                <th className="text-center py-3 px-4 text-yellow-400 font-bold">Allocated</th>
                                <th className="text-center py-3 px-4 text-yellow-400 font-bold">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {room.items.map((item) => {
                                const isShortage = item.allocated < item.required
                                const isOverAllocated = item.allocated > item.available
                                
                                return (
                                  <tr key={item.id} className="border-b border-gray-800">
                                    <td className="py-4 px-4 text-white font-medium">{item.name}</td>
                                    <td className="py-4 px-4 text-center text-white">{item.required}</td>
                                    <td className="py-4 px-4 text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => updateHostelItem(hostel.id, room.id, item.id, 'available', item.available - 1)}
                                          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="text-white min-w-[3rem] text-center">{item.available}</span>
                                        <button
                                          onClick={() => updateHostelItem(hostel.id, room.id, item.id, 'available', item.available + 1)}
                                          className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => updateHostelItem(hostel.id, room.id, item.id, 'allocated', item.allocated - 1)}
                                          className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <span className={`min-w-[3rem] text-center ${
                                          isOverAllocated ? 'text-red-400' : 'text-white'
                                        }`}>
                                          {item.allocated}
                                        </span>
                                        <button
                                          onClick={() => updateHostelItem(hostel.id, room.id, item.id, 'allocated', item.allocated + 1)}
                                          className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                      {isOverAllocated ? (
                                        <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded-full text-xs">
                                          Over-allocated
                                        </span>
                                      ) : isShortage ? (
                                        <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full text-xs">
                                          Shortage: {item.required - item.allocated}
                                        </span>
                                      ) : (
                                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs">
                                          Complete
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-8">User Management</h2>
            <div className="bg-gray-900/60 border border-yellow-400/20 rounded-2xl p-8 text-center">
              <Users className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">User Management Coming Soon</h3>
              <p className="text-gray-400">
                This section will allow you to manage registered users, view their details, and handle registrations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
