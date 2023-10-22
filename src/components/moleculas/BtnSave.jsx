import styled from "styled-components"
import PropTypes from 'prop-types'
import { Icon } from "../atomos/Icon"


export const BtnSave = (props) => {

    return (
        <Container type="submit" bgcolor={props.bgcolor}>
            <Icon>{props.icon}</Icon>
            <span className="btn" onClick={props.func}>
                {props.title}
            </span>
        </Container>
    )
}

BtnSave.propTypes = {
    func: PropTypes.func,
    title: PropTypes.any,
    bgcolor: PropTypes.any,
    icon: PropTypes.any,
}

const Container = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border: none;
    gap: 10px;
    background-color:initial;
    .btn {
        background: ${(props) => {const {bgcolor}= props; return bgcolor}};
        padding: 0.6em 1.3em;
        font-weight: 900;
        font-size: 18px;
        border: 3px solid black;
        border-radius: 0.5em;
        box-shadow: 0.1em 0.1em #000;
        transition: 0.2s;
        white-space: 1px;
        color: #000;
        cursor: pointer;
        &:hover {
            transform: translate(-0.05em, -0.05em);
            box-shadow: 0.15em 0.15em #000;
        }
        &:active {
            transform: translate(0.05em, 0.05em);
            box-shadow: 0.1em 0.1em #000;
        }
    }
`



