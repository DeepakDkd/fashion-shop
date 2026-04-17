import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import slugify from 'slugify'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const product = await Product.findById(params.id).lean()
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await req.json()

    // Regenerate slug if name changed
    if (body.name_en) {
      body.slug = slugify(body.name_en, { lower: true, strict: true })
      // Check for slug conflict with other products
      const conflict = await Product.findOne({ slug: body.slug, _id: { $ne: params.id } })
      if (conflict) {
        body.slug = `${body.slug}-${Date.now()}`
      }
    }

    const product = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const product = await Product.findByIdAndDelete(params.id)
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 })
  }
}
