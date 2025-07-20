import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getSolvedProblems, handleProblemSolved } from "../services/user/userService";

const UserContext = createContext();

export function UserProvider({children}) {
    const { token } = useAuth();
    const [solvedProblems, setSolvedProblems] = useState([]);

    useEffect(() => {
        const fetchSolved = async() => {
            try {
                if(token) {
                    const problems = await getSolvedProblems();
                    setSolvedProblems(problems);
                }
            } catch(err) {
                console.log("Failed to fetch solved problems: " + err);
            }
        }
        fetchSolved();
    },[]);

    const markProblemSolved = async(problem) => {
        try {
            setSolvedProblems((prev) => [...prev, problem]);
            await handleProblemSolved(problem.problemId);
        } catch(err) {
            console.log("Error marking the problem as solved: " + err);
        }
    }

    return (
        <UserContext.Provider value={{solvedProblems, markProblemSolved}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}