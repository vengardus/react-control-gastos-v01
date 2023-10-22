import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = (props) => {
    console.log('Protected.user', props.user)
    if (props.user == null) return <Navigate replace to={props.redirectTO} />
    return props.children? props.children : <Outlet />

}

ProtectedRoutes.propTypes = {
    user: PropTypes.any,
    redirectTO: PropTypes.any,
    children: PropTypes.any

}