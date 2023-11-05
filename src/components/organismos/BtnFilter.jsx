import styled from "styled-components";

export function Btnfilter({ bgColor, textColor, icon, func }) {
    return (
        <Container $textColor={textColor} $bgColor={bgColor} onClick={func}>
            <div className="contentIcon">
                <span>{icon}</span>
            </div>
        </Container>
    );
}
const Container = styled.div`
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.$bgColor};
    color: ${(props) => props.$textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: relative;
    cursor: pointer;

    .contentIcon {
        position: absolute;
        top: 25%;
        bottom: 25%;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        transition:0.2s;
        &:hover {
          transform: scale(1.3);
        }
    }
`;