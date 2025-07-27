import { createContext, useContext, useEffect, useState } from "react";
import { verifyUser } from "../services/auth/authService";

const AuthContext = createContext();

export function AuthProvider({children}) {
    // if the token has already been set, it will be initialized with it
    // else token will be intialized with null
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    })

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    const verify = async() => {
        try {
            const res = await verifyUser();
            if(res.status !== 200) throw new Error("Invalid or expired token");
        } catch(err) {
            localStorage.removeItem("token");
            setToken(null);
        }
    }

    return(
        <AuthContext.Provider value={{token, login, logout, verify, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}