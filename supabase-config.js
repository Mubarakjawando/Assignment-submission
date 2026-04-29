const SUPABASE_URL = "https://sxlihyinrfetblcwdivy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bGloeWlucmZldGJsY3dkaXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODgwODcsImV4cCI6MjA5MjU2NDA4N30.R-V5FrNGjDBJy6aitySP8UDLFCrrSOxsfuTNJohMAMA"; 

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);