import styled from "styled-components"
import { CategoryTemplate } from "../components/templates/CategoryTemplate"

export const CategoryPage = () => {
    return (
        <Container>
            <CategoryTemplate />
        </Container>
        )
    }
    
const Container = styled.div`
    height: 100vh;
`
