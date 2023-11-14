import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
import { userInsert } from "../supabase/user.crud";


const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session == null) {
                    setUser(null)
                }
                else {
                    setUser(session.user.user_metadata)
                    _userInsert(session.user.user_metadata, session.user.id)
                }
            }
        )
        return () => {
            authListener.subscription
        }
    }, [])

    const _userInsert = async (dataProvider, idAuthSupabase) => {
        const p = {
            name: dataProvider.name,
            photo: dataProvider.picture,
            idauth_supabase: idAuthSupabase
        }
        await userInsert(p)
    }

    return <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
}

export const UserAuth = () => {
    return useContext(AuthContext)
}