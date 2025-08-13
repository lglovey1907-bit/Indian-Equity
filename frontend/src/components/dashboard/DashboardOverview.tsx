'use client'

import { useState, useEffect } from 'react'
import { formatCurrency, formatPercent, getPercentColor } from '../../../../shared'
import type { Portfolio, Index } from '../../../../shared/types'

const mockPortfolio: Portfolio = {
  id: '1',
  userId: '1',
  name: 'My Portfolio',
  holdings: [],
  totalValue: 125000,
  totalInvested: 120000,
  totalPnL: 5000,
  totalPnLPercent: 4.17,
  dayPnL: 1250,
  dayPnLPercent: 1.01,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockIndices = [
  { symbol: 'NIFTY', name: 'NIFTY 50', value: 21731.40, changePercent: 0.66 },
  { symbol: 'SENSEX', name: 'SENSEX', value: 72186.09, changePercent: 0.51 },
  { symbol: 'BANKNIFTY', name: 'Bank Nifty', value: 46376.25, changePercent: -0.19 },
]

export function DashboardOverview() {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio)
  const [indices, setIndices] = useState(mockIndices)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Portfolio Summary */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Portfolio Overview
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              IST: {formatTime(currentTime)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Value</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolio.totalValue)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Invested</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolio.totalInvested)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall P&L</div>
              <div className={`text-xl font-bold ${getPercentColor(portfolio.totalPnL)}`}>
                {formatCurrency(portfolio.totalPnL)} ({formatPercent(portfolio.totalPnLPercent)})
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day P&L</div>
              <div className={`text-xl font-bold ${getPercentColor(portfolio.dayPnL)}`}>
                {formatCurrency(portfolio.dayPnL)} ({formatPercent(portfolio.dayPnLPercent)})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Market View */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Market Indices
          </h3>
          <div className="space-y-3">
            {indices.map((index) => (
              <div key={index.symbol} className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {index.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {index.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {index.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm ${getPercentColor(index.changePercent)}`}>
                    {formatPercent(index.changePercent)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}