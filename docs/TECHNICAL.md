# Indian Equity Market Trading Platform - Technical Documentation

## Architecture Overview

This platform is built using a modern, scalable architecture designed specifically for real-time financial data processing and display.

### Technology Stack

#### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS for utility-first responsive design
- **Charts**: Custom Canvas-based charting solution
- **Icons**: Lucide React for consistent iconography
- **Real-time Communication**: WebSocket client with auto-reconnection

#### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js with security middleware
- **Real-time**: WebSocket server using `ws` library
- **Security**: Helmet.js, CORS, rate limiting ready
- **Data**: Mock data service simulating Indian market patterns

### System Architecture

```
┌─────────────────┐    WebSocket     ┌─────────────────┐
│                 │ ←──────────────→ │                 │
│   Frontend      │                  │    Backend      │
│   (Next.js)     │    REST API      │   (Express.js)  │
│                 │ ←──────────────→ │                 │
└─────────────────┘                  └─────────────────┘
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│   User Interface│                  │  Data Services  │
│   Components    │                  │  & Mock APIs    │
└─────────────────┘                  └─────────────────┘
```

## Features Implemented

### Phase 1: Foundation Features

#### ✅ Real-time Chart Interface
- **Custom Canvas Chart**: Built from scratch using HTML5 Canvas API
- **Candlestick Visualization**: Professional financial chart rendering
- **Real-time Updates**: Live data via WebSocket connections
- **Responsive Design**: Adapts to different screen sizes
- **Theme Support**: Dark and light mode compatibility

#### ✅ Market Data Simulation
- **Indian Stocks**: 10 major NSE/BSE stocks with realistic price movements
- **Market Indices**: NIFTY 50, SENSEX, and Bank Nifty with live updates
- **Historical Data**: 100 data points for chart visualization
- **Price Movements**: Realistic volatility simulation (±5% typical range)
- **Volume Data**: Simulated trading volumes for each stock

#### ✅ Real-time Data Streaming
- **WebSocket Server**: Broadcasts market updates every 2 seconds
- **Connection Management**: Auto-reconnection on disconnect
- **Connection Status**: Visual indicators for connection state
- **Fallback Mechanism**: REST API fallback when WebSocket unavailable

#### ✅ User Interface Components
- **Professional Layout**: Trading platform-inspired design
- **Stock Ticker**: Scrolling ticker with live prices and changes
- **Market Indices Panel**: Dedicated section for major indices
- **Top Stocks Display**: Quick view of major stocks with performance
- **Theme Toggle**: Switch between dark and light modes
- **Connection Indicators**: Live/offline status display

### Data Structure

#### Stock Data Model
```typescript
interface StockData {
  symbol: string;        // Stock symbol (e.g., "RELIANCE")
  name: string;          // Full company name
  price: number;         // Current price in INR
  change: number;        // Absolute price change
  changePercent: number; // Percentage change
  volume: number;        // Trading volume
  high: number;          // Day's high price
  low: number;           // Day's low price
  open: number;          // Opening price
  close: number;         // Current/closing price
  timestamp: number;     // Last update timestamp
}
```

#### Candlestick Data Model
```typescript
interface CandlestickData {
  time: number;    // Timestamp
  open: number;    // Opening price
  high: number;    // High price
  low: number;     // Low price
  close: number;   // Closing price
  volume: number;  // Volume traded
}
```

### API Endpoints

#### Market Data APIs
- `GET /api/market/data` - Complete market data with stocks, indices, and chart data
- `GET /api/market/stock/:symbol` - Individual stock data
- `GET /api/market/chart/:symbol` - Candlestick data for charts
- `GET /api/market/indices` - Market indices data
- `GET /health` - Server health check

#### WebSocket API
- `ws://localhost:3001/ws` - Real-time market data stream
- Message format: `{type: "market_data", data: MarketData}`

### Performance Considerations

#### Frontend Optimizations
- **Canvas Rendering**: Efficient chart rendering without external dependencies
- **Component Memoization**: React.memo and useMemo for preventing unnecessary re-renders
- **Lazy Loading**: Next.js automatic code splitting
- **WebSocket Management**: Single connection with proper cleanup

#### Backend Optimizations
- **Efficient Data Generation**: Optimized mock data algorithms
- **Memory Management**: Proper cleanup of WebSocket connections
- **TypeScript**: Compile-time type checking for better performance
- **Production Build**: Optimized builds for deployment

## Development Workflow

### Local Development Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev    # Development server with hot reload
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev    # Next.js development server
   ```

### Production Deployment

#### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Individual container builds
docker build -t indian-equity-backend ./backend
docker build -t indian-equity-frontend ./frontend
```

#### Manual Deployment
```bash
# Backend production build
cd backend
npm run build
npm start

# Frontend production build
cd frontend
npm run build
npm start
```

### Environment Configuration

#### Backend (.env)
```
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/indian-equity  # For future use
JWT_SECRET=your-jwt-secret-key-here                  # For future auth
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001/ws
```

## Security Implementation

### Current Security Measures
- **CORS Protection**: Configured for frontend domain only
- **Helmet.js**: Security headers for Express.js
- **Input Validation**: TypeScript compile-time validation
- **Environment Variables**: Secure configuration management

### Future Security Enhancements
- Rate limiting implementation
- JWT-based authentication
- API key management
- Data encryption for sensitive information
- SEBI compliance measures

## Testing Strategy

### Current Status
- Build validation for both frontend and backend
- API endpoint functionality testing
- WebSocket connection testing
- Manual UI testing

### Future Testing Implementation
- Unit tests for critical business logic
- Integration tests for API endpoints
- E2E tests for user workflows
- Performance testing for real-time features
- Load testing for WebSocket connections

## Monitoring & Observability

### Current Implementation
- Console logging for development
- Connection status monitoring
- Health check endpoint

### Future Enhancements
- Structured logging with Winston
- Application performance monitoring
- Real-time metrics dashboard
- Error tracking and alerting
- WebSocket connection analytics

## Scalability Considerations

### Current Architecture Benefits
- Stateless backend design
- Efficient WebSocket management
- Optimized frontend rendering
- Docker containerization ready

### Future Scalability Features
- Horizontal scaling with load balancers
- Redis for session management and caching
- Database clustering for high availability
- CDN integration for static assets
- Microservices architecture for feature modules

## Compliance & Regulations

### SEBI Compliance Considerations
- Data display disclaimers
- Real-time data licensing requirements
- User agreement and terms of service
- Risk disclosure statements
- Audit trail maintenance

### Data Privacy
- User data protection measures
- Cookie consent management
- Data retention policies
- Right to data deletion
- Privacy policy compliance