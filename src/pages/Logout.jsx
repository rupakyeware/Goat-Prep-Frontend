import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
    const {logout} = useAuth();
    useEffect(() => {
        logout();
    },[])
}