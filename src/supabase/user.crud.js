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