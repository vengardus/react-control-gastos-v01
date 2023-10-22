import { useAuthStore } from "../store/AuthStore"

export const AboutPage = () => {
const {signOut} = useAuthStore()

  return (
    <>
    <div>AboutPage</div>
    <button onClick={signOut}>Cerrar session</button>
    </>
  )
}
