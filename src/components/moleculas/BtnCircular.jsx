import styled from "styled-components"
import PropTypes from "prop-types"

export const BtnCircular = ({
    icon,
    width,
    height,
    bgColor,
    textColor,
    fontSize, 
    translateX,
    translateY
}) => {
    return (
        <Container
            $bgColor={bgColor}
            $textColor={textColor}
            width={width}
            height={height}
            fontSize={fontSize}
            $translateX={translateX}
            $translateY={translateY}
        >
            <span>{icon}</span>
        </Container>
    )
}

BtnCircular.propTypes = {
    icon: PropTypes.any,
    width: PropTypes.string,
    height: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.string,
    translateX: PropTypes.any,
    translateY: PropTypes.any
}

const Container = styled.div`
    background-color: ${(props) => props.$bgColor};
    min-width: ${(props) => props.width};
    min-height: ${(props) => props.height};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translatex(${(props)=>props.$translateX})
    translateY(${(props)=>props.$translateY});
    span {
        font-size: ${(props) => props.fontSize};
        text-align: center;
        color: ${(props) => props.$textColor};
    }
    `
