import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const csToken=localStorage.getItem('cstoken')
    return(
        csToken ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes