import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { IProduct } from '@/types'

async function getProducts() {
  await connectDB()
  const products = await Product.find({}).sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(products))
}

export default async function AdminPage({ params: { locale } }: { params: { locale: string } }) {
  const products = await getProducts()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {locale === 'hi' ? 'एडमिन डैशबोर्ड' : 'Admin Dashboard'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {locale === 'hi' ? `कुल ${products.length} उत्पाद` : `${products.length} total products`}
          </p>
        </div>
        <a
          href={`/${locale}/admin/products/new`}
          className="bg-rose-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center gap-2"
        >
          <span>+</span>
          {locale === 'hi' ? 'नया उत्पाद' : 'New Product'}
        </a>
      </div>
      <AdminDashboard products={products as IProduct[]} locale={locale as 'hi' | 'en'} />
    </div>
  )
}
