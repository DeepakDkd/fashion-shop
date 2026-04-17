import { getTranslations } from 'next-intl/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import ProductsClient from '@/components/ProductsClient'
import { IProduct } from '@/types'

async function getProducts(category?: string, search?: string) {
  await connectDB()
  const query: Record<string, unknown> = {}
  if (category && category !== 'all') query.category = category
  if (search) query.$text = { $search: search }
  const products = await Product.find(query).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(products))
}

export default async function ProductsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { category?: string; search?: string }
}) {
  const t = await getTranslations()
  const products = await getProducts(searchParams.category, searchParams.search)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-rose-700 mb-2 font-display">
        {t('nav.all_products')}
      </h1>
      <p className="text-gray-500 mb-8 text-sm">
        {products.length} {locale === 'hi' ? 'उत्पाद मिले' : 'products found'}
      </p>
      <ProductsClient
        initialProducts={products as IProduct[]}
        locale={locale as 'hi' | 'en'}
        initialCategory={(searchParams.category as string) || 'all'}
      />
    </div>
  )
}
