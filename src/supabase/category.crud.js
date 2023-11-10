import Swal from "sweetalert2";
import { supabase } from "./supabase.config";

const TABLE_NAME = 'categories'

export const categoryInsert = async (p) => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(p)
      .select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
    if (data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos guardados",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " insertar categorias");
  }
};

export const categoryGet = async (p) => {
  try {
    const {data}  = await supabase
      .from(TABLE_NAME)
      .select()
      .eq("id_user", p.id_user?? 0)
      .eq("type", p.type?? '')
      .order("id", { ascending: false });
    return data;
  } catch (error) {
    console.log(error, "categoryGet");
  }
};

export const categoryDelete = async (p) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id_user", p.id_user)
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
};

export const categoryUpdate = async(p) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .update(p)
      .eq("id_user", p.id_user)
      .eq("id", p.id);
    if (error) {
      alert("Error al editar categoria", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar categorias");
  }
}

export const categoryDeleteAll = async (p) => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id_user", p.id_user)
    if (error) {
      alert("Error al eliminar", error);
    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registros eliminados",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar categorias");
  }
};
