import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import PropTypes  from "prop-types"
import { supabase } from "../supabase/supabase.config";
import { userInsert } from "../supabase/user.crud";


const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session == null) {
                    setUser(null)
                }
                else {
                    //console.log('event', event)
                    //console.log('sesion', session.user?.id, session.user?.user_metadata)
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
        //console.log('Insert', data)
    }

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