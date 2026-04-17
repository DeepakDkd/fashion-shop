import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '@/types'
import WhatsAppButton from './WhatsAppButton'

interface ProductCardProps {
  product: IProduct
  locale: 'hi' | 'en'
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const name = locale === 'hi' ? product.name_hi : product.name_en
  const desc = locale === 'hi' ? product.desc_hi : product.desc_en
  const image = product.images?.[0] || 'https://placehold.co/400x500/fce7f3/be185d?text=No+Image'

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-rose-100 card-lift flex flex-col">
      {/* Image */}
      <Link href={`/${locale}/products/${product.slug}`} className="relative block overflow-hidden aspect-[3/4]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {locale === 'hi' ? 'नया' : 'New'}
            </span>
          )}
          {product.featured && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {locale === 'hi' ? 'खास' : 'Featured'}
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {locale === 'hi' ? 'उपलब्ध नहीं' : 'Out of Stock'}
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <Link href={`/${locale}/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 hover:text-rose-600 transition-colors">
            {name}
          </h3>
        </Link>
        {desc && (
          <p className="text-gray-400 text-xs line-clamp-2">{desc}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-rose-50">
          <div>
            <span className="text-rose-600 font-bold text-base">₹{product.price.toLocaleString('hi-IN')}</span>
            {product.price_label && (
              <span className="text-gray-400 text-xs ml-1">{product.price_label}</span>
            )}
          </div>
        </div>
        <WhatsAppButton product={product} locale={locale} size="sm" />
      </div>
    </div>
  )
}
