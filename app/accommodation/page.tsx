'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Minus, Save, Bed, Users, MapPin, CheckCircle, AlertCircle, Home, Building } from 'lucide-react'
import Link from 'next/link'

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
  capacity: number
  items: AccommodationItem[]
}

interface Hostel {
  id: string
  name: string
  totalCapacity: number
  occupiedCapacity: number
  rooms: Room[]
}

const initialHostels: Hostel[] = [
  {
    id: 'kamand',
    name: 'Kamand Hostel',
    totalCapacity: 200,
    occupiedCapacity: 45,
    rooms: [
      {
        id: 'kamand-common-1',
        name: 'Common Room 1',
        type: 'common',
        capacity: 20,
        items: [
          { id: 'mattress-1', name: 'Mattress', required: 20, available: 15, allocated: 15 },
          { id: 'pillow-1', name: 'Pillow', required: 20, available: 18, allocated: 18 },
          { id: 'pillow-cover-1', name: 'Pillow Cover', required: 20, available: 20, allocated: 20 },
          { id: 'bedsheet-1', name: 'Bedsheet', required: 20, available: 16, allocated: 16 },
          { id: 'blanket-1', name: 'Blanket', required: 20, available: 12, allocated: 12 }
        ]
      },
      {
        id: 'kamand-study-1',
        name: 'Study Room 1',
        type: 'study',
        capacity: 15,
        items: [
          { id: 'mattress-2', name: 'Mattress', required: 15, available: 15, allocated: 15 },
          { id: 'pillow-2', name: 'Pillow', required: 15, available: 15, allocated: 15 },
          { id: 'pillow-cover-2', name: 'Pillow Cover', required: 15, available: 15, allocated: 15 },
          { id: 'bedsheet-2', name: 'Bedsheet', required: 15, available: 13, allocated: 13 },
          { id: 'blanket-2', name: 'Blanket', required: 15, available: 10, allocated: 10 }
        ]
      }
    ]
  },
  {
    id: 'shivalik',
    name: 'Shivalik Hostel',
    totalCapacity: 180,
    occupiedCapacity: 32,
    rooms: [
      {
        id: 'shivalik-common-1',
        name: 'Common Room 1',
        type: 'common',
        capacity: 18,
        items: [
          { id: 'mattress-3', name: 'Mattress', required: 18, available: 18, allocated: 18 },
          { id: 'pillow-3', name: 'Pillow', required: 18, available: 16, allocated: 16 },
          { id: 'pillow-cover-3', name: 'Pillow Cover', required: 18, available: 18, allocated: 18 },
          { id: 'bedsheet-3', name: 'Bedsheet', required: 18, available: 14, allocated: 14 },
          { id: 'blanket-3', name: 'Blanket', required: 18, available: 15, allocated: 15 }
        ]
      },
      {
        id: 'shivalik-study-1',
        name: 'Study Room 1',
        type: 'study',
        capacity: 12,
        items: [
          { id: 'mattress-4', name: 'Mattress', required: 12, available: 10, allocated: 10 },
          { id: 'pillow-4', name: 'Pillow', required: 12, available: 12, allocated: 12 },
          { id: 'pillow-cover-4', name: 'Pillow Cover', required: 12, available: 12, allocated: 12 },
          { id: 'bedsheet-4', name: 'Bedsheet', required: 12, available: 8, allocated: 8 },
          { id: 'blanket-4', name: 'Blanket', required: 12, available: 9, allocated: 9 }
        ]
      }
    ]
  },
  {
    id: 'himalaya',
    name: 'Himalaya Hostel',
    totalCapacity: 220,
    occupiedCapacity: 58,
    rooms: [
      {
        id: 'himalaya-common-1',
        name: 'Common Room 1',
        type: 'common',
        capacity: 25,
        items: [
          { id: 'mattress-5', name: 'Mattress', required: 25, available: 20, allocated: 20 },
          { id: 'pillow-5', name: 'Pillow', required: 25, available: 25, allocated: 25 },
          { id: 'pillow-cover-5', name: 'Pillow Cover', required: 25, available: 25, allocated: 25 },
          { id: 'bedsheet-5', name: 'Bedsheet', required: 25, available: 22, allocated: 22 },
          { id: 'blanket-5', name: 'Blanket', required: 25, available: 18, allocated: 18 }
        ]
      },
      {
        id: 'himalaya-common-2',
        name: 'Common Room 2',
        type: 'common',
        capacity: 20,
        items: [
          { id: 'mattress-6', name: 'Mattress', required: 20, available: 18, allocated: 18 },
          { id: 'pillow-6', name: 'Pillow', required: 20, available: 20, allocated: 20 },
          { id: 'pillow-cover-6', name: 'Pillow Cover', required: 20, available: 20, allocated: 20 },
          { id: 'bedsheet-6', name: 'Bedsheet', required: 20, available: 15, allocated: 15 },
          { id: 'blanket-6', name: 'Blanket', required: 20, available: 17, allocated: 17 }
        ]
      },
      {
        id: 'himalaya-study-1',
        name: 'Study Room 1',
        type: 'study',
        capacity: 15,
        items: [
          { id: 'mattress-7', name: 'Mattress', required: 15, available: 12, allocated: 12 },
          { id: 'pillow-7', name: 'Pillow', required: 15, available: 15, allocated: 15 },
          { id: 'pillow-cover-7', name: 'Pillow Cover', required: 15, available: 15, allocated: 15 },
          { id: 'bedsheet-7', name: 'Bedsheet', required: 15, available: 10, allocated: 10 },
          { id: 'blanket-7', name: 'Blanket', required: 15, available: 13, allocated: 13 }
        ]
      }
    ]
  }
]

