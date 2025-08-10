'use client';

import { useEffect, useState } from 'react';
import TradingChart from '@/components/charts/TradingChart';
import StockTicker from '@/components/ui/StockTicker';
import MarketIndices from '@/components/ui/MarketIndices';
import useWebSocket from '@/hooks/useWebSocket';
import { MarketData } from '@/types';
import { BarChart3, Wifi, WifiOff } from 'lucide-react';

export default function Home() {
  const [selectedStock] = useState('RELIANCE');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentTime, setCurrentTime] = useState('');
  
  // WebSocket connection for real-time data
  const { data: marketData, isConnected } = useWebSocket('ws://localhost:3001/ws');
  
  // Fallback data loading
  const [fallbackData, setFallbackData] = useState<MarketData | null>(null);
  
  // Update time every second to avoid hydration mismatch
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Load initial data if WebSocket is not connected
    if (!isConnected && !marketData && !fallbackData) {
      fetch('/api/market/data')
        .then(res => res.json())
        .then(data => setFallbackData(data.data))
        .catch(console.error);
    }
  }, [isConnected, marketData, fallbackData]);

  const currentData = marketData || fallbackData;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Indian Equity Platform
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                {isConnected ? 'Live' : 'Disconnected'}
              </div>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stock Ticker */}
      {currentData?.stocks && (
        <StockTicker stocks={currentData.stocks} />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedStock} - Live Chart
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                    1m
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 rounded">
                    5m
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 rounded">
                    15m
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 rounded">
                    1D
                  </button>
                </div>
              </div>
              
              {currentData?.candlestickData ? (
                <TradingChart 
                  data={currentData.candlestickData}
                  height={500}
                  theme={theme}
                />
              ) : (
                <div className="h-[500px] flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading chart data...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Indices */}
            {currentData?.indices && (
              <MarketIndices indices={currentData.indices} />
            )}

            {/* Top Stocks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Stocks
              </h2>
              <div className="space-y-3">
                {currentData?.stocks?.slice(0, 5).map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{stock.symbol}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ₹{stock.price.toFixed(2)}
                      </p>
                      <p className={`text-sm ${
                        stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Market Status
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Market Status</span>
                  <span className="font-medium text-green-600">OPEN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {currentTime || '--:--:--'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Connection</span>
                  <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                    {isConnected ? 'Real-time' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
