import { create } from "zustand";
import { accountGet } from "../supabase/account.crud";

export const useAccountStore = create((set, get) => ({
    dataAccount: [],
    cuentaItemSelect: [],
    accountGet: async (p) => {
        const data = await accountGet(p)
        console.log('accountStore', data, 'ed')
        //set(() => ({ dataAccount: data, cuentaItemSelect: data }))
        set({
            dataAccount: data,
            cuentaItemSelect: data
        })
        //const { dataAccount } = get()
        //console.log('dataAccount:::', dataAccount)
        return data
    }
}))