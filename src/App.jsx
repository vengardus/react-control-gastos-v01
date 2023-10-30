//import './App.css'
import { useState } from 'react'
import { MyRoutes } from './routers/routes'
import { createContext } from "react"
import { Light, Dark } from './styles/themes'
import { ThemeProvider, styled } from 'styled-components'
import { AuthContextProvider } from './context/AuthContext'
import { SideBar } from './components/organismos/sidebar/SideBar'
import { Device } from './styles/breakpoints'
import { MenuBurger } from './components/organismos/MenuBurger'
import { useLocation } from 'react-router-dom'

export const ThemeContext = createContext(null)

function App() {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState("dark")
  const themeStyle = (theme === "light") ? Light : Dark
  const [sideBarOpen, setSideBarOpen] = useState(false)


  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle} >
          <AuthContextProvider>
            {
              (pathname == '/login')
                ? <MyRoutes />
                :
                <Container className={sideBarOpen ? "active" : ""}>
                  <div className='ContentSideBar'>
                    <SideBar state={sideBarOpen} setState={setSideBarOpen} />
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
      </ThemeContext.Provider>
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
