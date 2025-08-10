import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server as SocketServer } from 'ws';
import http from 'http';

import marketDataRoutes from './routes/marketData';
import { generateMockData } from './services/dataService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/market', marketDataRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server for real-time data
const wss = new SocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  
  // Send initial mock data
  ws.send(JSON.stringify({
    type: 'market_data',
    data: generateMockData()
  }));
  
  // Send updates every 2 seconds
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({
        type: 'market_data',
        data: generateMockData()
      }));
    }
  }, 2000);
  
  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
    clearInterval(interval);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server available at ws://localhost:${PORT}/ws`);
});

export default app;