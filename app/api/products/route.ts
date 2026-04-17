import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import slugify from 'slugify'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const newArrival = searchParams.get('newArrival')
    const limit = parseInt(searchParams.get('limit') || '100')

    const query: Record<string, unknown> = {}
    if (category && category !== 'all') query.category = category
    if (featured === 'true') query.featured = true
    if (newArrival === 'true') query.isNewArrival = true
    if (search) {
      query.$or = [
        { name_hi: { $regex: search, $options: 'i' } },
        { name_en: { $regex: search, $options: 'i' } },
      ]
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).limit(limit).lean()
    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()

    // Generate slug from English name
    let slug = slugify(body.name_en, { lower: true, strict: true })

    // Ensure unique slug
    const existing = await Product.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const product = await Product.create({ ...body, slug })
    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 })
  }
}
