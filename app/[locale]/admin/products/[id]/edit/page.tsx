import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'
import { IProduct } from '@/types'

async function getProduct(id: string) {
  await connectDB()
  const product = await Product.findById(id).lean()
  return product ? JSON.parse(JSON.stringify(product)) : null
}

export default async function EditProductPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  const product = await getProduct(id)
  if (!product) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <a href={`/${locale}/admin`} className="text-rose-600 hover:underline text-sm">
          ← {locale === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
        </a>
        <span className="text-gray-400">/</span>
        <h1 className="text-xl font-bold text-gray-800">
          {locale === 'hi' ? 'उत्पाद संपादित करें' : 'Edit Product'}
        </h1>
      </div>
      <ProductForm locale={locale as 'hi' | 'en'} product={product as IProduct} />
    </div>
  )
}
