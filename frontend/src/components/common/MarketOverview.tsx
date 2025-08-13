'use client'

import { useEffect, useState } from 'react'
import { formatPercent, getPercentColor } from '../../../../shared'
import type { Stock } from '../../../../shared/types'

const mockStocks: Stock[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    sector: 'Oil & Gas',
    industry: 'Refineries',
    marketCap: 1825000000000,
    currentPrice: 2735.60,
    previousClose: 2720.15,
    change: 15.45,
    changePercent: 0.57,
    volume: 2450000,
    avgVolume: 2100000,
    high: 2741.20,
    low: 2718.30,
    dayHigh: 2741.20,
    dayLow: 2718.30,
    fiftyTwoWeekHigh: 2968.95,
    fiftyTwoWeekLow: 2220.30,
    pe: 25.4,
    pb: 2.1,
    eps: 107.8,
    dividend: 8.0,
    dividendYield: 0.29,
    lastUpdated: new Date(),
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    exchange: 'NSE',
    sector: 'Information Technology',
    industry: 'IT Services',
    marketCap: 1342000000000,
    currentPrice: 3645.25,
    previousClose: 3631.80,
    change: 13.45,
    changePercent: 0.37,
    volume: 1850000,
    avgVolume: 1650000,
    high: 3652.90,
    low: 3628.45,
    dayHigh: 3652.90,
    dayLow: 3628.45,
    fiftyTwoWeekHigh: 4043.50,
    fiftyTwoWeekLow: 3000.25,
    pe: 28.7,
    pb: 12.3,
    eps: 127.2,
    dividend: 27.0,
    dividendYield: 0.74,
    lastUpdated: new Date(),
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Banks',
    marketCap: 1156000000000,
    currentPrice: 1542.75,
    previousClose: 1538.20,
    change: 4.55,
    changePercent: 0.30,
    volume: 3200000,
    avgVolume: 2900000,
    high: 1546.80,
    low: 1535.40,
    dayHigh: 1546.80,
    dayLow: 1535.40,
    fiftyTwoWeekHigh: 1794.20,
    fiftyTwoWeekLow: 1363.55,
    pe: 18.2,
    pb: 2.8,
    eps: 84.7,
    dividend: 19.0,
    dividendYield: 1.23,
    lastUpdated: new Date(),
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd',
    exchange: 'NSE',
    sector: 'Information Technology',
    industry: 'IT Services',
    marketCap: 695000000000,
    currentPrice: 1671.30,
    previousClose: 1664.85,
    change: 6.45,
    changePercent: 0.39,
    volume: 2100000,
    avgVolume: 1900000,
    high: 1675.20,
    low: 1662.10,
    dayHigh: 1675.20,
    dayLow: 1662.10,
    fiftyTwoWeekHigh: 1953.90,
    fiftyTwoWeekLow: 1351.65,
    pe: 22.8,
    pb: 7.9,
    eps: 73.3,
    dividend: 20.0,
    dividendYield: 1.20,
    lastUpdated: new Date(),
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Banks',
    marketCap: 823000000000,
    currentPrice: 1182.45,
    previousClose: 1175.20,
    change: 7.25,
    changePercent: 0.62,
    volume: 4100000,
    avgVolume: 3800000,
    high: 1186.75,
    low: 1172.30,
    dayHigh: 1186.75,
    dayLow: 1172.30,
    fiftyTwoWeekHigh: 1257.80,
    fiftyTwoWeekLow: 898.35,
    pe: 16.7,
    pb: 2.9,
    eps: 70.8,
    dividend: 10.0,
    dividendYield: 0.85,
    lastUpdated: new Date(),
  },
]

export function MarketOverview() {
  const [topGainers, setTopGainers] = useState<Stock[]>([])
  const [topLosers, setTopLosers] = useState<Stock[]>([])
  const [mostActive, setMostActive] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Sort mock data for different categories
      const gainers = [...mockStocks]
        .sort((a, b) => b.changePercent - a.changePercent)
        .slice(0, 5)
      
      // Create losers by modifying some stocks to have negative changes
      const losers = mockStocks.map((stock, index) => ({
        ...stock,
        change: index < 3 ? -Math.abs(stock.change) : stock.change,
        changePercent: index < 3 ? -Math.abs(stock.changePercent) : stock.changePercent,
      })).filter(stock => stock.changePercent < 0).slice(0, 5)
      
      const active = [...mockStocks]
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 5)

      setTopGainers(gainers)
      setTopLosers(losers)
      setMostActive(active)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const renderStockList = (stocks: Stock[], title: string) => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{stock.symbol}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {stock.name.length > 25 ? `${stock.name.substring(0, 25)}...` : stock.name}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900 dark:text-white">
                  ₹{stock.currentPrice.toFixed(2)}
                </div>
                <div className={`text-sm ${getPercentColor(stock.changePercent)}`}>
                  {formatPercent(stock.changePercent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {renderStockList(topGainers, 'Top Gainers')}
      {renderStockList(topLosers, 'Top Losers')}
      {renderStockList(mostActive, 'Most Active')}
    </div>
  )
}