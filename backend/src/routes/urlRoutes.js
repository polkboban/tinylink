import express from 'express';
import { createShortUrl, getOriginalUrl, getUrlStats } from '../services/urlService.js';
import { createUrlLimiter, redirectLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * POST /api/shorten
 * Create a new short URL
 */
router.post('/shorten', createUrlLimiter, async (req, res) => {
  try {
    const { url, customAlias, expiresIn } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }

    // Calculate expiration date if expiresIn is provided
    let expiresAt = null;
    if (expiresIn) {
      const now = new Date();
      
      // Handle different time formats
      if (typeof expiresIn === 'number') {
        // Assume milliseconds
        expiresAt = new Date(now.getTime() + expiresIn);
      } else if (typeof expiresIn === 'string') {
        // Parse string formats like "7d", "1h", "30m"
        const match = expiresIn.match(/^(\d+)([dhm])$/);
        if (match) {
          const [, amount, unit] = match;
          const milliseconds = {
            m: parseInt(amount) * 60 * 1000,
            h: parseInt(amount) * 60 * 60 * 1000,
            d: parseInt(amount) * 24 * 60 * 60 * 1000
          };
          expiresAt = new Date(now.getTime() + milliseconds[unit]);
        }
      }
    }

    const result = await createShortUrl(url, customAlias, expiresAt);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json(result);

  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /api/stats/:shortCode
 * Get statistics for a short URL
 */
router.get('/stats/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await getUrlStats(shortCode);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);

  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;