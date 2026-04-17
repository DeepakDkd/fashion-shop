import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import { ShopInfo } from '@/models/ShopInfo'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'
import ProductGrid from '@/components/ProductGrid'
import { IProduct, IShopInfo } from '@/types'
import type { Metadata } from 'next'

async function getProduct(slug: string) {
  await connectDB()
  const product = await Product.findOne({ slug }).lean()
  return product ? JSON.parse(JSON.stringify(product)) : null
}

async function getRelated(category: string, currentSlug: string) {
  await connectDB()
  const products = await Product.find({ category, slug: { $ne: currentSlug }, inStock: true })
    .limit(4)
    .lean()
  return JSON.parse(JSON.stringify(products))
}

async function getShopInfo() {
  await connectDB()
  const info = await ShopInfo.findOne().lean()
  return info ? JSON.parse(JSON.stringify(info)) : null
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name_en} | Fashion Store`,
    description: product.desc_en || product.name_en,
    openGraph: { images: product.images[0] ? [product.images[0]] : [] },
  }
}

export default async function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  const [product, shopInfo] = await Promise.all([getProduct(slug), getShopInfo()])

  if (!product) notFound()

  const related = await getRelated(product.category, product.slug)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProductDetail
        product={product as IProduct}
        shopInfo={shopInfo as IShopInfo}
        locale={locale as 'hi' | 'en'}
      />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-rose-700 mb-6 font-display">
            {locale === 'hi' ? 'मिलते-जुलते उत्पाद' : 'Similar Products'}
          </h2>
          <ProductGrid products={related as IProduct[]} locale={locale as 'hi' | 'en'} />
        </section>
      )}
    </div>
  )
}
