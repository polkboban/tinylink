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

testConnection();