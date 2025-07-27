import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function PrivateRoute() {
    const { isAuthenticated, verify } = useAuth();

    useEffect(() => {
        verify();
    },[])

    return isAuthenticated ? <Outlet/> : <Navigate to="login" replace/>
}