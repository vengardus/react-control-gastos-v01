import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import { Selector } from "../organismos/Selector"
import { v } from "../../styles/variables"
import { ListCountry } from "../organismos/ListCountry"


export const ConfigTemplate = () => {
    const [state, setState] = useState(false)
    const [stateCountries, setStateCountries] = useState(false)
    const [select, setSelect] = useState()
    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>
            <section className="area1">
                <h1>Ajustes</h1>
            </section>
            <section className="area2">
                <ContentCard>
                    <span>Moneda</span>
                    <Selector
                        state={stateCountries}
                        color={v.colorselector}
                        func={()=>setStateCountries(!stateCountries)}
                    />
                    {
                        stateCountries
                        && <ListCountry
                            setSelect={(p) => setSelect(p)}
                            setState={() => setStateCountries(!stateCountries)}
                        />
                    }
                </ContentCard>
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
        "area2" 50px
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
    .area2 {
        grid-area: area2;
        background-color: rgba(77, 237, 106, 0.14);
        display: flex;
        align-items: center;
    }
    .main {
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
    }
`

const ContentCard = styled.div`
    display: flex;
    text-align: start;
    align-items: center;
    gap: 20px;
    position: relative;
    width: 100%;
    justify-content: center;
`;