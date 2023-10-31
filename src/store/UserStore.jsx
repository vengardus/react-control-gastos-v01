import { create } from "zustand";
import { userGet } from "../supabase/user.crud";


export const useUserStore = create((set) => ({
    dataUser: [],
    userGet: async () => {
        const data = await userGet()
        set({ dataUser: data })
        return data
    }
}))