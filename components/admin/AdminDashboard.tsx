'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IProduct } from '@/types'
import toast from 'react-hot-toast'

interface AdminDashboardProps {
  products: IProduct[]
  locale: 'hi' | 'en'
}

const CATEGORY_LABELS: Record<string, { hi: string; en: string }> = {
  saree: { hi: 'साड़ी', en: 'Saree' },
  suit: { hi: 'सूट', en: 'Suit' },
  blouse: { hi: 'ब्लाउज़', en: 'Blouse' },
  footwear: { hi: 'जूते', en: 'Footwear' },
  other: { hi: 'अन्य', en: 'Other' },
}

export default function AdminDashboard({ products: initialProducts, locale }: AdminDashboardProps) {
  const [products, setProducts] = useState(initialProducts)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = products.filter((p) =>
    p.name_hi.includes(search) || p.name_en.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      locale === 'hi'
        ? `क्या आप "${name}" को हटाना चाहते हैं?`
        : `Are you sure you want to delete "${name}"?`
    )
    if (!confirmed) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id))
        toast.success(locale === 'hi' ? 'उत्पाद हटाया गया!' : 'Product deleted!')
      } else {
        toast.error(locale === 'hi' ? 'कुछ गलत हुआ' : 'Something went wrong')
      }
    } catch {
      toast.error('Error')
    } finally {
      setDeleting(null)
    }
  }

  const toggleFeatured = async (product: IProduct) => {
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !product.featured }),
      })
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, featured: !p.featured } : p))
        )
      }
    } catch {
      toast.error('Error')
    }
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: locale === 'hi' ? 'कुल उत्पाद' : 'Total Products', value: products.length, icon: '🛍️' },
          { label: locale === 'hi' ? 'खास उत्पाद' : 'Featured', value: products.filter((p) => p.featured).length, icon: '⭐' },
          { label: locale === 'hi' ? 'नई आमद' : 'New Arrivals', value: products.filter((p) => p.isNewArrival).length, icon: '✨' },
          { label: locale === 'hi' ? 'उपलब्ध' : 'In Stock', value: products.filter((p) => p.inStock).length, icon: '✅' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-rose-100 shadow-sm">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-rose-600">{stat.value}</div>
            <div className="text-gray-500 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={locale === 'hi' ? 'उत्पाद खोजें...' : 'Search products...'}
        className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-rose-300"
      />

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-rose-50 border-b border-rose-100">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-600">
                  {locale === 'hi' ? 'उत्पाद' : 'Product'}
                </th>
                <th className="text-left p-4 font-semibold text-gray-600 hidden sm:table-cell">
                  {locale === 'hi' ? 'श्रेणी' : 'Category'}
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  {locale === 'hi' ? 'कीमत' : 'Price'}
                </th>
                <th className="text-left p-4 font-semibold text-gray-600 hidden md:table-cell">
                  {locale === 'hi' ? 'खास' : 'Featured'}
                </th>
                <th className="text-right p-4 font-semibold text-gray-600">
                  {locale === 'hi' ? 'कार्य' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {filtered.map((product) => {
                const name = locale === 'hi' ? product.name_hi : product.name_en
                const catLabel = CATEGORY_LABELS[product.category]
                const img = product.images?.[0] || 'https://placehold.co/60x75/fce7f3/be185d?text=?'

                return (
                  <tr key={product._id} className="hover:bg-rose-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-rose-50">
                          <Image src={img} alt={name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm line-clamp-1">{name}</p>
                          <p className="text-gray-400 text-xs">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full font-medium">
                        {locale === 'hi' ? catLabel.hi : catLabel.en}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-rose-600">
                      ₹{product.price.toLocaleString('hi-IN')}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <button
                        onClick={() => toggleFeatured(product)}
                        className={`text-lg transition-transform hover:scale-110 ${product.featured ? 'opacity-100' : 'opacity-30'}`}
                        title={product.featured ? 'Remove featured' : 'Mark featured'}
                      >
                        ⭐
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/${locale}/admin/products/${product._id}/edit`}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {locale === 'hi' ? 'संपादित करें' : 'Edit'}
                        </a>
                        <button
                          onClick={() => handleDelete(product._id, name)}
                          disabled={deleting === product._id}
                          className="bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {deleting === product._id
                            ? '...'
                            : locale === 'hi' ? 'हटाएं' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-3xl mb-2">📦</p>
              <p>{locale === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
