import { UserAuth } from "../context/AuthContext"
import { useAuthStore } from "../store/AuthStore"

export const HomePage = () => {
  const {signOut} = useAuthStore()
  const {user} = UserAuth()
  //console.log('HOME', user.user_metadata)
  //33-29 UserData
  return (
    <>
    <div>Bienvenido {user?.full_name}</div>
    <img src={user?.picture} alt="img" />
    <button onClick={signOut}>Cerrar session</button>
    </>
  )

}
