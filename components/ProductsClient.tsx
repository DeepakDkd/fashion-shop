'use client'

import { useState, useMemo } from 'react'
import { IProduct, ProductCategory } from '@/types'
import ProductGrid from './ProductGrid'

interface ProductsClientProps {
  initialProducts: IProduct[]
  locale: 'hi' | 'en'
  initialCategory: string
}

const CATEGORIES = [
  { slug: 'all', hi: 'सभी', en: 'All' },
  { slug: 'saree', hi: 'साड़ी', en: 'Sarees' },
  { slug: 'suit', hi: 'सूट / चूड़ीदार', en: 'Suits' },
  { slug: 'blouse', hi: 'ब्लाउज़', en: 'Blouses' },
  { slug: 'footwear', hi: 'जूते', en: 'Footwear' },
  { slug: 'other', hi: 'अन्य', en: 'Others' },
]

export default function ProductsClient({
  initialProducts,
  locale,
  initialCategory,
}: ProductsClientProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory>(
    (initialCategory as ProductCategory) || 'all'
  )

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchCat = category === 'all' || p.category === category
      const searchLower = search.toLowerCase()
      const matchSearch =
        !search ||
        p.name_hi.includes(search) ||
        p.name_en.toLowerCase().includes(searchLower) ||
        (p.desc_hi || '').includes(search) ||
        (p.desc_en || '').toLowerCase().includes(searchLower)
      return matchCat && matchSearch
    })
  }, [initialProducts, category, search])

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === 'hi' ? 'उत्पाद खोजें...' : 'Search products...'}
          className="w-full border border-rose-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug as ProductCategory)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              category === cat.slug
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white text-gray-600 border-rose-200 hover:border-rose-400'
            }`}
          >
            {locale === 'hi' ? cat.hi : cat.en}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 mb-4">
        {filtered.length} {locale === 'hi' ? 'उत्पाद' : 'products'}
      </p>

      <ProductGrid products={filtered} locale={locale} />
    </div>
  )
}
