'use client';

import { StockData } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockTickerProps {
  stocks: StockData[];
}

const StockTicker: React.FC<StockTickerProps> = ({ stocks }) => {
  return (
    <div className="bg-gray-900 text-white p-2">
      <div className="flex space-x-8 overflow-x-auto whitespace-nowrap animate-scroll">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center space-x-2 flex-shrink-0">
            <span className="font-medium">{stock.symbol}</span>
            <span className="text-lg">₹{stock.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${
              stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {stock.changePercent >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm">
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;