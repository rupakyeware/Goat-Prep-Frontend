import { createContext, useContext, useEffect, useState } from "react";

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

    return(
        <AuthContext.Provider value={{token, login, logout, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}