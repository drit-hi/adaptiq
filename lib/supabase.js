import { createClient } from "@supabase/supabase-js";

// Strip the `/rest/v1/` suffix that is present in the configured env var —
// the JS client constructs its own REST path internally.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "");

export const supabase = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
