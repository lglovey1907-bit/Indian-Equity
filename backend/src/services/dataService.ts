import { StockData, CandlestickData, MarketData } from '../types';

// Mock Indian stock symbols
const INDIAN_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries Ltd' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd' },
  { symbol: 'INFY', name: 'Infosys Ltd' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd' },
  { symbol: 'ITC', name: 'ITC Ltd' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd' },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd' }
];

// Generate random price movement
const generateRandomChange = (basePrice: number): { price: number; change: number; changePercent: number } => {
  const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
  const change = basePrice * (changePercent / 100);
  const price = basePrice + change;
  
  return {
    price: Math.round(price * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100
  };
};

export const generateMockData = (): MarketData => {
  const stocks: StockData[] = INDIAN_STOCKS.map(stock => {
    const basePrice = Math.random() * 3000 + 100; // Random base price between 100-3100
    const { price, change, changePercent } = generateRandomChange(basePrice);
    const open = basePrice * (0.95 + Math.random() * 0.1); // Open within 5% of base
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      price,
      change,
      changePercent,
      volume: Math.floor(Math.random() * 10000000), // Random volume
      high: price + (Math.random() * price * 0.05),
      low: price - (Math.random() * price * 0.05),
      open,
      close: price,
      timestamp: Date.now()
    };
  });

  // Generate mock indices
  const niftyBase = 19500;
  const sensexBase = 65000;
  const bankNiftyBase = 44000;

  const niftyData = generateRandomChange(niftyBase);
  const sensexData = generateRandomChange(sensexBase);
  const bankNiftyData = generateRandomChange(bankNiftyBase);

  // Generate candlestick data for the last 100 periods
  const candlestickData: CandlestickData[] = [];
  let currentTime = Date.now() - (100 * 60 * 1000); // 100 minutes ago
  let currentPrice = 2500; // Starting price

  for (let i = 0; i < 100; i++) {
    const open = currentPrice;
    const changePercent = (Math.random() - 0.5) * 4; // -2% to +2%
    const close = open * (1 + changePercent / 100);
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);

    candlestickData.push({
      time: currentTime,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.floor(Math.random() * 1000000)
    });

    currentTime += 60 * 1000; // Next minute
    currentPrice = close;
  }

  return {
    stocks,
    indices: {
      nifty50: {
        symbol: 'NIFTY50',
        name: 'NIFTY 50',
        ...niftyData,
        volume: 0,
        high: niftyData.price + 50,
        low: niftyData.price - 50,
        open: niftyBase,
        close: niftyData.price,
        timestamp: Date.now()
      },
      sensex: {
        symbol: 'SENSEX',
        name: 'BSE SENSEX',
        ...sensexData,
        volume: 0,
        high: sensexData.price + 200,
        low: sensexData.price - 200,
        open: sensexBase,
        close: sensexData.price,
        timestamp: Date.now()
      },
      bankNifty: {
        symbol: 'BANKNIFTY',
        name: 'NIFTY BANK',
        ...bankNiftyData,
        volume: 0,
        high: bankNiftyData.price + 100,
        low: bankNiftyData.price - 100,
        open: bankNiftyBase,
        close: bankNiftyData.price,
        timestamp: Date.now()
      }
    },
    candlestickData
  };
};