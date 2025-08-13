import express from 'express'
const router = express.Router()

// Mock market data
const mockIndices = [
  {
    symbol: 'NIFTY',
    name: 'NIFTY 50',
    value: 21731.40,
    change: 142.75,
    changePercent: 0.66,
    high: 21753.20,
    low: 21588.65,
    previousClose: 21588.65,
    lastUpdated: new Date(),
  },
  {
    symbol: 'SENSEX',
    name: 'SENSEX',
    value: 72186.09,
    change: 364.41,
    changePercent: 0.51,
    high: 72244.70,
    low: 71821.68,
    previousClose: 71821.68,
    lastUpdated: new Date(),
  },
  {
    symbol: 'BANKNIFTY',
    name: 'Bank Nifty',
    value: 46376.25,
    change: -89.35,
    changePercent: -0.19,
    high: 46520.10,
    low: 46245.80,
    previousClose: 46465.60,
    lastUpdated: new Date(),
  },
]

const mockStocks = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    exchange: 'NSE',
    sector: 'Oil & Gas',
    currentPrice: 2735.60,
    previousClose: 2720.15,
    change: 15.45,
    changePercent: 0.57,
    volume: 2450000,
    high: 2741.20,
    low: 2718.30,
    marketCap: 1825000000000,
    pe: 25.4,
    pb: 2.1,
    lastUpdated: new Date(),
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd',
    exchange: 'NSE',
    sector: 'Information Technology',
    currentPrice: 3645.25,
    previousClose: 3631.80,
    change: 13.45,
    changePercent: 0.37,
    volume: 1850000,
    high: 3652.90,
    low: 3628.45,
    marketCap: 1342000000000,
    pe: 28.7,
    pb: 12.3,
    lastUpdated: new Date(),
  },
]

// Get indices data
router.get('/indices', (req, res) => {
  res.json({
    success: true,
    data: mockIndices
  })
})

// Get stock data
router.get('/stocks', (req, res) => {
  const { symbol, sector, exchange } = req.query
  let filteredStocks = [...mockStocks]

  if (symbol) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.symbol.toLowerCase().includes((symbol as string).toLowerCase())
    )
  }

  if (sector) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.sector.toLowerCase() === (sector as string).toLowerCase()
    )
  }

  if (exchange) {
    filteredStocks = filteredStocks.filter(stock => 
      stock.exchange === exchange
    )
  }

  res.json({
    success: true,
    data: filteredStocks,
    total: filteredStocks.length
  })
})

// Get specific stock data
router.get('/stocks/:symbol', (req, res) => {
  const { symbol } = req.params
  const stock = mockStocks.find(s => s.symbol === symbol.toUpperCase())

  if (stock) {
    res.json({
      success: true,
      data: stock
    })
  } else {
    res.status(404).json({
      success: false,
      error: 'Stock not found'
    })
  }
})

// Get historical data
router.get('/stocks/:symbol/history', (req, res) => {
  const { symbol } = req.params
  const { timeframe = '1D', limit = 100 } = req.query

  // Mock historical data
  const mockHistory = []
  const basePrice = 2700
  const now = new Date()

  for (let i = parseInt(limit as string); i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const open = basePrice + (Math.random() - 0.5) * 100
    const high = open + Math.random() * 50
    const low = open - Math.random() * 50
    const close = low + Math.random() * (high - low)
    const volume = 1000000 + Math.random() * 2000000

    mockHistory.push({
      timestamp: date.getTime(),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(volume)
    })
  }

  res.json({
    success: true,
    data: {
      symbol: symbol.toUpperCase(),
      timeframe,
      data: mockHistory
    }
  })
})

// Get market depth
router.get('/stocks/:symbol/depth', (req, res) => {
  const { symbol } = req.params

  const mockDepth = {
    symbol: symbol.toUpperCase(),
    bids: [
      { price: 2735.50, quantity: 150, orders: 5 },
      { price: 2735.25, quantity: 200, orders: 8 },
      { price: 2735.00, quantity: 300, orders: 12 },
      { price: 2734.75, quantity: 180, orders: 6 },
      { price: 2734.50, quantity: 250, orders: 9 },
    ],
    asks: [
      { price: 2735.75, quantity: 120, orders: 4 },
      { price: 2736.00, quantity: 180, orders: 7 },
      { price: 2736.25, quantity: 220, orders: 10 },
      { price: 2736.50, quantity: 160, orders: 5 },
      { price: 2736.75, quantity: 200, orders: 8 },
    ],
    lastUpdated: new Date()
  }

  res.json({
    success: true,
    data: mockDepth
  })
})

// Get market status
router.get('/status', (req, res) => {
  const now = new Date()
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000))
  const hours = istTime.getHours()
  const minutes = istTime.getMinutes()
  const day = istTime.getDay()
  
  let status = 'closed'
  if (day !== 0 && day !== 6) { // Not weekend
    const currentTime = hours * 60 + minutes
    const preOpenStart = 9 * 60
    const marketStart = 9 * 60 + 15
    const marketEnd = 15 * 60 + 30
    
    if (currentTime >= preOpenStart && currentTime < marketStart) {
      status = 'pre-open'
    } else if (currentTime >= marketStart && currentTime <= marketEnd) {
      status = 'open'
    } else if (currentTime > marketEnd) {
      status = 'post-close'
    }
  }

  res.json({
    success: true,
    data: {
      status,
      timestamp: istTime.toISOString(),
      nextOpen: '2024-01-08T09:15:00+05:30',
      nextClose: '2024-01-08T15:30:00+05:30'
    }
  })
})

module.exports = router