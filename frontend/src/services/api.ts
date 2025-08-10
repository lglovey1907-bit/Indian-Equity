const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const marketDataApi = {
  async getMarketData() {
    const response = await fetch(`${API_BASE_URL}/market/data`);
    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }
    return response.json();
  },

  async getStockData(symbol: string) {
    const response = await fetch(`${API_BASE_URL}/market/stock/${symbol}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
    return response.json();
  },

  async getChartData(symbol: string, timeframe = '1m', limit = '100') {
    const response = await fetch(
      `${API_BASE_URL}/market/chart/${symbol}?timeframe=${timeframe}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch chart data for ${symbol}`);
    }
    return response.json();
  },

  async getIndices() {
    const response = await fetch(`${API_BASE_URL}/market/indices`);
    if (!response.ok) {
      throw new Error('Failed to fetch indices data');
    }
    return response.json();
  }
};