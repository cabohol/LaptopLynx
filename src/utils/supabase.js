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
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    // console.error('Error getting session:', sessionError.message);
    return { isAuthenticated: false, user: null };
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    // console.error('Error getting user data:', userError.message);
    return { isAuthenticated: !!sessionData.session, user: null };
  }

  return {
    isAuthenticated: !!sessionData.session,
    user: userData.user // Return the user data along with authentication status
  };
};

