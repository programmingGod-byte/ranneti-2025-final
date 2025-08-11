import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Event } from '@/lib/schemas'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('raneeti')
    
    const events = await db.collection<Event>('events').find({ isActive: true }).toArray()
    
    return NextResponse.json({
      success: true,
      events: events.map(event => ({
        ...event,
        _id: event._id?.toString()
      }))
    })
  } catch (error) {
    console.error('Database load error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()
    
    const client = await clientPromise
    const db = client.db('raneeti')
    
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await db.collection('events').insertOne(newEvent)
    
    return NextResponse.json({ success: true, event: newEvent })
  } catch (error) {
    console.error('Database save error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save event' },
      { status: 500 }
    )
  }
}
