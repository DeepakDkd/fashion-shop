import { NextResponse } from 'next/server'

export async function GET() {
  const categories = [
    { slug: 'saree', name_hi: 'साड़ी', name_en: 'Saree', icon: '🥻', order: 1 },
    { slug: 'suit', name_hi: 'सूट / चूड़ीदार', name_en: 'Suit / Chudidar', icon: '👗', order: 2 },
    { slug: 'blouse', name_hi: 'ब्लाउज़', name_en: 'Blouse', icon: '👚', order: 3 },
    { slug: 'footwear', name_hi: 'जूते', name_en: 'Footwear', icon: '👡', order: 4 },
    { slug: 'other', name_hi: 'अन्य', name_en: 'Other', icon: '✨', order: 5 },
  ]
  return NextResponse.json({ success: true, data: categories })
}
