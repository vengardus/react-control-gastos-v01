import { create } from "zustand"
import { supabase } from "../supabase/supabase.config";


export const useAuthStore = create((set) => ({
    isAuth: false,
    signInWithGoogle: async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google"
            })
            if (error) throw new error('Ocurrió un error durante la autenticación.')
            set({ isAuth: true })
            console.log('SignIn-data', data)
            return data
        }
        catch (error) {
            console.log(error)
        }
    },
    signOut: async () => {
        const {error} = supabase.auth.signOut()
        if ( error) throw new error('Ocurrió un error durante el cierre de sedión')
        set({isAuth:false})
    }
}))