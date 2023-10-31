import { getIdAuthSupabase } from "./auth"
import { supabase } from "./supabase.config"

export const userInsert = async(p) => {
    try {
        console.log("dataProvider", p)
        const {data} = await supabase.from("users").insert(p).select()
        console.log('userInsert', data)
        return data
    }
    catch (error) {
        console.log('Error:', error)
        return null
    }
}

export const userGet = async () => {
    const idAUthSupabase = await getIdAuthSupabase()
    console.log("IDAUTH", idAUthSupabase)
    try {
        const {error, data} = await supabase
        .from('users')
        .select()
        .eq("idauth_supabase", idAUthSupabase)
        if ( error ) {
            alert("useGet", error)
            return null
        }
        console.log('DATA', data)
        return data? data[0] : null
    }
    catch (error) {
        alert(error.error_description || error.message + "userGet")
        return null
    }
}