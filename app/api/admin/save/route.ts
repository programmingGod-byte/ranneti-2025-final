import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const client = await clientPromise
    const db = client.db('raneeti')
    
    // Save colleges
    if (data.colleges && data.colleges.length > 0) {
      await db.collection('colleges').deleteMany({})
      const collegesWithTimestamp = data.colleges.map((college: any) => ({
        ...college,
        updatedAt: new Date().toISOString()
      }))
      await db.collection('colleges').insertMany(collegesWithTimestamp)
    }
    
    // Save hostels
    if (data.hostels && data.hostels.length > 0) {
      await db.collection('hostels').deleteMany({})
      const hostelsWithTimestamp = data.hostels.map((hostel: any) => ({
        ...hostel,
        updatedAt: new Date().toISOString()
      }))
      await db.collection('hostels').insertMany(hostelsWithTimestamp)
    }
    
    // Save events
    if (data.events && data.events.length > 0) {
      await db.collection('events').deleteMany({})
      const eventsWithTimestamp = data.events.map((event: any) => ({
        ...event,
        updatedAt: new Date().toISOString()
      }))
      await db.collection('events').insertMany(eventsWithTimestamp)
    }
    
    // Save merch
    if (data.merch && data.merch.length > 0) {
      await db.collection('merch').deleteMany({})
      const merchWithTimestamp = data.merch.map((item: any) => ({
        ...item,
        updatedAt: new Date().toISOString()
      }))
      await db.collection('merch').insertMany(merchWithTimestamp)
    }
    
    return NextResponse.json({ success: true, message: 'Data saved successfully' })
  } catch (error) {
    console.error('Database save error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    )
  }
}
