import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fashion Store | फैशन स्टोर',
  description: 'साड़ी, सूट, ब्लाउज़, जूते - Women\'s Fashion & Accessories',
  keywords: 'saree, suit, blouse, footwear, fashion, women, indore',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as 'hi' | 'en')) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fdf8f0]">
        <NextIntlClientProvider messages={messages}>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <Navbar locale={locale as 'hi' | 'en'} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as 'hi' | 'en'} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
