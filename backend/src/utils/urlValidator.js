import validator from 'validator';

/**
 * Validate if a URL is properly formatted and safe
 * @param {string} url - The URL to validate
 * @returns {object} - Validation result with isValid and error
 */
export function validateUrl(url) {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'URL is required and must be a string' };
  }

  // Check if URL is properly formatted
  if (!validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true
  })) {
    return { isValid: false, error: 'Invalid URL format. Must include http:// or https://' };
  }
  
  // Only block dangerous file extensions
  const maliciousPatterns = [
    /\.(exe|bat|cmd|scr|pif)$/i
  ];

  for (const pattern of maliciousPatterns) {
    if (pattern.test(url)) {
      return { isValid: false, error: 'URL contains potentially unsafe content' };
    }
  }
  
  // Check URL length
  if (url.length > 2048) {
    return { isValid: false, error: 'URL is too long (maximum 2048 characters)' };
  }

  return { isValid: true };
}

/**
 * Normalize a URL by ensuring it has a protocol
 * @param {string} url - The URL to normalize
 * @returns {string} - Normalized URL
 */
export function normalizeUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}