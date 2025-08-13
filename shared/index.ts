// Re-export all shared types for easy importing
export * from './types';

// Utility functions that can be shared between frontend and backend
export const formatCurrency = (amount: number, currency = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + ' K';
  }
  return num.toString();
};

export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const getPercentColor = (value: number): string => {
  if (value > 0) return 'text-success-600';
  if (value < 0) return 'text-danger-600';
  return 'text-gray-600';
};

export const isMarketOpen = (): boolean => {
  const now = new Date();
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const day = istTime.getDay();
  
  // Market is closed on weekends
  if (day === 0 || day === 6) return false;
  
  // Market hours: 9:15 AM to 3:30 PM IST
  const marketStartTime = 9 * 60 + 15; // 9:15 AM in minutes
  const marketEndTime = 15 * 60 + 30; // 3:30 PM in minutes
  const currentTime = hours * 60 + minutes;
  
  return currentTime >= marketStartTime && currentTime <= marketEndTime;
};

export const getMarketStatus = (): 'open' | 'closed' | 'pre-open' | 'post-close' => {
  const now = new Date();
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const hours = istTime.getHours();
  const minutes = istTime.getMinutes();
  const day = istTime.getDay();
  
  if (day === 0 || day === 6) return 'closed';
  
  const currentTime = hours * 60 + minutes;
  const preOpenStart = 9 * 60; // 9:00 AM
  const marketStart = 9 * 60 + 15; // 9:15 AM
  const marketEnd = 15 * 60 + 30; // 3:30 PM
  
  if (currentTime >= preOpenStart && currentTime < marketStart) return 'pre-open';
  if (currentTime >= marketStart && currentTime <= marketEnd) return 'open';
  if (currentTime > marketEnd) return 'post-close';
  
  return 'closed';
};

export const calculateChange = (current: number, previous: number) => {
  const change = current - previous;
  const changePercent = previous !== 0 ? (change / previous) * 100 : 0;
  return { change, changePercent };
};

export const validateSymbol = (symbol: string): boolean => {
  // Basic validation for Indian stock symbols
  return /^[A-Z0-9&-]{1,20}$/.test(symbol);
};

export const getTimeframeDuration = (timeframe: string): number => {
  const durations: Record<string, number> = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
    '1w': 7 * 24 * 60 * 60 * 1000,
    '1M': 30 * 24 * 60 * 60 * 1000,
  };
  return durations[timeframe] || durations['1d'];
};