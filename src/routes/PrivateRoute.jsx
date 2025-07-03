import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)

    return isAuthenticated ? <Outlet/> : <Navigate to="login" replace/>
}