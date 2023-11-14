import { create } from "zustand";
import { userGet, userUpdate, UserModel } from "../supabase/user.crud";


export const useUserStore = create((set, get) => ({
    dataUser: [], 
    userGet: async () => {
        //const data = await userGet()
        const data = await UserModel.get()
        set({ dataUser: data })
        return data?? []
    },
    userUpdate: async(p) => {
        await userUpdate(p)
        const {userGet} = get()
        set(userGet)
    }
}))