# Indian Equity Trading Platform

A comprehensive Indian stock trading platform with real-time charts, technical analysis, and market data for NSE and BSE.

## 🚀 Features

- **Real-time Charts**: Professional candlestick charts with 100+ technical indicators
- **Indian Markets**: Complete NSE & BSE integration with NIFTY, SENSEX, Bank Nifty tracking
- **Portfolio Management**: Advanced portfolio tracking, P&L analysis, and performance metrics
- **Stock Screener**: Advanced filtering and screening tools
- **Watchlists**: Customizable watchlists with real-time updates
- **Market Data**: Live market depth, order book, and real-time price updates
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Customizable themes for better user experience

## 🏗️ Project Structure

```
indian-equity-platform/
├── frontend/                 # Next.js 14+ application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── app/             # Next.js app directory
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   ├── services/        # API service layer
│   │   ├── store/           # State management
│   │   └── styles/          # CSS/Tailwind styles
│   └── package.json
├── backend/                  # Node.js/Express server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic services
│   │   ├── middleware/      # Express middleware
│   │   └── utils/           # Utility functions
│   └── package.json
├── shared/                   # Shared TypeScript types
├── docs/                     # Documentation
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Charts**: Lightweight Charts by TradingView
- **Icons**: Heroicons
- **Theme**: next-themes

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Real-time**: Socket.IO
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Database**: PostgreSQL (planned)
- **Caching**: Redis (planned)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lglovey1907-bit/Indian-Equity.git
   cd Indian-Equity
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Development

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:3001`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### Building for Production

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build Backend**
   ```bash
   cd backend
   npm run build
   ```

## 📊 Market Data

The platform currently uses mock data for demonstration purposes. In production, it would integrate with:

- **NSE APIs**: For real-time NSE stock data
- **BSE APIs**: For BSE market data
- **Market Data Vendors**: Professional data feeds for institutional use

## 🔒 Security & Compliance

- **SEBI Compliance**: Includes regulatory disclaimers and compliance measures
- **Data Security**: Implements industry-standard security practices
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation and sanitization

## 📱 Features Implemented

### Phase 1: Foundation ✅
- [x] Complete project setup with modern development environment
- [x] Next.js 14+ frontend with TypeScript and Tailwind CSS
- [x] Node.js/Express backend with TypeScript and Socket.IO
- [x] Basic UI framework and responsive design
- [x] Real-time WebSocket connections
- [x] Mock market data and API endpoints

### Phase 2: Core Features (In Progress)
- [x] Real-time charting with Lightweight Charts
- [x] Market dashboard with Indian indices
- [x] Basic portfolio tracking
- [x] Watchlist management
- [x] Market depth visualization
- [ ] Advanced technical indicators
- [ ] Stock screener functionality

### Phase 3: Advanced Features (Planned)
- [ ] 100+ technical indicators suite
- [ ] Advanced stock screener
- [ ] Paper trading system
- [ ] Options chain analysis
- [ ] Drawing tools for technical analysis

### Phase 4: Optimization (Planned)
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] CI/CD pipeline
- [ ] Docker deployment
- [ ] Comprehensive testing

## 🎯 Market Specifics

### Indian Market Integration
- **NSE Integration**: Structure for National Stock Exchange data
- **BSE Integration**: Structure for Bombay Stock Exchange data
- **Indices Tracking**: NIFTY 50, SENSEX, Bank Nifty, and sectoral indices
- **Market Timings**: Indian market hours (9:15 AM - 3:30 PM IST)
- **Currency**: INR formatting and Indian number system
- **Regulations**: SEBI compliance and regulatory disclaimers

### Supported Instruments
- Equity stocks (NSE/BSE)
- Index funds and ETFs
- Futures and Options (structure ready)
- Currency pairs (USD/INR, EUR/INR, GBP/INR)

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run tests
```

### Backend Development
```bash
cd backend
npm run dev      # Start development server with nodemon
npm run build    # Build TypeScript to JavaScript
npm run start    # Start production server
npm run test     # Run tests
```

## 📈 API Endpoints

### Market Data
- `GET /api/market/indices` - Get Indian market indices
- `GET /api/market/stocks` - Get stock data with filtering
- `GET /api/market/stocks/:symbol` - Get specific stock data
- `GET /api/market/stocks/:symbol/history` - Get historical data
- `GET /api/market/stocks/:symbol/depth` - Get market depth
- `GET /api/market/status` - Get market status

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `GET /api/portfolio/holdings` - Get portfolio holdings
- `POST /api/portfolio/holdings` - Add new holding
- `PUT /api/portfolio/holdings/:id` - Update holding
- `DELETE /api/portfolio/holdings/:id` - Delete holding

### Watchlists
- `GET /api/portfolio/watchlists` - Get user watchlists
- `POST /api/portfolio/watchlists` - Create new watchlist
- `PUT /api/portfolio/watchlists/:id` - Update watchlist
- `DELETE /api/portfolio/watchlists/:id` - Delete watchlist

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**SEBI Disclaimer**: This platform is for educational and analysis purposes only. Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Please consult your financial advisor before making any investment decisions.

## 🆘 Support

For support, email support@indianequity.com or join our Slack channel.

---

Made with ❤️ for the Indian financial market community.