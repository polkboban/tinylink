import express from 'express';
import { getOriginalUrl } from '../services/urlService.js';
import { redirectLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * GET /:shortCode
 * Redirect to original URL
 */
router.get('/:shortCode', redirectLimiter, async (req, res) => {
  try {
    const { shortCode } = req.params;

    const result = await getOriginalUrl(shortCode);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        error: result.error
      });
    }

    // Redirect to the original URL
    res.redirect(301, result.data.originalUrl);

  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;