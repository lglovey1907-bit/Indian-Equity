import express from 'express'
const router = express.Router()

// Mock authentication endpoints
router.post('/login', (req, res) => {
  const { email, password } = req.body
  
  // Mock authentication logic
  if (email && password) {
    res.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email,
          name: 'Test User',
          preferences: {
            theme: 'light',
            language: 'en',
            defaultExchange: 'NSE',
            chartType: 'candlestick'
          }
        }
      }
    })
  } else {
    res.status(400).json({
      success: false,
      error: 'Invalid credentials'
    })
  }
})

router.post('/register', (req, res) => {
  const { email, password, name } = req.body
  
  if (email && password && name) {
    res.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email,
          name,
          preferences: {
            theme: 'light',
            language: 'en',
            defaultExchange: 'NSE',
            chartType: 'candlestick'
          }
        }
      }
    })
  } else {
    res.status(400).json({
      success: false,
      error: 'Missing required fields'
    })
  }
})

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  })
})

router.get('/profile', (req, res) => {
  // Mock profile data
  res.json({
    success: true,
    data: {
      id: '1',
      email: 'user@example.com',
      name: 'Test User',
      preferences: {
        theme: 'light',
        language: 'en',
        defaultExchange: 'NSE',
        chartType: 'candlestick'
      }
    }
  })
})

module.exports = router