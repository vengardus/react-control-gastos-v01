import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import { CalendarioLineal } from "../organismos/tablas/CalendarioLineal"
import dayjs from "dayjs"
import { Tabs } from "../organismos/Tabs"
import { ContentFilters } from "../atomos/ContentFilters"
import { BtnDropDown } from "../moleculas/BtnDropDown"
import { useOperations } from "../../store/OperationsStore"
import { ListMenuDesplegable } from "../moleculas/ListMenuDesplegable"
import { DataDesplegableMovimientos } from "../../utils/dataEstatica"


export const ReportTemplate = () => {
    const [state, setState] = useState(false)
    const [value, setValue] = useState(dayjs(Date.now()))
    const [formatoFecha, setFormatoFecha] = useState("")
    const {
        bgCategory,
        colorCategory,
        titleBtnDropDownMovements,
        setType
    } = useOperations()

    const [stateType, setTypeState] = useState(false)
    const openType = () => {
        setTypeState(!stateType);
        setState(false);
    }
    const changeType = (p) => {
        console.log('P', p)
        setType(p)
        setTypeState(!stateType)
    }

    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>

            <section className="area1">
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
                <h1>Informes</h1>
            </section>

            <section className="area2">
                <CalendarioLineal
                    value={value}
                    setValue={setValue}
                    setFormatoFecha={setFormatoFecha}
                />
            </section>
            <section className="main">
                <Tabs />
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
        "area1" 100px
        "area2" 70px
        "main" auto;

    .header {
        grid-area: header;
        /* background-color: rgba(103, 93, 241, 0.14); */
        display: flex;
        align-items: center;
    }
    .area1 {
        grid-area: area1;
        /* background-color: rgba(229, 67, 26, 0.14); */
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .area2 {
        grid-area: area2;
        /* background-color: rgba(77, 237, 106, 0.14); */
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 20px;
    }
    .main {
        grid-area: main;
        /* background-color: rgba(179, 46, 241, 0.14); */
        /* align-items       : center;
        justify-content: center; */
    }
`