import { getTranslations } from 'next-intl/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import { ShopInfo } from '@/models/ShopInfo'
import HeroSection from '@/components/HeroSection'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGrid from '@/components/ProductGrid'
import ShopInfoSection from '@/components/ShopInfoSection'
import NewArrivals from '@/components/NewArrivals'
import { IProduct, IShopInfo } from '@/types'

async function getData(locale: string) {
  await connectDB()
  const [featuredProducts, newArrivals, shopInfo] = await Promise.all([
    Product.find({ featured: true, inStock: true }).sort({ createdAt: -1 }).limit(8).lean(),
    Product.find({ isNewArrival: true, inStock: true }).sort({ createdAt: -1 }).limit(8).lean(),
    ShopInfo.findOne().lean(),
  ])
  return {
    featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
    newArrivals: JSON.parse(JSON.stringify(newArrivals)),
    shopInfo: JSON.parse(JSON.stringify(shopInfo)),
  }
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('home')
  const { featuredProducts, newArrivals, shopInfo } = await getData(locale)

  return (
    <div>
      <HeroSection locale={locale as 'hi' | 'en'} />

      {/* Categories */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-rose-700 mb-6 text-center font-display">
          {t('categories_title')}
        </h2>
        <CategoryGrid locale={locale as 'hi' | 'en'} />
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-10 bg-rose-50 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-rose-700 mb-6 text-center font-display">
              {t('new_arrivals')}
            </h2>
            <NewArrivals products={newArrivals as IProduct[]} locale={locale as 'hi' | 'en'} />
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-10 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-rose-700 mb-6 text-center font-display">
            {t('featured_title')}
          </h2>
          <ProductGrid products={featuredProducts as IProduct[]} locale={locale as 'hi' | 'en'} />
          <div className="text-center mt-8">
            <a
              href={`/${locale}/products`}
              className="inline-block bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition-colors"
            >
              {t('browse_all')}
            </a>
          </div>
        </section>
      )}

      {/* Shop Info */}
      {shopInfo && (
        <section className="py-10 bg-gradient-to-br from-rose-600 to-rose-800 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center font-display">
              {t('shop_info_title')}
            </h2>
            <ShopInfoSection shopInfo={shopInfo as IShopInfo} locale={locale as 'hi' | 'en'} />
          </div>
        </section>
      )}
    </div>
  )
}
