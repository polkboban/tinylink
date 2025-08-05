# TinyLink - Scalable URL Shortener API

A production-ready URL shortener service similar to Bit.ly, built with Node.js, Express, and Supabase.

## Features

- **URL Shortening**: Convert long URLs into short, memorable links
- **Custom Aliases**: Allow users to create custom short codes
- **Click Tracking**: Track and analyze link performance
- **Expiration Support**: Set automatic expiration times for links
- **Rate Limiting**: Protect against abuse with intelligent rate limiting
- **Security**: URL validation and malicious content detection
- **Analytics**: Detailed statistics for each shortened URL

##  API Endpoints

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

##  Setup

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


```
