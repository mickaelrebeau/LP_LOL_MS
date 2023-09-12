import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {

    const auth = { token: true }

    return (
        auth.token ? <Outlet /> : <Navigate to="auth" />
    )
}

export default PrivateRoutes;