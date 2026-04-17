import Link from 'next/link'
import { buildGeneralWhatsAppLink } from '@/lib/whatsapp'

interface FooterProps {
  locale: 'hi' | 'en'
}

export default function Footer({ locale }: FooterProps) {
  const whatsapp = process.env.NEXT_PUBLIC_SHOP_WHATSAPP || '919876543210'
  const waLink = buildGeneralWhatsAppLink(whatsapp, locale)

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌸</span>
            <span className="text-white font-bold text-lg font-display">
              {locale === 'hi' ? 'श्रृंगार फैशन' : 'Shringar Fashion'}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {locale === 'hi'
              ? 'महिलाओं के लिए बेहतरीन साड़ी, सूट, ब्लाउज़ और जूते।'
              : 'Premium sarees, suits, blouses & footwear for women.'}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {locale === 'hi' ? 'WhatsApp पर बात करें' : 'Chat on WhatsApp'}
          </a>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            {locale === 'hi' ? 'श्रेणियाँ' : 'Categories'}
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/category/saree', hi: 'साड़ी', en: 'Sarees' },
              { href: '/category/suit', hi: 'सूट / चूड़ीदार', en: 'Suits / Chudidar' },
              { href: '/category/blouse', hi: 'ब्लाउज़', en: 'Blouses' },
              { href: '/category/footwear', hi: 'जूते', en: 'Footwear' },
              { href: '/category/other', hi: 'अन्य', en: 'Others' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="hover:text-rose-400 transition-colors"
                >
                  {locale === 'hi' ? item.hi : item.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span>📍</span>
              <span>{locale === 'hi' ? 'इंदौर, मध्यप्रदेश' : 'Indore, Madhya Pradesh'}</span>
            </p>
            <p className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+919876543210" className="hover:text-rose-400">+91 98765 43210</a>
            </p>
            <p className="flex items-center gap-2">
              <span>🕐</span>
              <span>{locale === 'hi' ? 'सोम–शनि: 10am – 8pm' : 'Mon–Sat: 10am – 8pm'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {locale === 'hi' ? 'श्रृंगार फैशन। सर्वाधिकार सुरक्षित।' : 'Shringar Fashion. All rights reserved.'}
      </div>
    </footer>
  )
}
