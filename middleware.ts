import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Admin route protection
  if (pathname.includes('/admin')) {
    const auth = req.headers.get('authorization')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const validAuth = 'Basic ' + Buffer.from(`admin:${adminPassword}`).toString('base64')

    if (auth !== validAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Fashion Shop Admin", charset="UTF-8"',
          'Content-Type': 'text/plain',
        },
      })
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
