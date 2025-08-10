'use client';

import { StockData } from '@/types';

interface MarketIndicesProps {
  indices: {
    nifty50: StockData;
    sensex: StockData;
    bankNifty: StockData;
  };
}

const MarketIndices: React.FC<MarketIndicesProps> = ({ indices }) => {
  const indexList = [
    { key: 'nifty50', name: 'NIFTY 50', data: indices.nifty50 },
    { key: 'sensex', name: 'SENSEX', data: indices.sensex },
    { key: 'bankNifty', name: 'BANK NIFTY', data: indices.bankNifty },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Market Indices
      </h2>
      <div className="space-y-3">
        {indexList.map(({ key, name, data }) => (
          <div key={key} className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.price.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </div>
            <div className={`text-right ${
              data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <p className="text-lg font-semibold">
                {data.changePercent >= 0 ? '+' : ''}
                {data.change.toFixed(2)}
              </p>
              <p className="text-sm">
                ({data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketIndices;