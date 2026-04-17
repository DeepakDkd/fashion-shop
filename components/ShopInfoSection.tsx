import { IShopInfo } from '@/types'
import { buildGeneralWhatsAppLink } from '@/lib/whatsapp'

interface ShopInfoSectionProps {
  shopInfo: IShopInfo
  locale: 'hi' | 'en'
}

export default function ShopInfoSection({ shopInfo, locale }: ShopInfoSectionProps) {
  const waLink = buildGeneralWhatsAppLink(shopInfo.whatsapp || '919876543210', locale)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          icon: '📍',
          label: locale === 'hi' ? 'पता' : 'Address',
          value: shopInfo.address,
          href: shopInfo.mapLink || undefined,
        },
        {
          icon: '📞',
          label: locale === 'hi' ? 'फोन' : 'Phone',
          value: shopInfo.phone,
          href: `tel:${shopInfo.phone}`,
        },
        {
          icon: '🕐',
          label: locale === 'hi' ? 'समय' : 'Hours',
          value: shopInfo.hours,
        },
        {
          icon: '💬',
          label: 'WhatsApp',
          value: locale === 'hi' ? 'अभी मैसेज करें' : 'Message Now',
          href: waLink,
        },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white"
        >
          <div className="text-2xl mb-2">{item.icon}</div>
          <div className="text-white/70 text-xs mb-1">{item.label}</div>
          {item.href ? (
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="font-semibold text-sm hover:text-yellow-300 transition-colors"
            >
              {item.value}
            </a>
          ) : (
            <p className="font-semibold text-sm">{item.value}</p>
          )}
        </div>
      ))}
    </div>
  )
}
