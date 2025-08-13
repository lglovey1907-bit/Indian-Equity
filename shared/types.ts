// Market Data Types
export interface Stock {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  industry: string;
  marketCap: number;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume: number;
  avgVolume: number;
  high: number;
  low: number;
  dayHigh: number;
  dayLow: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  pe: number;
  pb: number;
  eps: number;
  dividend: number;
  dividendYield: number;
  lastUpdated: Date;
}

export interface Index {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  previousClose: number;
  lastUpdated: Date;
}

export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicator {
  name: string;
  values: number[];
  parameters: Record<string, any>;
  timestamp: number[];
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  holdings: Holding[];
  totalValue: number;
  totalInvested: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Holding {
  id: string;
  portfolioId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  invested: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
  createdAt: Date;
  updatedAt: Date;
}

// Watchlist Types
export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  symbols: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Options & Futures Types
export interface OptionsChain {
  symbol: string;
  expiry: Date;
  strikes: OptionStrike[];
}

export interface OptionStrike {
  strike: number;
  call: OptionData;
  put: OptionData;
}

export interface OptionData {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isVerified: boolean;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'hi';
  defaultExchange: 'NSE' | 'BSE';
  chartType: 'candlestick' | 'line' | 'bar';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  priceAlerts: boolean;
  news: boolean;
  marketOpen: boolean;
  marketClose: boolean;
}

// Trading Types
export interface Order {
  id: string;
  userId: string;
  symbol: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop_loss';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'filled' | 'cancelled' | 'rejected';
  filledQuantity: number;
  averagePrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// Market Depth Types
export interface MarketDepth {
  symbol: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastUpdated: Date;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  orders: number;
}

// Screener Types
export interface ScreenerFilter {
  name: string;
  field: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte' | 'between';
  value: number | number[];
}

export interface ScreenerResult {
  stocks: Stock[];
  total: number;
  page: number;
  limit: number;
}

// WebSocket Message Types
export interface WSMessage {
  type: string;
  data: any;
  timestamp: number;
}

export interface PriceUpdate {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Chart Types
export interface ChartData {
  symbol: string;
  timeframe: '1m' | '5m' | '15m' | '1h' | '1d' | '1w' | '1M';
  data: OHLCV[];
  indicators?: TechnicalIndicator[];
}

export interface DrawingTool {
  id: string;
  type: 'trendline' | 'horizontal' | 'vertical' | 'fibonacci' | 'rectangle';
  points: Point[];
  style: LineStyle;
}

export interface Point {
  x: number;
  y: number;
  timestamp?: number;
  price?: number;
}

export interface LineStyle {
  color: string;
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
}

// Indian Market Specific Types
export interface MarketHoliday {
  date: Date;
  name: string;
  exchange: 'NSE' | 'BSE' | 'Both';
}

export interface CorporateAction {
  symbol: string;
  type: 'dividend' | 'bonus' | 'split' | 'rights' | 'merger';
  exDate: Date;
  recordDate: Date;
  details: string;
  ratio?: string;
  amount?: number;
}

export interface IPO {
  company: string;
  symbol: string;
  priceRange: [number, number];
  openDate: Date;
  closeDate: Date;
  listingDate: Date;
  lotSize: number;
  issueSize: number;
  status: 'upcoming' | 'open' | 'closed' | 'listed';
}

export interface SectorPerformance {
  sector: string;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  stocks: number;
  topGainers: string[];
  topLosers: string[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Theme Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
  };
}