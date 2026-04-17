import Link from 'next/link'

interface CategoryGridProps {
  locale: 'hi' | 'en'
}

const CATEGORIES = [
  { slug: 'saree', icon: '🥻', hi: 'साड़ी', en: 'Sarees', color: 'from-pink-500 to-rose-500' },
  { slug: 'suit', icon: '👗', hi: 'सूट / चूड़ीदार', en: 'Suits', color: 'from-purple-500 to-pink-500' },
  { slug: 'blouse', icon: '👚', hi: 'ब्लाउज़', en: 'Blouses', color: 'from-orange-400 to-pink-500' },
  { slug: 'footwear', icon: '👡', hi: 'जूते', en: 'Footwear', color: 'from-rose-400 to-red-500' },
  { slug: 'other', icon: '✨', hi: 'अन्य', en: 'Others', color: 'from-yellow-400 to-orange-500' },
]

export default function CategoryGrid({ locale }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/${locale}/category/${cat.slug}`}
          className="group relative overflow-hidden rounded-2xl aspect-square flex flex-col items-center justify-center text-white shadow-md card-lift"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
          <div className="relative text-center p-4">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {cat.icon}
            </div>
            <div className="font-bold text-sm">
              {locale === 'hi' ? cat.hi : cat.en}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
