import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { College } from '@/lib/schemas'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('raneeti')
    
    const colleges = await db.collection<College>('colleges').find({}).toArray()
    
    return NextResponse.json({
      success: true,
      colleges: colleges.map(college => ({
        ...college,
        _id: college._id?.toString()
      }))
    })
  } catch (error) {
    console.error('Database load error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load colleges' },
      { status: 500 }
    )
  }
}
