'use client'

import { useState } from 'react'
import { PlusIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { formatCurrency, formatPercent, getPercentColor } from '../../../../shared'

const mockWatchlistStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2735.60, change: 15.45, changePercent: 0.57 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3645.25, change: 13.45, changePercent: 0.37 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1542.75, change: 4.55, changePercent: 0.30 },
  { symbol: 'INFY', name: 'Infosys', price: 1671.30, change: 6.45, changePercent: 0.39 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1182.45, change: 7.25, changePercent: 0.62 },
]

export function Watchlist() {
  const [stocks, setStocks] = useState(mockWatchlistStocks)
  const [favorites, setFavorites] = useState(new Set(['RELIANCE', 'TCS']))

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(symbol)) {
      newFavorites.delete(symbol)
    } else {
      newFavorites.add(symbol)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Watchlist</h3>
        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="space-y-2">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <button
                    onClick={() => toggleFavorite(stock.symbol)}
                    className="p-1 text-gray-400 hover:text-yellow-500"
                  >
                    {favorites.has(stock.symbol) ? (
                      <StarIconSolid className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <StarIcon className="h-4 w-4" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {stock.symbol}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {stock.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    ₹{stock.price.toFixed(2)}
                  </div>
                  <div className={`text-xs ${getPercentColor(stock.changePercent)}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({formatPercent(stock.changePercent)})
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}