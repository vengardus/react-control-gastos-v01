import styled from "styled-components"
import { BtnSave } from "../moleculas/BtnSave"

export default function LoginTemplate() {
  return (
    <div>
      <span>versión 1.0</span>
      <div>
        <img src="" alt="" />
      </div>
      <Title>Control de gastos</Title>
      <p>Toma el control de tus gatos e ingresos</p>
      <ContainerButton>
        <BtnSave/>
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