import { create } from "zustand";
import { movementGetByMonthYear } from "../supabase/movement.crud";


export const useMovementStore = create((set, get) => ({
    dataMovement: [],
    totalMonthYear: 0,
    totalMonthYearPagados: 0,
    totalMonthYearPendientes: 0,
    getMovements: async(p) => {
        const response = await movementGetByMonthYear(p)
        movementGetByMonthYear(p)
        const {calculateTotals} = get()
        calculateTotals(response)
        set({
            dataMovement: response
        })
        return response
    },
    calculateTotals: (response) => {
        const dtPagados = response.filter((item) => item.state === "1")
        const dtPendientes = response.filter((item) => item.state === "0")
        let total = 0
        let tPagados = 0
        let tPendientes = 0

        response.forEach(item => {
            const array = Object.values(item)
            total += array[2]   // columna values del sp
        });

        dtPagados.forEach(item => {
            const array = Object.values(item)
            tPagados += array[2]   // columna values del sp
        });

        dtPendientes.forEach(item => {
            const array = Object.values(item)
            tPendientes += array[2]   // columna values del sp
        });
        set({
            totalMonthYear: total,
            totalMonthYearPagados: tPagados,
            totalMonthYearPendientes: tPendientes
        })

    }
}))