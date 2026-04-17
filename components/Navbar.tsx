'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface NavbarProps {
  locale: 'hi' | 'en'
}

const NAV_LINKS = {
  hi: [
    { label: 'होम', href: '/' },
    { label: 'साड़ी', href: '/category/saree' },
    { label: 'सूट', href: '/category/suit' },
    { label: 'ब्लाउज़', href: '/category/blouse' },
    { label: 'जूते', href: '/category/footwear' },
    { label: 'सभी उत्पाद', href: '/products' },
  ],
  en: [
    { label: 'Home', href: '/' },
    { label: 'Sarees', href: '/category/saree' },
    { label: 'Suits', href: '/category/suit' },
    { label: 'Blouses', href: '/category/blouse' },
    { label: 'Footwear', href: '/category/footwear' },
    { label: 'All Products', href: '/products' },
  ],
}

export default function Navbar({ locale }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = () => {
    const newLocale = locale === 'hi' ? 'en' : 'hi'
    // Replace current locale in path
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const links = NAV_LINKS[locale]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top strip */}
      <div className="bg-rose-600 text-white text-xs text-center py-1 px-4">
        {locale === 'hi'
          ? '📞 WhatsApp पर ऑर्डर करें | मुफ्त होम डिलीवरी उपलब्ध'
          : '📞 Order on WhatsApp | Free Home Delivery Available'}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <div>
              <div className="text-rose-700 font-bold text-lg leading-tight font-display">
                {locale === 'hi' ? 'श्रृंगार फैशन' : 'Shringar Fashion'}
              </div>
              <div className="text-gray-400 text-xs leading-tight">
                {locale === 'hi' ? 'महिला फैशन स्टोर' : "Women's Fashion Store"}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-gray-700 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={switchLocale}
              className="flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-rose-100 transition-colors"
            >
              <span>{locale === 'hi' ? '🇮🇳 हिं' : '🌐 EN'}</span>
              <span className="text-rose-400">↔</span>
              <span>{locale === 'hi' ? 'EN' : 'हिं'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-rose-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="block text-gray-700 hover:text-rose-600 hover:bg-rose-50 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
