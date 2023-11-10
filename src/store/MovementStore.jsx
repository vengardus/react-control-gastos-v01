import { create } from "zustand";
import { 
    movementDelete, 
    movementDeleteAll, 
    movementGetByMonthYear, 
    movementRptByMonthYear, 
    movementInsert 
} from "../supabase/movement.crud";


export const useMovementStore = create((set, get) => ({
    dataMovement: [],
    dataRptMovimientosAñoMes:[],
    totalMonthYear: 0,
    totalMonthYearPagados: 0,
    totalMonthYearPendientes: 0,
    parametros: {},

    movementGet: async (p) => {
        const response = await movementGetByMonthYear(p)
        //movementGetByMonthYear(p)
        console.log("movementget", response, p)
        const calculateTotals = get().calculateTotals
        calculateTotals(response)
        set(()=> ({
            dataMovement: response,
            parametros: p
        }))
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

    },

    movementInsert: async (p) => {
        await movementInsert(p);

        const movementGet = get().movementGet;
        const parametros = get().parametros;
        movementGet(parametros)
    },

    movimentDelete: async (p) => {
        await movementDeleteAll(p);
        const { parametros } = get();
        const { movementGet } = get();
        set(movementGet(parametros));
    },

    rptMovimientosAñoMes: async (p) => {
        const response = await movementRptByMonthYear(p);
        set({ dataRptMovimientosAñoMes: response });
        return response;
    },
}))