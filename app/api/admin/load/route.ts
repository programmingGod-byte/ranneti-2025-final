import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('raneeti')
    
    const colleges = await db.collection('colleges').find({}).toArray()
    const hostels = await db.collection('hostels').find({}).toArray()
    const events = await db.collection('events').find({}).toArray()
    const merch = await db.collection('merch').find({}).toArray()
    
    return NextResponse.json({
      success: true,
      colleges: colleges.map(college => ({ ...college, _id: college._id?.toString() })),
      hostels: hostels.map(hostel => ({ ...hostel, _id: hostel._id?.toString() })),
      events: events.map(event => ({ ...event, _id: event._id?.toString() })),
      merch: merch.map(item => ({ ...item, _id: item._id?.toString() }))
    })
  } catch (error) {
    console.error('Database load error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load data' },
      { status: 500 }
    )
  }
}
