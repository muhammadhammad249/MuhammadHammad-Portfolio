import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://siiucfkyaigylhpdquif.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_6UAGk7cjIUx-VnNT6fYvzQ_pQ7rlAhW';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
