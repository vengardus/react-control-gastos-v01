import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import dayjs from "dayjs"
import { CalendarioLineal } from "../organismos/tablas/CalendarioLineal"


export const MovementTemplate = () => {
    const [state, setState] = useState(false)
    const [value, setValue] = useState(dayjs(Date.now()))
    const [formatoFecha, setFormatoFecha] = useState("")
    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>
            <section className="area1"></section>
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
        "area1" 100px
        "calendario" 50px
        "main" auto;

    .header {
        grid-area: header;
        background-color: rgba(103, 93, 241, 0.14);
        display: flex;
        align-items: center;
    }
    .area1 {
        grid-area: area1;
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