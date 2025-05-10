import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase with:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);