import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jgpyqraladznpecesfsf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncHlxcmFsYWR6bnBlY2VzZnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDUxMjYsImV4cCI6MjA3NTY4MTEyNn0.imMNRzsbude3H-ZQqb2_iBcvWVCwfvsHTOiH04FO7Jk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
