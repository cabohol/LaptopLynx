import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
<<<<<<< HEAD
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, 
                 import.meta.env.VITE_SUPABASE_ANON_KEY)
=======
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_ANON_KEY
)


//Form Action Utils
export const formActionDefault = {
    formProcess: false,
    formStatus: 200,
    formErrorMessage: '',
    formSuccessMessage: ''
}
>>>>>>> db8be9c1fb76e480c021e347c8f7bf1735827a3b
