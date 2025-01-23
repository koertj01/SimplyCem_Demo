import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Load environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Missing Supabase URL or Key!");
} else {
  console.log("Successfully connected to Supabase!");
}

// Create and export the Supabase client
export var supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
