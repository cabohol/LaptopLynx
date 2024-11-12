import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Form Action Utils
export const formActionDefault = {
    formProcess: false,
    formStatus: 200,
    formErrorMessage: '',
    formSuccessMessage: ''
}

export const isAuthenticated = async () => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log("Session Data:", sessionData);

    if (sessionError || !sessionData.session) {
      //console.error('Error getting session:', sessionError ? sessionError.message : "No active session");
      return { isAuthenticated: false, user: null };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error getting user data:', userError.message);
      return { isAuthenticated: true, user: null };
    }

    console.log("Authenticated User:", userData.user);
    return {
      isAuthenticated: true,
      user: userData.user
    };
  } catch (error) {
    console.error("Unexpected error in isAuthenticated:", error);
    return { isAuthenticated: false, user: null };
  }
};



