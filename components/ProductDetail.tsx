'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct, IShopInfo } from '@/types'
import WhatsAppButton from './WhatsAppButton'

interface ProductDetailProps {
  product: IProduct
  shopInfo: IShopInfo | null
  locale: 'hi' | 'en'
}

const CATEGORY_LABELS: Record<string, { hi: string; en: string }> = {
  saree: { hi: 'साड़ी', en: 'Saree' },
  suit: { hi: 'सूट / चूड़ीदार', en: 'Suit / Chudidar' },
  blouse: { hi: 'ब्लाउज़', en: 'Blouse' },
  footwear: { hi: 'जूते', en: 'Footwear' },
  other: { hi: 'अन्य', en: 'Other' },
}

export default function ProductDetail({ product, shopInfo, locale }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = product.images?.length
    ? product.images
    : ['https://placehold.co/600x750/fce7f3/be185d?text=No+Image']

  const name = locale === 'hi' ? product.name_hi : product.name_en
  const desc = locale === 'hi' ? product.desc_hi : product.desc_en
  const catLabel = CATEGORY_LABELS[product.category]

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href={`/${locale}`} className="hover:text-rose-600">{locale === 'hi' ? 'होम' : 'Home'}</Link>
        <span>/</span>
        <Link href={`/${locale}/products`} className="hover:text-rose-600">{locale === 'hi' ? 'उत्पाद' : 'Products'}</Link>
        <span>/</span>
        <Link href={`/${locale}/category/${product.category}`} className="hover:text-rose-600">
          {locale === 'hi' ? catLabel.hi : catLabel.en}
        </Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-[150px]">{name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-rose-50 mb-3">
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNewArrival && (
                <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {locale === 'hi' ? '✨ नई आमद' : '✨ New Arrival'}
                </span>
              )}
              {product.featured && (
                <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {locale === 'hi' ? '⭐ खास' : '⭐ Featured'}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-rose-500' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          {/* Category */}
          <Link
            href={`/${locale}/category/${product.category}`}
            className="text-rose-500 text-sm font-semibold hover:underline"
          >
            {locale === 'hi' ? catLabel.hi : catLabel.en}
          </Link>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-display leading-snug">
            {name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-600">
              ₹{product.price.toLocaleString('hi-IN')}
            </span>
            {product.price_label && (
              <span className="text-gray-400 text-sm">{product.price_label}</span>
            )}
          </div>

          {/* Stock */}
          <div className={`inline-flex items-center gap-1.5 text-sm font-semibold w-fit ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
            {product.inStock
              ? (locale === 'hi' ? 'उपलब्ध है' : 'In Stock')
              : (locale === 'hi' ? 'उपलब्ध नहीं' : 'Out of Stock')}
          </div>

          {/* Description */}
          {desc && (
            <div className="bg-rose-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-1 text-sm">
                {locale === 'hi' ? 'विवरण' : 'Description'}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="pt-2">
            <WhatsAppButton product={product} locale={locale} size="lg" />
            <p className="text-center text-xs text-gray-400 mt-2">
              {locale === 'hi'
                ? 'बटन दबाएं और WhatsApp पर सीधे संपर्क करें'
                : 'Press the button to contact us directly on WhatsApp'}
            </p>
          </div>

          {/* Shop Info */}
          {shopInfo && (
            <div className="border border-rose-100 rounded-xl p-4 mt-2 bg-white">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm">
                {locale === 'hi' ? '🏪 दुकान की जानकारी' : '🏪 Shop Info'}
              </h3>
              <div className="space-y-1.5 text-sm text-gray-500">
                <p>📍 {shopInfo.address}</p>
                <p>📞 <a href={`tel:${shopInfo.phone}`} className="hover:text-rose-600">{shopInfo.phone}</a></p>
                <p>🕐 {shopInfo.hours}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