export default function AccommodationPage() {
  const [hostels, setHostels] = useState<Hostel[]>(initialHostels)
  const [selectedHostel, setSelectedHostel] = useState<string>('')
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const updateItemQuantity = (hostelId: string, roomId: string, itemId: string, field: 'available' | 'allocated', value: number) => {
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

  const saveData = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaveMessage('Data saved successfully!')
    setIsSaving(false)
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const getTotalStats = () => {
    let totalCapacity = 0
    let totalOccupied = 0
    let totalShortage = 0

    hostels.forEach(hostel => {
      totalCapacity += hostel.totalCapacity
      totalOccupied += hostel.occupiedCapacity
      
      hostel.rooms.forEach(room => {
        room.items.forEach(item => {
          if (item.allocated < item.required) {
            totalShortage += (item.required - item.allocated)
          }
        })
      })
    })

    return { totalCapacity, totalOccupied, totalShortage }
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
            ACCOMMODATION MANAGEMENT
          </h1>
          <button
            onClick={saveData}
            disabled={isSaving}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 mb-6">
            Hostel Management
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            🏠 Manage accommodation arrangements for visiting teams and participants during RANEETI 2025
          </p>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-400/30 rounded-xl text-green-400 text-center">
            <CheckCircle className="w-5 h-5 inline mr-2" />
            {saveMessage}
          </div>
        )}

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/60 border border-yellow-400/20 rounded-xl p-6 text-center">
            <Building className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{stats.totalCapacity}</div>
            <div className="text-gray-400">Total Capacity</div>
          </div>
          <div className="bg-gray-900/60 border border-yellow-400/20 rounded-xl p-6 text-center">
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{stats.totalOccupied}</div>
            <div className="text-gray-400">Currently Occupied</div>
          </div>
          <div className="bg-gray-900/60 border border-yellow-400/20 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-2">{stats.totalShortage}</div>
            <div className="text-gray-400">Items Shortage</div>
          </div>
        </div>

        {/* Hostels Grid */}
        <div className="space-y-8">
          {hostels.map((hostel) => (
            <div key={hostel.id} className="bg-gray-900/40 border border-yellow-400/20 rounded-2xl p-6">
              {/* Hostel Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Home className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400">{hostel.name}</h3>
                    <p className="text-gray-400">
                      Capacity: {hostel.occupiedCapacity}/{hostel.totalCapacity} 
                      ({Math.round((hostel.occupiedCapacity / hostel.totalCapacity) * 100)}% occupied)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{hostel.rooms.length} Rooms</div>
                  <div className="text-sm text-gray-400">Available for guests</div>
                </div>
              </div>

              {/* Rooms */}
              <div className="space-y-6">
                {hostel.rooms.map((room) => (
                  <div key={room.id} className="bg-black/40 border border-gray-700 rounded-xl p-6">
                    {/* Room Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Bed className="w-6 h-6 text-yellow-400" />
                        <div>
                          <h4 className="text-xl font-bold text-white">{room.name}</h4>
                          <p className="text-gray-400 capitalize">
                            {room.type} Room • Capacity: {room.capacity} people
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        room.type === 'common' 
                          ? 'bg-blue-900/30 text-blue-400 border border-blue-400/30'
                          : 'bg-purple-900/30 text-purple-400 border border-purple-400/30'
                      }`}>
                        {room.type === 'common' ? 'Common Room' : 'Study Room'}
                      </div>
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
                            <th className="text-center py-3 px-4 text-yellow-400 font-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {room.items.map((item) => {
                            const isShortage = item.allocated < item.required
                            const isOverAllocated = item.allocated > item.available
                            
                            return (
                              <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                                <td className="py-4 px-4 text-white font-medium">{item.name}</td>
                                <td className="py-4 px-4 text-center text-white">{item.required}</td>
                                <td className="py-4 px-4 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() => updateItemQuantity(hostel.id, room.id, item.id, 'available', item.available - 1)}
                                      className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-white min-w-[3rem] text-center">{item.available}</span>
                                    <button
                                      onClick={() => updateItemQuantity(hostel.id, room.id, item.id, 'available', item.available + 1)}
                                      className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() => updateItemQuantity(hostel.id, room.id, item.id, 'allocated', item.allocated - 1)}
                                      className="bg-red-600 hover:bg-red-700 text-white p-1 rounded"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </button>
                                    <span className={`min-w-[3rem] text-center ${
                                      isOverAllocated ? 'text-red-400' : 'text-white'
                                    }`}>
                                      {item.allocated}
                                    </span>
                                    <button
                                      onClick={() => updateItemQuantity(hostel.id, room.id, item.id, 'allocated', item.allocated + 1)}
                                      className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  {isOverAllocated ? (
                                    <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded-full text-xs border border-red-400/30">
                                      Over-allocated
                                    </span>
                                  ) : isShortage ? (
                                    <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-400/30">
                                      Shortage: {item.required - item.allocated}
                                    </span>
                                  ) : (
                                    <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs border border-green-400/30">
                                      Complete
                                    </span>
                                  )}
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <button
                                    onClick={() => updateItemQuantity(hostel.id, room.id, item.id, 'allocated', item.required)}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-black px-3 py-1 rounded text-xs font-bold"
                                  >
                                    Auto-fill
                                  </button>
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

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-900/40 border border-yellow-400/20 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300">
              Auto-fill All Shortages
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300">
              Generate Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
