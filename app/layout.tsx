import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fashion Store | फैशन स्टोर',
  description: 'Women\'s clothing and accessories - Sarees, Suits, Blouses, Footwear',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
