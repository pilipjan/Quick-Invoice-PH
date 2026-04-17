import { createBrowserClient } from '@supabase/ssr'

// Keep a single instance for the entire browser session
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (supabaseClient) return supabaseClient;

  // Provide fallbacks so the app doesn't crash entirely if envs are missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL. Using placeholder.');
  }

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  
  return supabaseClient;
}
