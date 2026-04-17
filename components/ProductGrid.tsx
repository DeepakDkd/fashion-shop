import { IProduct } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: IProduct[]
  locale: 'hi' | 'en'
}

export default function ProductGrid({ products, locale }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-5xl mb-4">🛍️</p>
        <p className="text-lg">
          {locale === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} locale={locale} />
      ))}
    </div>
  )
}
