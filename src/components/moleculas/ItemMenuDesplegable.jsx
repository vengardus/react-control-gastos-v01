import styled from "styled-components"
import PropTypes from "prop-types"
import { Icon } from "../atomos/Icon"

export const ItemMenuDesplegable = ({item, func}) => {
    return (
        <Container onClick={func}>
            <Icon>{<item.icono />}</Icon>
            <span>{item.text}</span>
        </Container>
    )
}

ItemMenuDesplegable.propTypes = {
    item:PropTypes.any,
    func:PropTypes.func
}

const Container = styled.div`
    cursor: pointer;
    padding: 8px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap:10px;
    &:hover {
        background-color: ${(props)=>props.theme.bg4}
    }
    svg {
        font-size: 28px;
        display: block;
    }
`
