import styled from "styled-components"
import { BtnSave } from "../moleculas/BtnSave"
import { v } from "../../styles/variables"
import { useAuthStore } from "../../store/AuthStore"


export const LoginTemplate = () => {
  const { signInWithGoogle } = useAuthStore()
  return (
    <Container>
      <div className="contentCard">
        <span className="version">versión 1.0</span>
        <div className="contentImg">
          <img src={v.logo} alt="logo" />
        </div>
        <Title>Control de gastos</Title>
        <p className="frase">Toma el control de tus gatos e ingresos</p>
        <ContainerButton>
          <BtnSave
            title={"Iniciar con google"}
            icon={<v.iconogoogle />}
            bgcolor={v.colorSecundario}
            func={signInWithGoogle}
          />
        </ContainerButton>
      </div>
    </Container>
  )

}

const Container = styled.div`
  background-image: url(${v.imagenfondo});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.87);
  text-align: center;
  .contentCard {
    background-color: #131313;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 20px;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0,0,0,0.35);
    height: fit-content;
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      img {
        width: 60%;
        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #909090;
      font-size: 1.2rem;
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0,0px);
    }
    50%{
      transform: translate(0,15px);
    }
  }
`

const Title = styled.span`
  font-size: 3rem;
  font-weight: 700;
`

const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`