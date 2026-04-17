import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import ProductGrid from '@/components/ProductGrid'
import { IProduct } from '@/types'
import { notFound } from 'next/navigation'

const VALID_CATEGORIES = ['saree', 'suit', 'blouse', 'footwear', 'other']

const CATEGORY_LABELS: Record<string, { hi: string; en: string }> = {
  saree: { hi: 'साड़ियाँ', en: 'Sarees' },
  suit: { hi: 'सूट / चूड़ीदार', en: 'Suits / Chudidar' },
  blouse: { hi: 'ब्लाउज़', en: 'Blouses' },
  footwear: { hi: 'जूते', en: 'Footwear' },
  other: { hi: 'अन्य', en: 'Others' },
}

async function getCategoryProducts(cat: string) {
  await connectDB()
  const products = await Product.find({ category: cat, inStock: true }).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(products))
}

export default async function CategoryPage({
  params: { locale, cat },
}: {
  params: { locale: string; cat: string }
}) {
  if (!VALID_CATEGORIES.includes(cat)) notFound()

  const products = await getCategoryProducts(cat)
  const label = CATEGORY_LABELS[cat]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-rose-700 font-display">
          {locale === 'hi' ? label.hi : label.en}
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          {products.length} {locale === 'hi' ? 'उत्पाद' : 'products'}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🛍️</p>
          <p className="text-lg">{locale === 'hi' ? 'जल्द आ रहा है!' : 'Coming Soon!'}</p>
        </div>
      ) : (
        <ProductGrid products={products as IProduct[]} locale={locale as 'hi' | 'en'} />
      )}
    </div>
  )
}
