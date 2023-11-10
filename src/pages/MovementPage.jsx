import styled from "styled-components"
import { MovementTemplate } from "../components/templates/MovementTemplate"


export const MovementPage = () => {
    return (
        <Container>
            <MovementTemplate />
        </Container>
        )
    }
    
const Container = styled.div`
    height: 100vh;
    background-color: white;
`