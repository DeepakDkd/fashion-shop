import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ShopInfo } from '@/models/ShopInfo'

export async function GET() {
  try {
    await connectDB()
    let shopInfo = await ShopInfo.findOne().lean()
    if (!shopInfo) {
      shopInfo = await ShopInfo.create({})
    }
    return NextResponse.json({ success: true, data: shopInfo })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to fetch shop info' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const shopInfo = await ShopInfo.findOneAndUpdate({}, body, { new: true, upsert: true })
    return NextResponse.json({ success: true, data: shopInfo })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to update shop info' }, { status: 500 })
  }
}
