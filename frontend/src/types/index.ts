export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
  timestamp: number;
}

export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketData {
  stocks: StockData[];
  indices: {
    nifty50: StockData;
    sensex: StockData;
    bankNifty: StockData;
  };
  candlestickData: CandlestickData[];
}

export interface WebSocketMessage {
  type: string;
  data: MarketData;
  timestamp?: number;
}