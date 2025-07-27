# TinyLink - Scalable URL Shortener API

A production-ready URL shortener service similar to Bit.ly, built with Node.js, Express, and Supabase.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, memorable links
- **Custom Aliases**: Allow users to create custom short codes
- **Click Tracking**: Track and analyze link performance
- **Expiration Support**: Set automatic expiration times for links
- **Rate Limiting**: Protect against abuse with intelligent rate limiting
- **Security**: URL validation and malicious content detection
- **Analytics**: Detailed statistics for each shortened URL

## 📊 API Endpoints

### Create Short URL
```http
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/very/long/url",
  "customAlias": "my-link",     // Optional
  "expiresIn": "7d"             // Optional: 7d, 1h, 30m
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "shortCode": "my-link",
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://localhost:3000/my-link",
    "createdAt": "2025-01-08T...",
    "expiresAt": "2025-01-15T...",
    "clickCount": 0
  }
}
```

### Redirect to Original URL
```http
GET /{shortCode}
```
Automatically redirects to the original URL and increments click count.

### Get URL Statistics
```http
GET /api/stats/{shortCode}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shortCode": "my-link",
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://localhost:3000/my-link",
    "createdAt": "2025-01-08T...",
    "expiresAt": "2025-01-15T...",
    "clickCount": 42,
    "isExpired": false,
    "isCustomAlias": true
  }
}
```

### Health Check
```http
GET /health
```

## 🛠️ Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Supabase**
   - Create a new Supabase project
   - Click "Connect to Supabase" in the top right
   - Copy the environment variables to `.env`

3. **Set Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Run the Server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `PORT`: Server port (default: 3000)
- `BASE_URL`: Base URL for short links (default: http://localhost:3000)

### Expiration Formats

- `"30m"` - 30 minutes
- `"2h"` - 2 hours  
- `"7d"` - 7 days
- `86400000` - Milliseconds (24 hours)

## 🔒 Security Features

- **Rate Limiting**: 50 URL creations per 15 minutes, 100 redirects per minute
- **URL Validation**: Prevents malicious URLs and ensures proper formatting
- **Reserved Codes**: Blocks common system paths (api, admin, www, etc.)
- **Expiration**: Automatic cleanup of expired links
- **CORS & Helmet**: Security headers and cross-origin protection

## 📈 Performance

- **Database Indexing**: Optimized queries with proper indexes
- **Async Operations**: Non-blocking click count updates
- **Efficient Short Codes**: Base62 encoding for compact URLs
- **Caching Ready**: Designed for Redis integration

## 🏗️ Architecture

```
src/
├── config/         # Database and configuration
├── middleware/     # Rate limiting and validation
├── routes/         # API endpoints
├── services/       # Business logic
└── utils/          # Helper functions
```

## 🔄 Database Schema

The `urls` table stores:
- `short_code`: Unique identifier (indexed)
- `original_url`: Target URL
- `click_count`: Analytics counter
- `expires_at`: Optional expiration
- `custom_alias`: Whether user-provided
- `is_active`: Soft deletion flag

## 📝 Example Usage

```bash
# Create a short URL
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/example/repo", "expiresIn": "1d"}'

# Visit the short URL (redirects)
curl -L http://localhost:3000/abc123

# Get statistics
curl http://localhost:3000/api/stats/abc123
```

## 📊 Monitoring

- Health check endpoint: `/health`
- Built-in error logging
- Request/response tracking
- Click analytics