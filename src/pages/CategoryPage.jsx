import styled from "styled-components"
import { CategoryTemplate } from "../components/templates/CategoryTemplate"
import { useCategoryStore } from "../store/CategoryStore"
import { useUserStore } from "../store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { APP_CONFIG } from "../utils/dataEstatica"

export const CategoryPage = () => {
    const { dataUser } = useUserStore()
    const { dataCategory, categoryGet } = useCategoryStore()
    const { isLoading, error } = useQuery({
        queryKey: ["Show Categories"],
        queryFn: () => categoryGet({
            id_user: dataUser.id,
            type: APP_CONFIG.movementType.ingreso
        })
    })

    console.log('Categories', dataCategory)
    if (isLoading) return <h1>cargando....</h1>
    if (error) return <h1>ocurrió un error</h1>


    return (
        <Container>
            <CategoryTemplate data={dataCategory}/>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
`
