import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: './frontend/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('cases')
    .select('*, client:profiles!client_id(full_name, email)')
    .limit(1);

  if (error) {
    console.error('Error fetching with client_id:', error.message);
  } else {
    console.log('Success with client_id:', data);
  }

  const { data: data2, error: error2 } = await supabase
    .from('cases')
    .select('*, profiles!cases_client_id_fkey(full_name, email)')
    .limit(1);
    
  if (error2) {
    console.error('Error fetching with cases_client_id_fkey:', error2.message);
  } else {
    console.log('Success with cases_client_id_fkey:', data2);
  }
}

main();
