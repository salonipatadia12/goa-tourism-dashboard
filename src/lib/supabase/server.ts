/**
 * Supabase Server Client
 *
 * For use in:
 * - API routes
 * - Server components
 * - Server actions
 *
 * Uses the service role key for admin operations (bypassing RLS)
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Server-side Supabase client with service role privileges
 * Use this for:
 * - Agent operations (inserting data)
 * - Admin operations
 * - Operations that need to bypass RLS
 *
 * Note: Client is created even if env vars are missing (with empty strings).
 * Always check isSupabaseConfigured() before making queries.
 */
export const supabaseServer = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceKey);
}

/**
 * Helper to check Supabase connection
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabaseServer.from('agent_runs').select('count').limit(1);

    if (error) {
      return { connected: false, error: error.message };
    }

    return { connected: true };
  } catch (error: any) {
    return { connected: false, error: error.message || 'Unknown error' };
  }
}
