import { create } from "zustand";
import { v } from "../styles/variables";


export const useOperations = create((set, get) => ({
    titleBtnDropDown: "Categoría ingresos",
    colorCategory: () => v.colorIngresos,
    bgCategory: () => v.colorbgingresos,
    type: "i",
    setType: (p) => {
        set({ type: p })

        set({
            titleBtnDropDown: p.text,
            colorCategory: p.color,
            bgCategory: p.bgColor,
        })

    }
}))