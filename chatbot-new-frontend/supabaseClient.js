import { createClient } from "@supabase/supabase-js";

// Validate required environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error("SUPABASE_URL is required.");
if (!supabaseAnonKey) throw new Error("SUPABASE_ANON_KEY is required.");

// Correct client initialization
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Your function can use the supabase client
export const saveUserDetails = async (user) => {
  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError || !authUser) {
    console.error("User is not authenticated.");
    return;
  }

  const { email, name, gender } = user;

  const { error } = await supabase
    .from("user_details")
    .upsert([{ email, name, gender }], { onConflict: ["email"] });

  if (error) {
    console.error("Error saving user details:", error.message);
  } else {
    console.log("User details saved successfully!");
  }
};
