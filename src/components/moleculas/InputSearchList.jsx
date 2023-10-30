import styled from "styled-components"
import PropTypes from "prop-types"


export const InputSearchList = ({ onChange, placeholder }) => {
    return (
        <Container>
            <input type="text" onChange={onChange} placeholder={placeholder} />
        </Container>
    )
}

InputSearchList.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string
}

const Container = styled.div`
    position: relative;
    input {
        background: ${(props) => props.theme.bgtotal};
        font-size: 16px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        border-bottom: solid 1px grey;
        color: ${(props) => props.theme.text};
        outline: none;
        &:focus {
            border-bottom: none;
        }
        &::placeholder {
            color: #c8c8c8;
        }
    }
`