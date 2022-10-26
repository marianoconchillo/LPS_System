import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext/AuthContext'

export const PrivateRoutes = () => {

    const { user } = useContext(AuthContext);

    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}