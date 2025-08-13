import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import winston from 'winston'

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const server = createServer(app)

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'indian-equity-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}))
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/market', require('./routes/market'))
app.use('/api/portfolio', require('./routes/portfolio'))

// Mock market data for WebSocket
const mockMarketData = {
  'NIFTY': { price: 21731.40, change: 142.75, changePercent: 0.66 },
  'SENSEX': { price: 72186.09, change: 364.41, changePercent: 0.51 },
  'BANKNIFTY': { price: 46376.25, change: -89.35, changePercent: -0.19 },
  'RELIANCE': { price: 2735.60, change: 15.45, changePercent: 0.57 },
  'TCS': { price: 3645.25, change: 13.45, changePercent: 0.37 },
  'HDFCBANK': { price: 1542.75, change: 4.55, changePercent: 0.30 },
  'INFY': { price: 1671.30, change: 6.45, changePercent: 0.39 },
  'ICICIBANK': { price: 1182.45, change: 7.25, changePercent: 0.62 },
}

// WebSocket connections
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`)

  // Send initial market data
  socket.emit('market_data', mockMarketData)

  // Handle symbol subscription
  socket.on('subscribe', (symbols) => {
    logger.info(`Client ${socket.id} subscribed to: ${symbols.join(', ')}`)
    socket.join(symbols)
  })

  // Handle symbol unsubscription
  socket.on('unsubscribe', (symbols) => {
    logger.info(`Client ${socket.id} unsubscribed from: ${symbols.join(', ')}`)
    symbols.forEach((symbol: string) => socket.leave(symbol))
  })

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`)
  })
})

// Simulate real-time market data updates
setInterval(() => {
  Object.keys(mockMarketData).forEach(symbol => {
    const data = mockMarketData[symbol as keyof typeof mockMarketData]
    const priceChange = (Math.random() - 0.5) * 10 // Random price change
    const newPrice = Math.max(0, data.price + priceChange)
    const change = newPrice - (data.price - data.change)
    const changePercent = ((change / (newPrice - change)) * 100)

    mockMarketData[symbol as keyof typeof mockMarketData] = {
      price: newPrice,
      change,
      changePercent
    }

    // Emit updated data to subscribed clients
    io.to(symbol).emit('price_update', {
      symbol,
      price: newPrice,
      change,
      changePercent,
      timestamp: Date.now()
    })
  })
}, 5000) // Update every 5 seconds

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack)
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested resource was not found'
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
})