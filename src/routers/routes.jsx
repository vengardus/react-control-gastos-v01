import { Routes, Route } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { UserAuth } from "../context/AuthContext"
import { ConfigPage } from "../pages/ConfigPage"
import { CategoryPage } from "../pages/CategoryPage"
import { MovementPage } from "../pages/MovementPage"
import { ReportPage } from "../pages/ReportPage"


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
                <Route path="/report" element={<ReportPage />} />
            </Route>
        </Routes>

    )
}

const ProtectedRoutes = ({ user, redirectTO, children }) => {
    if (user == null) return <Navigate replace to={redirectTO} />
    return children ? children : <Outlet />
}