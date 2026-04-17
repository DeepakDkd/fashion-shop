import { IProduct } from '@/types'
import ProductCard from './ProductCard'

interface NewArrivalsProps {
  products: IProduct[]
  locale: 'hi' | 'en'
}

export default function NewArrivals({ products, locale }: NewArrivalsProps) {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((product) => (
          <div key={product._id} className="snap-start flex-shrink-0 w-48 sm:w-56">
            <ProductCard product={product} locale={locale} />
          </div>
        ))}
      </div>
    </div>
  )
}
