import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/constant'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase environment variables are not configured');
}

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)
