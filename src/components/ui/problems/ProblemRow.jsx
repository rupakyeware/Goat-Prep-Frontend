import { useEffect, useMemo } from "react";
import { useUser } from "../../../context/UserContext";
import { SiLeetcode } from "react-icons/si";

export default function ProblemRow({ problem }) {
    const { solvedProblems, markProblemSolved } = useUser();


    const isSolved = useMemo(() => {
        return solvedProblems.some(p => p.problemId === problem.problemId);
    }, [solvedProblems, problem.problemId]);

    const getDifficultyColour = (level) => {
        switch (level) {
            case 0: return "text-problem-easy";
            case 1: return "text-problem-medium";
            case 2: return "text-problem-hard";
        }
    };

    return (
        <>
            <div className="grid grid-cols-[1fr_10fr_2fr_2fr] w-full text-md text-left hover:bg-slate px-2 py-1 items-center cursor-pointer">
                <div
                    onClick={() => markProblemSolved(problem)}
                    className={`w-3 h-3 border rounded-sm cursor-pointer ${
                        isSolved ? 'bg-turqoise border-turqoise' : 'bg-gray border-gray'
                    }`}
                ></div>
                <div className="truncate hover:text-yellow"
                    onClick={() => {
                        window.open(problem.problemUrl, "_blank");
                    }}
                >{problem.problemName}</div>
                <div className={`${getDifficultyColour(problem.problemDifficulty)}`}>
                    {problem.problemDifficulty === 0 ? "Easy" :
                        problem.problemDifficulty === 1 ? "Medium" :
                            problem.problemDifficulty === 2 ? "Hard" : "Unknown"}
                </div>
                <div>
                    {problem.problemLookups}
                </div>
            </div>
        </>
    )
}