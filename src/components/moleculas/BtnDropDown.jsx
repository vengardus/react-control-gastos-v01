import styled from "styled-components"
import { v } from "../../styles/variables"

export const BtnDropDown = ({
    text,
    bgColor,
    textColor,
    func
}) => {
    return (
        <Container $bgColor={bgColor} $textColor={textColor} onClick={func}>
            <span className="ContaintText">
                {<v.iconoFlechabajo/>}
                <h6>{text}</h6>
            </span>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    background-color: ${(props) => props.$bgColor};
    color: ${(props) => props.$textColor};
    font-weight: 500;
    font-size: 23px;
    padding: 0.9rem 2.3rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    .ContaintText {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:hover {
        background-color: rgba(77, 77, 77, 0.5);
    }
`   