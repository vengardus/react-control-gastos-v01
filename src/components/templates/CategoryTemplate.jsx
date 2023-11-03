import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import { ContentFilter } from "../atomos/ContentFilter"
import { BtnDropDown } from "../moleculas/BtnDropDown"
import { useOperations } from "../../store/OperationsStore"
import { ListMenuDesplegable } from "../moleculas/ListMenuDesplegable"
import { DataDesplegableTipo } from "../../utils/dataEstatica"


export const CategoryTemplate = () => {
    const [state, setState] = useState(false)
    const { titleBtnDropDown, colorCategory, bgCategory, setType } = useOperations()

    const changeType = (p) => {
        setType(p)
    }

    return (
        <Container>
            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }} />
            </header>
            <section className="areaType">
                <ContentFilter>
                    <BtnDropDown
                        bgColor={bgCategory}
                        textColor={colorCategory}
                        text={titleBtnDropDown}
                    />
                    <ListMenuDesplegable
                        data={DataDesplegableTipo}
                        top={"112%"}
                        func={(p) => changeType(p)}
                    />
                </ContentFilter>
            </section>
            <section className="area2"></section>
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
        "areaType" 100px
        "area2" 50px
        "main" auto;

    .header {
        grid-area: header;
        background-color: rgba(103, 93, 241, 0.14);
        display: flex;
        align-items: center;
    }
    .areaType {
        grid-area: areaType;
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