import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, 
                 import.meta.env.VITE_SUPABASE_ANON_KEY)
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
