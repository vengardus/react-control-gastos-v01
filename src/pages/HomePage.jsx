import { UserAuth } from "../context/AuthContext"
import { useAuthStore } from "../store/AuthStore"

export const HomePage = () => {
  const {signOut} = useAuthStore()
  const {user} = UserAuth()
  //console.log('HOME', user.user_metadata)
  return (
    <>
    <div>Bienvenido {user?.user_metadata?.full_name}</div>
    <img src={user?.user_metadata?.picture} alt="img" />
    <button onClick={signOut}>Cerrar session</button>
    </>
  )

}
