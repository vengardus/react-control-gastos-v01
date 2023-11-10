import styled from "styled-components"
import { Header } from "../organismos/Header"
import { useState } from "react"
import { ContentFilters } from "../atomos/ContentFilters"
import { BtnDropDown } from "../moleculas/BtnDropDown"
import { useOperations } from "../../store/OperationsStore"
import { ListMenuDesplegable } from "../moleculas/ListMenuDesplegable"
import { APP_CONFIG, DataDesplegableTipo } from "../../utils/dataEstatica"
import { Btnfilter } from "../organismos/BtnFilter"
import { v } from "../../styles/variables"
import { TablaCategorias } from "../organismos/tablas/TablaCategorias"
import { RegistrarCategorias } from "../organismos/formularios/RegistrarCategorias"
//import { LottieAnimation } from "../moleculas/LottieAnimation"
//import vacioverde from "../../assets/vacioverde.json"
//import vaciorojo from "../../assets/vaciorojo.json"

export const CategoryTemplate = ({ data }) => {
    const [state, setState] = useState(false)
    const [stateType, setTypeState] = useState(false)
    const [dataSelect, setDataSelect] = useState([])
    const { titleBtnDropDown, colorCategory, bgCategory, setType } = useOperations()
    const [openRegistro, setOpenRegistro] = useState(false)
    const [action, setAction] = useState()

    const changeType = (p) => {
        console.log('P', p)
        setType(p)
        setTypeState(!stateType)
        setState(false)
    }

    const openUser = () => {
        setState(!state);
        setTypeState(false);
    }

    const openType = () => {
        setTypeState(!stateType);
        setState(false);
    }

    const closeDropDowns = () => {
        setState(false)
        setTypeState(false)
    }

    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro)
        setAction(APP_CONFIG.actionCrud.insert)
        setDataSelect([])
    }

    return (
        <Container onClick={closeDropDowns}>
            {
                openRegistro
                && <RegistrarCategorias
                    dataSelect={dataSelect}
                    onClose={() => setOpenRegistro(!openRegistro)}
                    accion={action}
                />
            }

            <header className="header">
                <Header stateConfig={{
                    state: state,
                    setState: openUser
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
                            text={titleBtnDropDown}
                            func={openType}
                        />
                        {
                            stateType
                            && <ListMenuDesplegable
                                data={DataDesplegableTipo}
                                top={"112%"}
                                func={(p) => changeType(p)}
                            />
                        }
                    </div>
                </ContentFilters>
            </section>
            <section className="area2">
                <ContentFilter>
                    <Btnfilter
                        bgColor={bgCategory}
                        textColor={colorCategory}
                        icon={<v.agregar />}
                        func={nuevoRegistro}
                    />
                </ContentFilter>

            </section>
            <section className="main">
                {/* {
                    data.length > 0
                    && <LottieAnimation
                        height={"300px"}
                        width={"300px"}
                        animation={type == APP_CONFIG.movementType.ingreso ? vacioverde : vaciorojo}
                    />
                } */}

                <TablaCategorias
                    data={data}
                    setdataSelect={setDataSelect}
                    setAccion={setAction}
                    SetopenRegistro={setOpenRegistro}
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
        justify-content: end;
        padding-right: 0.7rem;
    }
    .main {
        grid-area: main;
        background-color: rgba(179, 46, 241, 0.14);
    }
`

const ContentFilter = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`