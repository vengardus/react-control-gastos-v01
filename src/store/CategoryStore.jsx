import { create } from "zustand";
import { 
    categoryGet, 
    categoryUpdate, 
    categoryInsert, 
    categoryDelete, 
    categoryDeleteAll
} from "../supabase/category.crud";


export const useCategoryStore = create((set, get) => ({
    dataCategory: [],
    categoryGet: async (p) => {
        const data = await categoryGet(p)
        set({ dataCategory: data?? [] })
        console.log('categoryGet', data)
        return data?? []
    },

    categoryInsert: async(p) => {
        await categoryInsert(p)
        const {categoryGet} = get()
        set(categoryGet(p))
    },

    categoryUpdate: async(p) => {
        await categoryUpdate(p)
        const {categoryGet} = get()
        set(categoryGet)
    },

    categoryDelete: async(p) => {
        await categoryDelete(p)
        const {categoryGet} = get()
        set(categoryGet)
    },

    categoryDeleteAll: async(p) => {
        await categoryDeleteAll(p)
        const {categoryGet} = get()
        set(categoryGet)
    },


}))