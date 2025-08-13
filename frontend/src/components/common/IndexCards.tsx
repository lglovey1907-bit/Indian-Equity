'use client'

import { useEffect, useState } from 'react'
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'
import { formatCurrency, formatPercent, getPercentColor } from '../../../../shared'
import type { Index } from '../../../../shared/types'

const mockIndices: Index[] = [
  {
    symbol: 'NIFTY',
    name: 'NIFTY 50',
    value: 21731.40,
    change: 142.75,
    changePercent: 0.66,
    high: 21753.20,
    low: 21588.65,
    previousClose: 21588.65,
    lastUpdated: new Date(),
  },
  {
    symbol: 'SENSEX',
    name: 'SENSEX',
    value: 72186.09,
    change: 364.41,
    changePercent: 0.51,
    high: 72244.70,
    low: 71821.68,
    previousClose: 71821.68,
    lastUpdated: new Date(),
  },
  {
    symbol: 'BANKNIFTY',
    name: 'Bank Nifty',
    value: 46376.25,
    change: -89.35,
    changePercent: -0.19,
    high: 46520.10,
    low: 46245.80,
    previousClose: 46465.60,
    lastUpdated: new Date(),
  },
  {
    symbol: 'NIFTYNEXT50',
    name: 'NIFTY Next 50',
    value: 68543.85,
    change: 298.45,
    changePercent: 0.44,
    high: 68675.20,
    low: 68245.40,
    previousClose: 68245.40,
    lastUpdated: new Date(),
  },
]

export function IndexCards() {
  const [indices, setIndices] = useState<Index[]>(mockIndices)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Simulate real-time updates
    const updateTimer = setInterval(() => {
      setIndices(prev => prev.map(index => ({
        ...index,
        value: index.value + (Math.random() - 0.5) * 20,
        change: index.change + (Math.random() - 0.5) * 5,
        changePercent: index.changePercent + (Math.random() - 0.5) * 0.5,
        lastUpdated: new Date(),
      })))
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(updateTimer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {indices.map((index) => (
        <div key={index.symbol} className="card p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">{index.name}</h3>
            {index.changePercent > 0 ? (
              <ArrowTrendingUpIcon className="h-5 w-5 text-success-600" />
            ) : (
              <ArrowTrendingDownIcon className="h-5 w-5 text-danger-600" />
            )}
          </div>
          
          <div className="mb-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {index.value.toLocaleString('en-IN', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>

          <div className={`flex items-center gap-2 text-sm ${getPercentColor(index.change)}`}>
            <span>
              {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
            </span>
            <span>({formatPercent(index.changePercent)})</span>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>High: {index.high.toFixed(2)}</span>
              <span>Low: {index.low.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}