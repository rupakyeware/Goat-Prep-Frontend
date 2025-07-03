import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    })

    // when first loaded, check if token already exists in localStorage
    // useEffect(() => {
    //     const storedToken = localStorage.getItem("token");
    //     if(storedToken) {
    //         setToken(storedToken);
    //     }
    // },[])

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