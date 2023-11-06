import Swal from "sweetalert2";
import { getIdAuthSupabase } from "./auth";
import { supabase } from "./supabase.config";

export const userInsert = async (p) => {
  try {
    const { data } = await supabase.from("users").insert(p).select();
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const userGet = async () => {
  const idAUthSupabase = await getIdAuthSupabase();
  try {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("idauth_supabase", idAUthSupabase)
      .maybeSingle();
    // if (error) {
    //   alert("useGet", error);
    //   return null;
    // }
    return data;
  } catch (error) {
    // alert(error.error_description || error.message + "userGet");
    // return null;
  }
};

export const userUpdate = async (p) => {
  try {
    const { error } = await supabase.from("users").update(p).eq("id", p.id);
    if (error) alert("Error al editar usuario.", error);
    Swal.fire({
      //position: "top-end",
      icon: "success",
      title: "Datos modificados",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    alert(error.error_description || error.message + "userUpdate");
    return null;
  }
};
