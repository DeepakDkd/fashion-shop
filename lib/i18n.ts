import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['hi', 'en'] as const
export const defaultLocale = 'hi' as const

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as 'hi' | 'en')) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
