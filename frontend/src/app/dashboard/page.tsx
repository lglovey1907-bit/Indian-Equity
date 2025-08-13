import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { TradingChart } from '@/components/charts/TradingChart'
import { Watchlist } from '@/components/dashboard/Watchlist'
import { MarketDepthWidget } from '@/components/dashboard/MarketDepthWidget'
import { NewsWidget } from '@/components/dashboard/NewsWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trading Dashboard | Indian Equity Platform',
  description: 'Professional trading dashboard with real-time charts, watchlists, and market data.',
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Top Section - Overview */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <DashboardOverview />
        </div>

        {/* Main Trading Interface */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chart */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-6">
              <TradingChart />
            </div>
          </div>

          {/* Right Panel - Widgets */}
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Watchlist />
            </div>
            <div className="flex-1 p-4 border-b border-gray-200 dark:border-gray-700">
              <MarketDepthWidget />
            </div>
            <div className="p-4">
              <NewsWidget />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}