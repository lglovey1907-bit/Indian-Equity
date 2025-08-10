'use client';

import { useEffect, useRef } from 'react';
import { CandlestickData } from '@/types';

interface TradingChartProps {
  data: CandlestickData[];
  height?: number;
  theme?: 'light' | 'dark';
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  data, 
  height = 400, 
  theme = 'dark' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate price range
    const prices = data.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Draw grid lines
    ctx.strokeStyle = theme === 'dark' ? '#374151' : '#e5e7eb';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding + (i * chartHeight / 10);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * chartWidth / 10);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
    }

    // Draw candlesticks
    const candleWidth = Math.max(2, chartWidth / data.length - 2);
    
    data.forEach((candle, index) => {
      const x = padding + (index * chartWidth / data.length) + (chartWidth / data.length - candleWidth) / 2;
      
      // Calculate y positions
      const highY = padding + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const lowY = padding + ((maxPrice - candle.low) / priceRange) * chartHeight;
      const openY = padding + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const closeY = padding + ((maxPrice - candle.close) / priceRange) * chartHeight;

      // Determine color
      const isUp = candle.close > candle.open;
      ctx.fillStyle = isUp ? '#10b981' : '#ef4444';
      ctx.strokeStyle = isUp ? '#10b981' : '#ef4444';
      ctx.lineWidth = 1;

      // Draw wick (high-low line)
      ctx.beginPath();
      ctx.moveTo(x + candleWidth / 2, highY);
      ctx.lineTo(x + candleWidth / 2, lowY);
      ctx.stroke();

      // Draw body (open-close rectangle)
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY);
      
      if (bodyHeight > 0) {
        ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
      } else {
        // Doji case (open = close)
        ctx.beginPath();
        ctx.moveTo(x, closeY);
        ctx.lineTo(x + candleWidth, closeY);
        ctx.stroke();
      }
    });

    // Draw price labels
    ctx.fillStyle = theme === 'dark' ? '#d1d5db' : '#374151';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (i * priceRange / 5);
      const y = canvas.height - padding - (i * chartHeight / 5);
      ctx.fillText(`₹${price.toFixed(2)}`, padding - 10, y + 4);
    }

    // Draw title
    ctx.textAlign = 'left';
    ctx.font = 'bold 16px system-ui';
    ctx.fillText('Candlestick Chart', padding, 30);

  }, [data, height, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full border border-gray-200 dark:border-gray-700 rounded"
      style={{ height }}
    />
  );
};

export default TradingChart;