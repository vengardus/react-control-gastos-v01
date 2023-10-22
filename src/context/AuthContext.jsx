import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import PropTypes  from "prop-types"
import { supabase } from "../supabase/supabase.config";


const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, sesion) => {
                if (sesion == null) {
                    setUser(null)
                }
                else {
                    console.log('event', event)
                    console.log('sesion', sesion.user?.id, sesion.user?.email, sesion.user?.user_metadata)
                    setUser(sesion.user)
                }
            }
        )
        return () => {
            authListener.subscription
        }
    }, [])

    return <AuthContext.Provider value={{ user }}>
        {props.children}
    </AuthContext.Provider>
}

AuthContextProvider.propTypes = {
    children: PropTypes.any
}

export const UserAuth = () => {
    return useContext(AuthContext)
}