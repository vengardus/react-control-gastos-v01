import { Routes, Route } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { ProtectedRoutes } from "../hooks/ProtectedRoutes"
import { UserAuth } from "../context/AuthContext"
import { ConfigPage } from "../pages/ConfigPage"
import { CategoryPage } from "../pages/CategoryPage"
import { MovementPage } from "../pages/MovementPage"

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
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/movement" element={<MovementPage />} />
            </Route>
        </Routes>

    )
}