import Link from 'next/link'
import { ArrowRightIcon, ChartBarIcon, GlobeAltIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { MarketOverview } from '@/components/common/MarketOverview'
import { IndexCards } from '@/components/common/IndexCards'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gradient">Indian Equity</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="btn-primary"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional
              <span className="text-gradient"> Indian Stock</span>
              <br />
              Trading Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Real-time charts, 100+ technical indicators, NSE & BSE integration, 
              and comprehensive market analysis for Indian equity markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
              >
                Start Trading
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/screener"
                className="btn-secondary text-lg px-8 py-3"
              >
                Explore Stocks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Live Market Overview
          </h2>
          <IndexCards />
          <MarketOverview />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Advanced Trading Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <ChartBarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Advanced Charting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time candlestick charts with 100+ technical indicators, 
                drawing tools, and multiple timeframes.
              </p>
            </div>
            <div className="card p-6 text-center">
              <GlobeAltIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Indian Markets</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete NSE & BSE integration with NIFTY, SENSEX, Bank Nifty, 
                and sectoral indices tracking.
              </p>
            </div>
            <div className="card p-6 text-center">
              <CurrencyDollarIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Portfolio Management</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced portfolio tracking, P&L analysis, risk metrics, 
                and performance analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Timings */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Indian Market Timings
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Regular Trading</h3>
              <p className="text-gray-600 dark:text-gray-300">9:15 AM - 3:30 PM IST</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monday to Friday</p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2 dark:text-white">Pre-Open Session</h3>
              <p className="text-gray-600 dark:text-gray-300">9:00 AM - 9:15 AM IST</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Order matching period</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <strong>SEBI Disclaimer:</strong> This platform is for educational and analysis purposes only. 
              Investment in securities market are subject to market risks.
            </p>
            <p>
              Read all the related documents carefully before investing. 
              Please consult your financial advisor before making any investment decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}