import express from 'express';
import { generateMockData } from '../services/dataService';

const router = express.Router();

// Get current market data
router.get('/data', (req, res) => {
  try {
    const marketData = generateMockData();
    res.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market data'
    });
  }
});

// Get specific stock data
router.get('/stock/:symbol', (req, res) => {
  try {
    const { symbol } = req.params;
    const marketData = generateMockData();
    const stock = marketData.stocks.find(s => s.symbol === symbol.toUpperCase());
    
    if (!stock) {
      return res.status(404).json({
        success: false,
        error: 'Stock not found'
      });
    }
    
    res.json({
      success: true,
      data: stock,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data'
    });
  }
});

// Get candlestick data for charting
router.get('/chart/:symbol', (req, res) => {
  try {
    const { symbol } = req.params;
    const { timeframe = '1m', limit = '100' } = req.query;
    
    const marketData = generateMockData();
    
    res.json({
      success: true,
      data: {
        symbol: symbol.toUpperCase(),
        timeframe,
        candlesticks: marketData.candlestickData.slice(-parseInt(limit as string))
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chart data'
    });
  }
});

// Get indices data
router.get('/indices', (req, res) => {
  try {
    const marketData = generateMockData();
    res.json({
      success: true,
      data: marketData.indices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching indices data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch indices data'
    });
  }
});

export default router;