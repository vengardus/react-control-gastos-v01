import { create } from "zustand";
import { v } from "../styles/variables";
import { APP_CONFIG } from "../utils/dataEstatica";


export const useOperations = create((set) => ({
    titleBtnDropDown: "Categoría ingresos",
    colorCategory: () => v.colorIngresos,
    bgCategory: () => v.colorbgingresos,
    type: APP_CONFIG.movementType.ingreso,
    setType: (p) => {
        set({ type: p })

        set({
            titleBtnDropDown: p.text,
            colorCategory: p.color,
            bgCategory: p.bgColor,
        })

    }
}))