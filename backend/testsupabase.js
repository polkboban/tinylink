// Example: Test Supabase connection
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from('urls').select('*').limit(1);
  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Supabase data:', data);
  }
}

async function insertUrl() {
  const { data, error } = await supabase
    .from('urls')
    .insert([
      {
        short_code: 'abc123',           // your short code
        original_url: 'https://example.com', // your original URL
        created_at: new Date().toISOString(), // optional, if not auto-generated
        is_active: true,                      // optional
        click_count: 0                        // optional
      }
    ]);
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Inserted:', data);
  }
}

testConnection();
insertUrl();