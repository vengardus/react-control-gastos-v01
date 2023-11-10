import { create } from "zustand";
import { v } from "../styles/variables";
import { APP_CONFIG } from "../utils/dataEstatica";


export const useOperations = create((set, get) => ({
    titleBtnDropDown: "Categoría ingresos",
    titleBtnDropDownMovements: "Ingresos",
    colorCategory: v.colorIngresos,
    bgCategory: v.colorbgingresos,
    type: APP_CONFIG.movementType.ingreso,
    year: null,
    month: null,
    setYear: (p) => {
        set({ year: p })
    },
    setMonth: (p) => {
        set({ month: p })
    },
    setType: (p) => {
        set({
            type: p.tipo,
            titleBtnDropDown: p.text,
            titleBtnDropDownMovements: p.text,
            colorCategory: p.color,
            bgCategory: p.bgColor,
        })
        const { type } = get()
    }
}))