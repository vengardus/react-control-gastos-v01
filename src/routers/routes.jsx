import { Routes, Route } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { ProtectedRoutes } from "../hooks/ProtectedRoutes"
import { UserAuth } from "../context/AuthContext"
import { ConfigPage } from "../pages/ConfigPage"

export function MyRoutes() {
    const { user } = UserAuth()
    return (

        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                element={<ProtectedRoutes
                    user={user}
                    redirectTO="/login" />}
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/config" element={<ConfigPage />} />
            </Route>
        </Routes>

    )
}