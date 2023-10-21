import styled from "styled-components"
import { BtnSave } from "../moleculas/BtnSave"
import {v} from "../../styles/variables"


export const LoginTemplate = () => {
  return (
    <div>
      <span>versión 1.0</span>
      <div>
        <img src="" alt="" />
      </div>
      <Title>Control de gastos</Title>
      <p>Toma el control de tus gatos e ingresos</p>
      <ContainerButton>
        <BtnSave
          title={"Iniciar con google"}
          icon={<v.iconogoogle/>}
        />
      </ContainerButton>
    </div>
  )

}

const Title = styled.span`
  font-size:5rem;
  font-weight: 700;
`

const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`