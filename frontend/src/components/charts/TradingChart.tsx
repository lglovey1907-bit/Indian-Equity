'use client'

import { useState, useEffect, useRef } from 'react'
import { createChart, IChartApi, ColorType } from 'lightweight-charts'

export function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const [selectedSymbol, setSelectedSymbol] = useState('RELIANCE')
  const [timeframe, setTimeframe] = useState('1D')

  // Mock OHLCV data
  const mockData = [
    { time: '2024-01-01', open: 2700, high: 2750, low: 2680, close: 2735, volume: 1500000 },
    { time: '2024-01-02', open: 2735, high: 2760, low: 2720, close: 2745, volume: 1200000 },
    { time: '2024-01-03', open: 2745, high: 2770, low: 2730, close: 2755, volume: 1800000 },
    { time: '2024-01-04', open: 2755, high: 2780, low: 2740, close: 2765, volume: 1600000 },
    { time: '2024-01-05', open: 2765, high: 2790, low: 2750, close: 2775, volume: 1400000 },
  ]

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        borderColor: '#374151',
      },
      rightPriceScale: {
        borderColor: '#374151',
      },
    })

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10B981',
      downColor: '#EF4444',
      borderUpColor: '#10B981',
      borderDownColor: '#EF4444',
      wickUpColor: '#10B981',
      wickDownColor: '#EF4444',
    })

    const volumeSeries = chart.addHistogramSeries({
      color: '#6B7280',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    })

    // Set price scale for volume
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    candlestickSeries.setData(mockData)
    volumeSeries.setData(mockData.map(d => ({ time: d.time, value: d.volume, color: d.close > d.open ? '#10B981' : '#EF4444' })))

    chartRef.current = chart

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [])

  const timeframes = ['1m', '5m', '15m', '1h', '1D', '1W', '1M']
  const symbols = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK']

  return (
    <div className="card p-6 h-full flex flex-col">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="input px-3 py-2 text-sm min-w-0 w-32"
          >
            {symbols.map(symbol => (
              <option key={symbol} value={symbol}>{symbol}</option>
            ))}
          </select>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            NSE • ₹2,735.60 • <span className="text-success-600">+15.45 (+0.57%)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeframe === tf
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 min-h-0">
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>

      {/* Chart Tools */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Indicators
            </button>
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Drawing Tools
            </button>
            <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Settings
            </button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}