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
            async (sesion) => {
                if (sesion == null) {
                    setUser(null)
                }
                else {
                    console.log('sesion', sesion)
                    setUser(sesion)
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