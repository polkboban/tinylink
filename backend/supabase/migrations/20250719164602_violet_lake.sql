-- Create URL shortener schema

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

-- indexes for performance
CREATE INDEX IF NOT EXISTS idx_urls_short_code ON urls(short_code);
CREATE INDEX IF NOT EXISTS idx_urls_created_at ON urls(created_at);
CREATE INDEX IF NOT EXISTS idx_urls_expires_at ON urls(expires_at) WHERE expires_at IS NOT NULL;

-- enable rls
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- policy to allow reading active URLs
CREATE POLICY "Public can read active URLs"
  ON urls
  FOR SELECT
  TO anon
  USING (is_active = true);

-- policy to allow creating new URLs
CREATE POLICY "Public can create URLs"
  ON urls
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- policy to allow updating click counts (only if the URL is active)
CREATE POLICY "Public can update click counts"
  ON urls
  FOR UPDATE
  TO anon
  USING (is_active = true)
  WITH CHECK (is_active = true);