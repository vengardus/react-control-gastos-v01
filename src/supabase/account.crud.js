import { supabase } from "./supabase.config";

const TABLE_NAME = "accounts";
export const accountGet = async (p) => {
  try {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select()
      .eq("id_user", p.id_user)
      .maybeSingle();
    console.log('accountGet', data, p)
    return data;
  } catch (error) {
    console.log(error, "accountGet");
  }
};
