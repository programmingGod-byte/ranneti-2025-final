// Database Schemas and Types

export interface College {
  _id?: string
  id: string
  name: string
  location: string
  type: 'IIT' | 'NIT' | 'Private' | 'State'
  contactEmail: string
  contactPhone: string
  registeredStudents: number
  createdAt: string
  updatedAt: string
}

export interface Event {
  _id?: string
  id: string
  name: string
  god: string
  images: string[]
  video?: string
  date: string
  venue: string
  participants: string
  prize: string
  description: string
  longDescription: string
  category: 'Team Sport' | 'Individual Sport' | 'Mind Sport'
  difficulty: 'Beginner' | 'Intermediate' | 'Pro' | 'All Levels'
  registrationFee: string
  highlights: string[]
  rules: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MerchItem {
  _id?: string
  id: string
  name: string
  price: number
  originalPrice: number
  images: string[]
  category: 'T-Shirts' | 'Hoodies' | 'Caps' | 'Jackets' | 'Shorts' | 'Accessories'
  sizes: string[]
  colors: string[]
  rating: number
  reviews: number
  description: string
  longDescription: string
  features: string[]
  inStock: boolean
  trending: boolean
  stockQuantity: number
  createdAt: string
  updatedAt: string
}

export interface AccommodationItem {
  id: string
  name: string
  required: number
  available: number
  allocated: number
}

export interface Room {
  id: string
  name: string
  type: 'common' | 'study'
  floor: number
  capacity: number
  items: AccommodationItem[]
}

export interface Hostel {
  _id?: string
  id: string
  name: string
  rooms: Room[]
  createdAt: string
  updatedAt: string
}

export interface User {
  _id?: string
  id: string
  email: string
  name: string
  phone: string
  gender: string
  dateOfBirth: string
  studentId: string
  year: string
  department: string
  collegeId: string
  college: College
  registrationDate: string
  isActive: boolean
}
