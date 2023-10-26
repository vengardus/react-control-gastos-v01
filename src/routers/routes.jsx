import { Routes, Route } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { ProtectedRoutes } from "../hooks/ProtectedRoutes"
import { UserAuth } from "../context/AuthContext"
import { AboutPage } from "../pages/AboutPage"

export function MyRoutes() {
    const { user } = UserAuth()
    return (

        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
                element={<ProtectedRoutes
                    user={user}
                    redirectTO="/login" />}
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>

    )
}