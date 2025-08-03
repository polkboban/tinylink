import { nanoid, customAlphabet } from 'nanoid';

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const generateId = customAlphabet(alphabet, 6);

/**
 * @param {number} length - Length of the short code (default: 6)
 * @returns {string} - Generated short code
 */
export function generateShortCode(length = 6) {
  if (length !== 6) {
    const customGenerator = customAlphabet(alphabet, length);
    return customGenerator();
  }
  return generateId();
}

/**
 * @param {string} code - The code to validate
 * @returns {boolean} - Whether the code is valid
 */
export function isValidShortCode(code) {
  if (!code || typeof code !== 'string') return false;
  if (code.length < 3 || code.length > 20) return false;
  
  const validPattern = /^[a-zA-Z0-9-]+$/;
  return validPattern.test(code);
}

/**
 * Check if a short code is reserved
 * @param {string} code - The code to check
 * @returns {boolean} - Whether the code is reserved
 */
export function isReservedCode(code) {
  const reserved = [
    'api', 'admin', 'www', 'app', 'help', 'support', 'contact',
    'about', 'terms', 'privacy', 'blog', 'docs', 'status',
    'health', 'metrics', 'analytics', 'dashboard'
  ];
  
  return reserved.includes(code.toLowerCase());
}