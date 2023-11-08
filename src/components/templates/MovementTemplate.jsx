import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import dayjs from "dayjs"
import { CalendarioLineal } from "../organismos/tablas/CalendarioLineal"
import { CardTotales } from "../organismos/CardTotales"
import { useOperations } from "../../store/OperationsStore"
import { APP_CONFIG } from "../../utils/dataEstatica"
import { v } from "../../styles/variables"
import { useMovementStore } from "../../store/MovementStore"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "../../store/UserStore"


export const MovementTemplate = () => {
    const [state, setState] = useState(false)
    const [value, setValue] = useState(dayjs(Date.now()))
    const [formatoFecha, setFormatoFecha] = useState("")
    const {
        type,
        setType,
        colorCategory,
        year,
        month
    } = useOperations()
    const {
        dataMovement,
        totalMonthYear,
        totalMonthYearPagados,
        totalMonthYearPendientes,
        getMovements
    } = useMovementStore()
    const { dataUser } = useUserStore()

    useQuery({
        queryKey: ['Mostrar movimientos month year'],
        queryFn: () => getMovements({
            mont: month,
            year: year,
            id_user: dataUser.id,
            type_category: type
        })
    })

    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>
            <section className="totales">
                <CardTotales
                    title={(type === APP_CONFIG.movementType.gasto)
                        ? "Gastos pendientes"
                        : "Ingresos pendientes"}
                    color={colorCategory}
                    icon={<v.flechaarribalarga />}
                />
                <CardTotales
                    title={(type === APP_CONFIG.movementType.gasto)
                        ? "Gastos pagados"
                        : "Ingresos pagados"}
                    color={colorCategory}
                    icon={<v.flechaabajolarga />}
                />
                <CardTotales
                    title={"Total"}
                    color={colorCategory}
                    icon={<v.balance />}
                />
            </section>
            <section className="calendario">
                <CalendarioLineal
                    value={value}
                    setValue={setValue}
                    setFormatoFecha={setFormatoFecha}
                />
            </section>
            <section className="main"></section>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    padding: 15px;
    width: 100%;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    display: grid;
    grid-template:
        "header" 100px
        "totales" 100px
        "calendario" 50px
        "main" auto;

    .header {
        grid-area: header;
        background-color: rgba(103, 93, 241, 0.14);
        display: flex;
        align-items: center;
    }
    .totales {
        grid-area: totales;
        background-color: rgba(229, 67, 26, 0.14);
        display: flex;
        align-items: center;
    }
    .calendario {
        grid-area: calendario;
        background-color: rgba(77, 237, 106, 0.14);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main {
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
    }
`