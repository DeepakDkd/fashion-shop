import { getRequestConfig } from 'next-intl/server'

export const locales = ['hi', 'en'] as const
export const defaultLocale = 'hi' as const

export type Locale = (typeof locales)[number]

function isLocale(locale: string | undefined): locale is Locale {
  return locales.includes(locale as Locale)
}

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requestedLocale = locale ?? (await requestLocale)
  const resolvedLocale = isLocale(requestedLocale) ? requestedLocale : defaultLocale

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})
