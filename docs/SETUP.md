# Setup Instructions

## Prerequisites

Before setting up the Indian Equity Trading Platform, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: Latest version

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lglovey1907-bit/Indian-Equity.git
cd Indian-Equity
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```env
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   
   # Database (when implemented)
   DATABASE_URL=postgresql://username:password@localhost:5432/indian_equity
   
   # Redis (when implemented)
   REDIS_URL=redis://localhost:6379
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Market Data API Keys (when integrated)
   NSE_API_KEY=your-nse-api-key
   BSE_API_KEY=your-bse-api-key
   ```

5. Build the backend:
   ```bash
   npm run build
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be running at `http://localhost:3001`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.local.example .env.local
   ```

4. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_WS_URL=ws://localhost:3001
   ```

5. Build the frontend:
   ```bash
   npm run build
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be running at `http://localhost:3000`

## Development Workflow

### Backend Development

1. **Start development server** (with auto-reload):
   ```bash
   cd backend
   npm run dev
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Start production server**:
   ```bash
   npm start
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

5. **Lint code**:
   ```bash
   npm run lint
   ```

### Frontend Development

1. **Start development server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Start production server**:
   ```bash
   npm start
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

5. **Lint code**:
   ```bash
   npm run lint
   ```

## Database Setup (Future Implementation)

When PostgreSQL is integrated:

1. **Install PostgreSQL**:
   - Download and install from [postgresql.org](https://www.postgresql.org/download/)

2. **Create database**:
   ```sql
   CREATE DATABASE indian_equity;
   CREATE USER indian_equity_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE indian_equity TO indian_equity_user;
   ```

3. **Run migrations**:
   ```bash
   cd backend
   npm run migrate
   ```

## Redis Setup (Future Implementation)

When Redis caching is implemented:

1. **Install Redis**:
   - On macOS: `brew install redis`
   - On Ubuntu: `sudo apt-get install redis-server`
   - On Windows: Download from [redis.io](https://redis.io/download)

2. **Start Redis server**:
   ```bash
   redis-server
   ```

## IDE Setup

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## Troubleshooting

### Common Issues

1. **Port conflicts**:
   - If port 3000 or 3001 are already in use, modify the ports in the respective package.json files

2. **Node.js version issues**:
   - Ensure you're using Node.js 18+
   - Use `nvm` to manage Node.js versions if needed

3. **Permission errors**:
   - On Unix systems, you might need to use `sudo` for global npm installations
   - Consider using `nvm` to avoid permission issues

4. **Module not found errors**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

### Frontend Specific Issues

1. **Build errors**:
   ```bash
   rm -rf .next
   npm run build
   ```

2. **TypeScript errors**:
   - Check `tsconfig.json` configuration
   - Ensure all types are properly imported

### Backend Specific Issues

1. **Build errors**:
   ```bash
   rm -rf dist
   npm run build
   ```

2. **WebSocket connection issues**:
   - Check CORS configuration
   - Verify port settings

## Next Steps

After successful setup:

1. Visit `http://localhost:3000` to access the application
2. Explore the dashboard and features
3. Check the API documentation at `http://localhost:3001/health`
4. Review the project structure and codebase
5. Start implementing additional features

## Production Deployment

For production deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Getting Help

If you encounter issues:

1. Check this documentation
2. Search existing GitHub issues
3. Create a new issue with detailed error information
4. Join our community discussions