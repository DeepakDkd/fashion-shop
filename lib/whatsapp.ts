interface WhatsAppParams {
  phone: string
  productName: string
  price: number
  slug: string
  lang?: 'hi' | 'en'
}

export function buildWhatsAppLink({
  phone,
  productName,
  price,
  slug,
  lang = 'hi',
}: WhatsAppParams): string {
  const message =
    lang === 'hi'
      ? `नमस्ते! मुझे यह उत्पाद चाहिए:\n*${productName}*\nकीमत: ₹${price}\nRef: ${slug}\n\nकृपया उपलब्धता बताएं।`
      : `Hello! I'm interested in:\n*${productName}*\nPrice: ₹${price}\nRef: ${slug}\n\nPlease let me know about availability.`

  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export function buildGeneralWhatsAppLink(phone: string, lang: 'hi' | 'en' = 'hi'): string {
  const message =
    lang === 'hi'
      ? 'नमस्ते! मुझे आपके उत्पादों के बारे में जानना है।'
      : 'Hello! I would like to know about your products.'
  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
