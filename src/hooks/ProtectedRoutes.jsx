import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({user, redirectTO, children}) => {
    console.log('Protected.user', user)
    if (user == null) return <Navigate replace to={redirectTO} />
    return children? children : <Outlet />

}

ProtectedRoutes.propTypes = {
    user: PropTypes.any,
    redirectTO: PropTypes.any,
    children: PropTypes.any

}