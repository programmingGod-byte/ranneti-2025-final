import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MerchItem } from '@/lib/schemas'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('raneeti')
    
    const merchItems = await db.collection<MerchItem>('merch').find({}).toArray()
    
    return NextResponse.json({
      success: true,
      merchItems: merchItems.map(item => ({
        ...item,
        _id: item._id?.toString()
      }))
    })
  } catch (error) {
    console.error('Database load error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load merch items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const merchData = await request.json()
    
    const client = await clientPromise
    const db = client.db('raneeti')
    
    const newMerchItem: MerchItem = {
      ...merchData,
      id: `merch-${Date.now()}`,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    await db.collection('merch').insertOne(newMerchItem)
    
    return NextResponse.json({ success: true, merchItem: newMerchItem })
  } catch (error) {
    console.error('Database save error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save merch item' },
      { status: 500 }
    )
  }
}
