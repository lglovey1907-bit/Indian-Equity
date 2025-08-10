# Indian Equity Market Trading Platform

A comprehensive web application for the Indian equity market that provides advanced charting, real-time data, and trading capabilities similar to TradingView.

![Platform Status](https://img.shields.io/badge/Status-Phase%201-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🌟 Features Implemented (Phase 1)

### ✅ Real-time Chart Interface
- Advanced candlestick charts using Lightweight Charts library
- Real-time price updates via WebSocket connections
- Multiple timeframe support (1m, 5m, 15m, 1D buttons)
- Volume analysis with color-coded bars
- Dark/Light theme support

### ✅ Indian Market Specific Features
- Mock NSE and BSE stock data integration
- Major Indian indices (NIFTY 50, SENSEX, Bank Nifty)
- Real-time stock prices with percentage changes
- Indian Rupee (₹) currency formatting

### ✅ Real-time Data & Updates
- WebSocket-based real-time market data
- Live stock ticker with scrolling animation
- Connection status indicators
- Automatic fallback to REST API if WebSocket fails

### ✅ User Interface
- Responsive design for desktop and mobile
- Dark/Light theme toggle
- Professional trading platform layout
- Market status and connection indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/lglovey1907-bit/Indian-Equity.git
   cd Indian-Equity
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend will run on `http://localhost:3001`

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

4. **Open in Browser**
   Navigate to `http://localhost:3000` to see the platform

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

## 🏗️ Architecture

### Frontend (Next.js 14 + TypeScript)
- **Framework**: Next.js with App Router
- **Styling**: TailwindCSS for responsive design
- **Charts**: Lightweight Charts library for financial data visualization
- **Icons**: Lucide React for consistent iconography
- **Real-time**: WebSocket connection with automatic reconnection

### Backend (Node.js + Express + TypeScript)
- **Framework**: Express.js with TypeScript
- **Real-time**: WebSocket server for live data streaming
- **Security**: Helmet, CORS, and other security middleware
- **Data**: Mock data service simulating Indian market data

## 📁 Project Structure

```
indian-equity-platform/
├── frontend/                    # Next.js React frontend
│   ├── src/
│   │   ├── app/                # App Router pages and API routes
│   │   ├── components/         # Reusable React components
│   │   │   ├── charts/         # Chart components
│   │   │   └── ui/             # UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service functions
│   │   └── types/              # TypeScript type definitions
│   ├── public/                 # Static assets
│   └── package.json
├── backend/                     # Node.js Express backend
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── services/           # Business logic services
│   │   ├── types/              # TypeScript type definitions
│   │   └── index.ts            # Server entry point
│   └── package.json
├── docs/                       # Documentation
├── docker-compose.yml          # Docker orchestration
└── README.md
```

## 🔧 API Endpoints

### Market Data
- `GET /api/market/data` - Get current market data
- `GET /api/market/stock/:symbol` - Get specific stock data
- `GET /api/market/chart/:symbol` - Get candlestick chart data
- `GET /api/market/indices` - Get market indices data

### WebSocket
- `ws://localhost:3001/ws` - Real-time market data updates

## 📊 Mock Data

The platform currently uses mock data simulating:
- **10 major Indian stocks**: RELIANCE, TCS, HDFCBANK, INFY, etc.
- **Market indices**: NIFTY 50, SENSEX, Bank Nifty
- **Real-time price movements**: Realistic price fluctuations
- **Historical data**: 100 data points for candlestick charts

## 🛣️ Roadmap

### Phase 2: Technical Indicators & Drawing Tools
- [ ] 100+ technical indicators (SMA, EMA, RSI, MACD, etc.)
- [ ] Drawing tools (trend lines, support/resistance)
- [ ] Pattern recognition algorithms
- [ ] Alert system for price/indicator levels

### Phase 3: Stock Screener & Watchlist
- [ ] Advanced filtering and screening
- [ ] Customizable watchlists
- [ ] Sector-wise performance analysis
- [ ] Top gainers/losers tracking

### Phase 4: News & Market Data Integration
- [ ] Live financial news integration
- [ ] Corporate announcements
- [ ] Economic calendar
- [ ] IPO information

### Phase 5: Trading Integration
- [ ] Paper trading functionality
- [ ] Broker API integrations
- [ ] Order management system
- [ ] Portfolio tracking and P&L analysis

### Phase 6: Advanced Features
- [ ] Mobile app development
- [ ] Advanced analytics and backtesting
- [ ] Machine learning price predictions
- [ ] Multi-monitor support

## 🔒 Security & Compliance

- CORS protection for cross-origin requests
- Helmet.js for security headers
- Rate limiting implementation ready
- SEBI compliance considerations for data display
- Secure WebSocket connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-email@domain.com or create an issue in this repository.

---

**Disclaimer**: This platform is for educational and research purposes. Always consult with financial advisors before making investment decisions.