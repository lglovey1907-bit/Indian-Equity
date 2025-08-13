import '../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Indian Equity Trading Platform',
  description: 'Professional Indian stock trading platform with real-time charts, technical analysis, and market data for NSE and BSE.',
  keywords: ['Indian stocks', 'NSE', 'BSE', 'NIFTY', 'SENSEX', 'trading', 'equity', 'charts', 'technical analysis'],
  authors: [{ name: 'Indian Equity Platform' }],
  creator: 'Indian Equity Platform',
  publisher: 'Indian Equity Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}