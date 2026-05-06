import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Fashion Store | \u092B\u0948\u0936\u0928 \u0938\u094D\u091F\u094B\u0930',
  description: "Women's clothing and accessories - Sarees, Suits, Blouses, Footwear",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className="font-sans">
      <body>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
