import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Set BASE_URL if not in environment
if (!process.env.BASE_URL) {
  process.env.BASE_URL = BASE_URL;
}

app.listen(PORT, () => {
  console.log(`🚀 TinyLink URL Shortener API is running on ${BASE_URL}`);
  console.log(`📊 Health check: ${BASE_URL}/health`);
  console.log(`📝 API docs: ${BASE_URL}/api`);
  console.log('');
  console.log('🔗 Example usage:');
  console.log(`   POST ${BASE_URL}/api/shorten`);
  console.log(`   GET  ${BASE_URL}/abc123 (redirects)`);
  console.log(`   GET  ${BASE_URL}/api/stats/abc123`);
});