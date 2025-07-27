import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getSolvedProblems, handleProblemSolved } from "../services/user/userService";

const UserContext = createContext();

export function UserProvider({children}) {
    const { token } = useAuth();
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: undefined,
        minLookups: undefined,
        page: 0,
        name: "",
        companyId: undefined,
        companyName: undefined
    });

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
            setSolvedProblems((prev) => {
                const exists = solvedProblems.find(p => p.problemId === problem.problemId);
                if(exists) return prev.filter(p => p.problemId !== problem.problemId);
                else return [...prev, problem];
            });
            await handleProblemSolved(problem.problemId);
        } catch(err) {
            console.log("Error marking the problem as solved: " + err);
        }
    }

    return (
        <UserContext.Provider value={{solvedProblems, markProblemSolved, filters, setFilters}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}