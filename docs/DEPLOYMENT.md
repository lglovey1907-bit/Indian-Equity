# Deployment Guide

This guide covers different deployment strategies for the Indian Equity Market Trading Platform.

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose (for containerized deployment)
- PM2 (for process management in production)
- Nginx (for reverse proxy in production)

## Local Development

### Quick Start
```bash
# Clone the repository
git clone https://github.com/lglovey1907-bit/Indian-Equity.git
cd Indian-Equity

# Start backend
cd backend
npm install
npm run dev

# Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` files in both frontend and backend directories with the required environment variables as shown in the main README.

## Production Deployment

### Option 1: Docker Deployment (Recommended)

#### Simple Docker Compose
```bash
# Production deployment with Docker Compose
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Production Docker Compose
Create `docker-compose.prod.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - FRONTEND_URL=https://your-domain.com
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.your-domain.com
      - NEXT_PUBLIC_WS_URL=wss://api.your-domain.com/ws
    restart: unless-stopped
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - frontend
      - backend
```

### Option 2: Manual Deployment

#### Backend Deployment
```bash
cd backend

# Install dependencies
npm install --production

# Build the application
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start dist/index.js --name "indian-equity-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

#### Frontend Deployment
```bash
cd frontend

# Install dependencies
npm install

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "indian-equity-frontend" -- start

# Or start with standalone server
npm start
```

### Option 3: Cloud Platform Deployment

#### Vercel Deployment (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

#### Railway/Heroku Deployment (Backend)
```bash
# For Railway
railway login
railway deploy

# For Heroku
heroku create indian-equity-backend
git push heroku main
```

#### AWS EC2 Deployment
```bash
# Connect to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and deploy
git clone https://github.com/lglovey1907-bit/Indian-Equity.git
cd Indian-Equity

# Follow manual deployment steps above
```

## Nginx Configuration

Create `/etc/nginx/sites-available/indian-equity`:
```nginx
upstream backend {
    server localhost:3001;
}

upstream frontend {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/ssl/certs/your-cert.pem;
    ssl_certificate_key /etc/ssl/private/your-key.pem;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
```

## SSL Certificate Setup

### Using Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Environment-Specific Configuration

### Production Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com
MONGODB_URI=mongodb://your-mongodb-url/indian-equity
JWT_SECRET=your-secure-jwt-secret
LOG_LEVEL=info
CORS_ORIGIN=https://your-domain.com
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
NEXT_PUBLIC_WS_URL=wss://api.your-domain.com/ws
NODE_ENV=production
```

## Monitoring and Health Checks

### PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart indian-equity-backend

# Check status
pm2 status
```

### Health Check Endpoints
- Backend: `GET https://api.your-domain.com/health`
- Frontend: Built-in Next.js health checks

## Performance Optimization

### Frontend Optimizations
```bash
# Enable Next.js optimizations in next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### Backend Optimizations
- Enable gzip compression
- Implement Redis caching for frequently accessed data
- Use connection pooling for database connections
- Enable HTTP/2 for better performance

## Backup and Disaster Recovery

### Database Backups
```bash
# MongoDB backup (when implemented)
mongodump --uri="mongodb://your-mongodb-url" --out=/backup/$(date +%Y%m%d)

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://your-mongodb-url" --out="$BACKUP_DIR/backup_$DATE"
```

### Application Backups
- Regular Git repository backups
- Environment configuration backups
- SSL certificate backups
- Log file archival

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration (HAProxy/Nginx)
- Multiple backend instances
- Session persistence with Redis
- Database replication

### Vertical Scaling
- Resource monitoring and optimization
- Memory and CPU usage analysis
- Database query optimization
- WebSocket connection optimization

## Troubleshooting

### Common Issues

1. **WebSocket Connection Failures**
   - Check firewall settings
   - Verify proxy configuration
   - Ensure WebSocket headers are properly set

2. **Build Failures**
   - Clear node_modules and package-lock.json
   - Verify Node.js version compatibility
   - Check TypeScript compilation errors

3. **Performance Issues**
   - Monitor memory usage
   - Check for memory leaks
   - Optimize database queries
   - Review WebSocket connection pooling

### Debugging Tools
```bash
# Backend debugging
DEBUG=* npm run dev

# Frontend debugging
npm run dev -- --debug

# Docker debugging
docker-compose logs -f [service-name]
```

## Security Checklist

- [ ] SSL/TLS certificates configured
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] Regular security updates applied
- [ ] Firewall rules configured
- [ ] Database security measures in place