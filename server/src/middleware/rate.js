// src/middleware/rateLimiter.js
const rateLimit = require("express-rate-limit");

// General API Rate Limiter (e.g., 100 requests per 15 minutes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

// Stricter Rate Limiter for Authentication / Login (e.g., 100 requests per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // You can lower this further (e.g., 5 or 10) if you want extra security for login attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts from this IP, please try again after 15 minutes",
  },
});

module.exports = { apiLimiter, authLimiter };