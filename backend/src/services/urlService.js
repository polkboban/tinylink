import { supabase } from '../config/database.js';
import { generateShortCode, isValidShortCode, isReservedCode } from '../utils/shortCodeGenerator.js';
import { validateUrl } from '../utils/urlValidator.js';

/**
 * Create a new short URL
 * @param {string} originalUrl - The original URL to shorten
 * @param {string} customAlias - Optional custom alias
 * @param {Date} expiresAt - Optional expiration date
 * @returns {object} - Result with success status and data
 */
export async function createShortUrl(originalUrl, customAlias = null, expiresAt = null) {
  try {
    const urlValidation = validateUrl(originalUrl);
    if (!urlValidation.isValid) {
      return {
        success: false,
        error: urlValidation.error
      };
    }

    let shortCode;
    let isCustom = false;

    if (customAlias) {
      if (!isValidShortCode(customAlias)) {
        return {
          success: false,
          error: 'Custom alias must be 3-20 characters long and contain only letters, numbers, and hyphens'
        };
      }

      if (isReservedCode(customAlias)) {
        return {
          success: false,
          error: 'This alias is reserved and cannot be used'
        };
      }

      const { data: existing } = await supabase
        .from('urls')
        .select('id')
        .eq('short_code', customAlias)
        .eq('is_active', true)
        .single();

      if (existing) {
        return {
          success: false,
          error: 'This custom alias is already taken'
        };
      }

      shortCode = customAlias;
      isCustom = true;
    } else {
      let attempts = 0;
      const maxAttempts = 10;

      do {
        shortCode = generateShortCode();
        const { data: existing } = await supabase
          .from('urls')
          .select('id')
          .eq('short_code', shortCode)
          .single();

        if (!existing) break;

        attempts++;
      } while (attempts < maxAttempts);

      if (attempts >= maxAttempts) {
        return {
          success: false,
          error: 'Unable to generate unique short code. Please try again.'
        };
      }
    }

    const { data, error } = await supabase
      .from('urls')
      .insert({
        short_code: shortCode,
        original_url: originalUrl,
        custom_alias: isCustom,
        expires_at: expiresAt
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return {
        success: false,
        error: 'Failed to create short URL'
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
        shortCode: data.short_code,
        originalUrl: data.original_url,
        shortUrl: `${process.env.BASE_URL}/${data.short_code}`,
        createdAt: data.created_at,
        expiresAt: data.expires_at,
        clickCount: data.click_count
      }
    };

  } catch (error) {
    console.error('Service error:', error);
    return {
      success: false,
      error: 'Internal server error'
    };
  }
}

/**
 * Get original URL by short code and increment click count
 * @param {string} shortCode - The short code to look up
 * @returns {object} - Result with success status and data
 */
export async function getOriginalUrl(shortCode) {
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('*')
      .eq('short_code', shortCode)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return {
        success: false,
        error: 'Short URL not found'
      };
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return {
        success: false,
        error: 'This short URL has expired'
      };
    }

    supabase
      .from('urls')
      .update({ click_count: data.click_count + 1 })
      .eq('id', data.id)
      .then()
      .catch(err => console.error('Failed to update click count:', err));

    return {
      success: true,
      data: {
        originalUrl: data.original_url,
        clickCount: data.click_count + 1
      }
    };

  } catch (error) {
    console.error('Service error:', error);
    return {
      success: false,
      error: 'Internal server error'
    };
  }
}

/**
 * Get URL statistics
 * @param {string} shortCode - The short code to get stats for
 * @returns {object} - Result with success status and data
 */
export async function getUrlStats(shortCode) {
  try {
    const { data, error } = await supabase
      .from('urls')
      .select('*')
      .eq('short_code', shortCode)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return {
        success: false,
        error: 'Short URL not found'
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
        shortCode: data.short_code,
        originalUrl: data.original_url,
        shortUrl: `${process.env.BASE_URL}/${data.short_code}`,
        createdAt: data.created_at,
        expiresAt: data.expires_at,
        clickCount: data.click_count,
        isExpired: data.expires_at ? new Date(data.expires_at) < new Date() : false,
        isCustomAlias: data.custom_alias
      }
    };

  } catch (error) {
    console.error('Service error:', error);
    return {
      success: false,
      error: 'Internal server error'
    };
  }
}