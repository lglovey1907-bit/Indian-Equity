import express from 'express'
const router = express.Router()

// Mock portfolio data
const mockPortfolio = {
  id: '1',
  userId: '1',
  name: 'My Portfolio',
  holdings: [
    {
      id: '1',
      portfolioId: '1',
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      quantity: 50,
      avgPrice: 2650.00,
      currentPrice: 2735.60,
      invested: 132500,
      currentValue: 136780,
      pnl: 4280,
      pnlPercent: 3.23,
      dayPnL: 772.50,
      dayPnLPercent: 0.57,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
    {
      id: '2',
      portfolioId: '1',
      symbol: 'TCS',
      name: 'Tata Consultancy Services Ltd',
      quantity: 20,
      avgPrice: 3500.00,
      currentPrice: 3645.25,
      invested: 70000,
      currentValue: 72905,
      pnl: 2905,
      pnlPercent: 4.15,
      dayPnL: 269,
      dayPnLPercent: 0.37,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date(),
    },
  ],
  totalValue: 209685,
  totalInvested: 202500,
  totalPnL: 7185,
  totalPnLPercent: 3.55,
  dayPnL: 1041.50,
  dayPnLPercent: 0.50,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
}

const mockWatchlists = [
  {
    id: '1',
    userId: '1',
    name: 'My Watchlist',
    symbols: ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    name: 'Bank Stocks',
    symbols: ['HDFCBANK', 'ICICIBANK', 'SBIN', 'KOTAKBANK'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
]

// Get user portfolio
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: mockPortfolio
  })
})

// Get portfolio holdings
router.get('/holdings', (req, res) => {
  res.json({
    success: true,
    data: mockPortfolio.holdings
  })
})

// Add holding to portfolio
router.post('/holdings', (req, res) => {
  const { symbol, quantity, price } = req.body

  if (!symbol || !quantity || !price) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: symbol, quantity, price'
    })
  }

  const newHolding = {
    id: (mockPortfolio.holdings.length + 1).toString(),
    portfolioId: '1',
    symbol: symbol.toUpperCase(),
    name: `${symbol} Company Ltd`,
    quantity: parseInt(quantity),
    avgPrice: parseFloat(price),
    currentPrice: parseFloat(price),
    invested: parseInt(quantity) * parseFloat(price),
    currentValue: parseInt(quantity) * parseFloat(price),
    pnl: 0,
    pnlPercent: 0,
    dayPnL: 0,
    dayPnLPercent: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockPortfolio.holdings.push(newHolding)

  res.json({
    success: true,
    data: newHolding,
    message: 'Holding added successfully'
  })
})

// Update holding
router.put('/holdings/:id', (req, res) => {
  const { id } = req.params
  const { quantity, price } = req.body

  const holdingIndex = mockPortfolio.holdings.findIndex(h => h.id === id)

  if (holdingIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Holding not found'
    })
  }

  if (quantity) {
    mockPortfolio.holdings[holdingIndex].quantity = parseInt(quantity)
  }

  if (price) {
    mockPortfolio.holdings[holdingIndex].avgPrice = parseFloat(price)
    mockPortfolio.holdings[holdingIndex].invested = 
      mockPortfolio.holdings[holdingIndex].quantity * parseFloat(price)
  }

  mockPortfolio.holdings[holdingIndex].updatedAt = new Date()

  res.json({
    success: true,
    data: mockPortfolio.holdings[holdingIndex],
    message: 'Holding updated successfully'
  })
})

// Delete holding
router.delete('/holdings/:id', (req, res) => {
  const { id } = req.params

  const holdingIndex = mockPortfolio.holdings.findIndex(h => h.id === id)

  if (holdingIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Holding not found'
    })
  }

  mockPortfolio.holdings.splice(holdingIndex, 1)

  res.json({
    success: true,
    message: 'Holding deleted successfully'
  })
})

// Get watchlists
router.get('/watchlists', (req, res) => {
  res.json({
    success: true,
    data: mockWatchlists
  })
})

// Create watchlist
router.post('/watchlists', (req, res) => {
  const { name, symbols = [] } = req.body

  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Watchlist name is required'
    })
  }

  const newWatchlist = {
    id: (mockWatchlists.length + 1).toString(),
    userId: '1',
    name,
    symbols: symbols.map((s: string) => s.toUpperCase()),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockWatchlists.push(newWatchlist)

  res.json({
    success: true,
    data: newWatchlist,
    message: 'Watchlist created successfully'
  })
})

// Update watchlist
router.put('/watchlists/:id', (req, res) => {
  const { id } = req.params
  const { name, symbols } = req.body

  const watchlistIndex = mockWatchlists.findIndex(w => w.id === id)

  if (watchlistIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Watchlist not found'
    })
  }

  if (name) {
    mockWatchlists[watchlistIndex].name = name
  }

  if (symbols) {
    mockWatchlists[watchlistIndex].symbols = symbols.map((s: string) => s.toUpperCase())
  }

  mockWatchlists[watchlistIndex].updatedAt = new Date()

  res.json({
    success: true,
    data: mockWatchlists[watchlistIndex],
    message: 'Watchlist updated successfully'
  })
})

// Delete watchlist
router.delete('/watchlists/:id', (req, res) => {
  const { id } = req.params

  const watchlistIndex = mockWatchlists.findIndex(w => w.id === id)

  if (watchlistIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Watchlist not found'
    })
  }

  mockWatchlists.splice(watchlistIndex, 1)

  res.json({
    success: true,
    message: 'Watchlist deleted successfully'
  })
})

module.exports = router