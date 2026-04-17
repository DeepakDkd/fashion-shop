import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <a href={`/${locale}/admin`} className="text-rose-600 hover:underline text-sm">
          ← {locale === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
        </a>
        <span className="text-gray-400">/</span>
        <h1 className="text-xl font-bold text-gray-800">
          {locale === 'hi' ? 'नया उत्पाद जोड़ें' : 'Add New Product'}
        </h1>
      </div>
      <ProductForm locale={locale as 'hi' | 'en'} />
    </div>
  )
}
