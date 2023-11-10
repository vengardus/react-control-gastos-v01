import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import dayjs from "dayjs"
import { CalendarioLineal } from "../organismos/tablas/CalendarioLineal"
import { CardTotales } from "../organismos/CardTotales"
import { useOperations } from "../../store/OperationsStore"
import { APP_CONFIG, DataDesplegableMovimientos } from "../../utils/dataEstatica"
import { v } from "../../styles/variables"
import { useMovementStore } from "../../store/MovementStore"
import { useQuery } from "@tanstack/react-query"
import { useUserStore } from "../../store/UserStore"
import { Device } from "../../styles/breakpoints"
import { TablaMovimientos } from "../organismos/tablas/TablaMovimientos"
import { useAccountStore } from "../../store/AccountStore"
import { useCategoryStore } from "../../store/CategoryStore"
import { ContentFilters } from "../atomos/ContentFilters"
import { BtnDropDown } from "../moleculas/BtnDropDown"
import { ListMenuDesplegable } from "../moleculas/ListMenuDesplegable"
import { Btnfilter } from "../organismos/BtnFilter"
import { RegistrarMovimientos } from "../organismos/formularios/RegistrarMovimientos"


export const MovementTemplate = () => {
    const [state, setState] = useState(false)
    const [value, setValue] = useState(dayjs(Date.now()))
    const [formatoFecha, setFormatoFecha] = useState("")
    const {
        type,
        setType,
        colorCategory,
        year,
        month,
        bgCategory,
        titleBtnDropDownMovements
    } = useOperations()
    const {
        dataMovement,
        totalMonthYear,
        totalMonthYearPagados,
        totalMonthYearPendientes,
        movementGet
    } = useMovementStore()
    const { dataUser } = useUserStore()
    //const { accountGet, dataAccount } = useAccountStore()
    const accountGet = useAccountStore((state) => state.accountGet)
    const dataAccount = useAccountStore((state) => state.dataAccount)
    const { categoryGet } = useCategoryStore()

    const [openRegistro, setOpenRegistro] = useState(false)
    const [action, setAction] = useState()
    const [dataSelect, setDataSelect] = useState([])

    const [stateType, setTypeState] = useState(false)
    const openType = () => {
        setTypeState(!stateType);
        setState(false);
    }
    const changeType = (p) => {
        console.log('P', p)
        setType(p)
        setTypeState(!stateType)
        setState(false)
    }
    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro)
        setAction(APP_CONFIG.actionCrud.insert)
        setDataSelect([])
    }

    useQuery({
        queryKey: ['Mostrar movimientos month year', value, type],
        queryFn: () => movementGet({
            month: month,
            year: year,
            id_user: dataUser.id,
            type_category: type
        })
    })

    useQuery({
        queryKey: ["Mostrar Cuentas", dataAccount],
        queryFn: () => accountGet({
            id_user: dataUser.id
        })
    })

    console.log('dataAccount:', dataAccount)

    useQuery({
        queryKey: ["Mostrar categorias", type],
        queryFn: () => categoryGet({
            id_user: dataUser.id,
            type: type
        })
    })

    return (
        <Container>
            {
                openRegistro
                && <RegistrarMovimientos
                    dataSelect={dataSelect}
                    state={openRegistro}
                    setState={() => setOpenRegistro(!openRegistro)}
                />
            }
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>

            <section className="areaType">
                <ContentFilters>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <BtnDropDown
                            bgColor={bgCategory}
                            textColor={colorCategory}
                            text={titleBtnDropDownMovements}
                            func={openType}
                        />
                        {
                            stateType
                            && <ListMenuDesplegable
                                data={DataDesplegableMovimientos}
                                top={"112%"}
                                func={(p) => changeType(p)}
                            />
                        }
                    </div>
                </ContentFilters>

                <ContentFilter>
                    <Btnfilter
                        bgColor={bgCategory}
                        textColor={colorCategory}
                        icon={<v.agregar />}
                        func={nuevoRegistro}
                    />
                </ContentFilter>
            </section>

            <section className="totales">
                <CardTotales
                    title={(type === APP_CONFIG.movementType.gasto)
                        ? "Gastos pendientes"
                        : "Ingresos pendientes"}
                    color={colorCategory}
                    icon={<v.flechaarribalarga />}
                    total={totalMonthYearPendientes}
                />
                <CardTotales
                    title={(type === APP_CONFIG.movementType.gasto)
                        ? "Gastos pagados"
                        : "Ingresos pagados"}
                    color={colorCategory}
                    icon={<v.flechaabajolarga />}
                    total={totalMonthYearPagados}
                />
                <CardTotales
                    title={"Total"}
                    color={colorCategory}
                    icon={<v.balance />}
                    total={totalMonthYear}
                />
            </section>
            <section className="calendario">
                <CalendarioLineal
                    value={value}
                    setValue={setValue}
                    setFormatoFecha={setFormatoFecha}
                />
            </section>
            <section className="main">
                <TablaMovimientos
                    data={dataMovement}
                />
            </section>
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
        "areaType" 100px
        "totales" 360px
        "calendario" 50px
        "main" auto;
    @media ${Device.tablet} {
        grid-template:
            "header" 100px
            "areaType" 100px
            "totales" 100px
            "calendario" 50px
            "main" auto;
        gap: 7px;
    }

    .header {
        grid-area: header;
        /* background-color: rgba(103, 93, 241, 0.14); */
        display: flex;
        align-items: center;
    }
    .areaType {
        grid-area: areaType;
        /* background-color: rgba(33, 53, 41, 0.14); */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .totales {
        grid-area: totales;
        /* background-color: rgba(229, 67, 26, 0.14); */
        display: grid;
        align-items: center;
        grid-template-columns: 1fr;
        gap: 10px;
        @media ${Device.tablet} {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .calendario {
        grid-area: calendario;
        /* background-color: rgba(77, 237, 106, 0.14); */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main {
        grid-area: main;
        /* background-color: rgba(179, 46, 241, 0.14); */
    }
`

const ContentFilter = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`