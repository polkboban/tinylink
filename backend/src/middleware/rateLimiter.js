import rateLimit from 'express-rate-limit';

// rate limiter
export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50, 
  message: {
    error: 'Too many URL creation requests from this IP'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, 
  message: {
    error: 'Too many redirect requests from this IP'
  },
  standardHeaders: true,
  legacyHeaders: false,
});