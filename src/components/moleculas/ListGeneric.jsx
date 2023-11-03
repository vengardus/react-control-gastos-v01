import styled from "styled-components"
import PropTypes from "prop-types"
import { Device } from "../../styles/breakpoints"
import { BtnClose } from "../atomos/BtnClose"


export const ListGeneric = ({ data, setState, func }) => {
    const selectItem = (p) => {
        console.log('item', p)
        func(p)
        setState()
    }
    
    return (
        <Container>
            <section className="ContentClose">
                <BtnClose func={setState} />
            </section>
            <section className="ContentItems">
                {
                    data.map((item, index) => {
                        return (
                            <ItemContainer key={index} onClick={() => selectItem(item)}>
                                <span>{item.icono}</span>
                                <span>{item.descripcion}</span>
                            </ItemContainer>
                        )
                    })
                }
            </section>
        </Container>
    )
}

ListGeneric.propTypes = {
    data: PropTypes.any,
    setState: PropTypes.any,
    func: PropTypes.func
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    position: absolute;
    margin-bottom: 15px;
    bottom: 88%;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    gap: 10px;
    z-index:3;
    @media ${() => Device.tablet} {
        width: 400px;
    }        
`

const ItemContainer = styled.div`
    gap: 10px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.bgtotal};
    }
`