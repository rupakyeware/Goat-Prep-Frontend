import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export default function OAuthLogin() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    

    useEffect(() => {
        const jwt = searchParams.get("token");
        console.log("jwt for this user: ", jwt);
        if(jwt) {
            login(jwt);
            navigate("/");
        }
        else {
            console.log("unauthorized");
            navigate("/login");
        }
    },[])

    return (
        <div className="h-screen w-screen flex justify-center items-center text-light-heading">Signing you in...</div>
    )
}