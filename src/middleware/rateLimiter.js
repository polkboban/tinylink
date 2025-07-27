import rateLimit from 'express-rate-limit';

// Rate limiter for URL creation
export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: {
    error: 'Too many URL creation requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for redirects (more permissive)
export const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 redirects per minute
  message: {
    error: 'Too many redirect requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});