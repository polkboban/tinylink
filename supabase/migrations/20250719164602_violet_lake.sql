/*
  # Create URL shortener schema

  1. New Tables
    - `urls`
      - `id` (uuid, primary key)
      - `short_code` (text, unique) - The short identifier (e.g., "abc123")
      - `original_url` (text) - The original long URL
      - `custom_alias` (boolean) - Whether this was a custom alias
      - `created_at` (timestamp)
      - `expires_at` (nullable timestamp) - Optional expiration time
      - `click_count` (integer) - Number of times accessed
      - `user_id` (uuid, nullable) - For future multi-user support
      - `is_active` (boolean) - Whether the link is active

  2. Security
    - Enable RLS on `urls` table
    - Add policies for public access (since URL shortener needs to be publicly accessible)
    - Add indexes for performance

  3. Features
    - Unique constraint on short_code
    - Default values for click_count and is_active
    - Index on short_code for fast lookups
*/

CREATE TABLE IF NOT EXISTS urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code text UNIQUE NOT NULL,
  original_url text NOT NULL,
  custom_alias boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT NULL,
  click_count integer DEFAULT 0,
  user_id uuid DEFAULT NULL,
  is_active boolean DEFAULT true
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at);
CREATE INDEX IF NOT EXISTS idx_urls_expires_at ON urls(expires_at) WHERE expires_at IS NOT NULL;

-- Enable RLS
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (needed for redirects)
CREATE POLICY "Public can read active URLs"
  ON urls
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Policy for public insert (allow anyone to create short URLs)
CREATE POLICY "Public can create URLs"
  ON urls
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy for updating click counts
CREATE POLICY "Public can update click counts"
  ON urls
  FOR UPDATE
  TO anon
  USING (is_active = true)
  WITH CHECK (is_active = true);