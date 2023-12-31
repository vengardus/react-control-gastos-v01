//import './App.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThemeProvider, styled } from 'styled-components'

import { MyRoutes } from './routers/routes'
import { Light, Dark } from './styles/themes'
import { AuthContextProvider } from './context/AuthContext'
import { SideBar } from './components/organismos/sidebar/SideBar'
import { MenuBurger } from './components/organismos/MenuBurger'
import { Device } from './styles/breakpoints'
import { useUserStore } from './store/UserStore'
import { LoginPage } from './pages/LoginPage'
import { SpinnerLoader } from './components/moleculas/SpinnerLoader'
import { APP_CONFIG } from './utils/dataEstatica'
import { useUserQuery } from './querys/useUserQuery'


function App() {
  const dataUser = useUserStore((state) => state.dataUser)
  const { pathname } = useLocation()
  const theme = dataUser?.theme ?? APP_CONFIG.theme.dark
  const themeStyle = (theme === APP_CONFIG.theme.light) ? Light : Dark
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const query = useUserQuery()

  if (query.isLoading) return <SpinnerLoader />
  if (query.isError) return <h1>Error... </h1>

  return (
    <>
      <ThemeProvider theme={themeStyle} >
        <AuthContextProvider>
          {
            (pathname === '/login')
              ? <LoginPage />
              :
              <Container className={sideBarOpen ? "active" : ""}>
                <div className='ContentSideBar'>
                  <SideBar
                    state={sideBarOpen}
                    setState={setSideBarOpen}
                  />
                </div>
                <div className='ContentBurger'>
                  <MenuBurger />
                </div>
                <ContainerBody>
                  <MyRoutes />
                </ContainerBody>
              </Container>
          }
        </AuthContextProvider>
      </ThemeProvider>
    </>
  )
}


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${(props) => props.theme.bgtotal};
  transition: 0.3s ease-in-out;
  .ContentSideBar {
    display: none;
  }
  .ContentBurger {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSideBar {
      display: initial;
    }
    .ContentBurger {
      display: none;
    }
  }
`
const ContainerBody = styled.div`
  color: ${(props) => props.theme.text};
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`

export default App
