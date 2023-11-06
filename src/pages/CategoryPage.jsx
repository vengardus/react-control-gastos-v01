import styled from "styled-components"
import { CategoryTemplate } from "../components/templates/CategoryTemplate"
import { useCategoryStore } from "../store/CategoryStore"
import { useUserStore } from "../store/UserStore"
import { useQuery } from "@tanstack/react-query"
import { useOperations } from "../store/OperationsStore"

export const CategoryPage = () => {
    const { dataUser } = useUserStore()
    const { dataCategory, categoryGet } = useCategoryStore()
    const  type  = useOperations(state => state.type)
    // const [stateType, setStateType] = useState(type)
    useQuery({
        queryKey: ["Show Categories", type],
        queryFn: () => categoryGet({
            id_user: dataUser.id,
            type: type
        })
    })

    // if (isLoading) return <SpinnerLoader />
    // if (error) return <h1>ocurrió un error</h1>


    return (
        <Container>
            <CategoryTemplate data={dataCategory} />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
`
