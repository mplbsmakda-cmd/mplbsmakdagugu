import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://svhqmofvcofqgnzbypph.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aHFtb2Z2Y29mcWduemJ5cHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODUyMDEsImV4cCI6MjA3OTM2MTIwMX0.lO7AwE25kQyUyQf5WE0OjqHKwC2mfxxhCRtb6xJRt0c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
