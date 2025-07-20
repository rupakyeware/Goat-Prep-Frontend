import { useEffect } from "react";
import { useUser } from "../../../context/UserContext";

export default function ProblemRow({ problem }) {
    const { solvedProblems, markProblemSolved } = useUser();
    const isSolved = solvedProblems.some(p => p.problemId === problem.problemId);

    const getDifficultyColour = (level) => {
        switch (level) {
            case 0: return "text-problem-easy";
            case 1: return "text-problem-medium";
            case 2: return "text-problem-hard";
        }
    };

    return (
        <tr className="text-normal border-t-border-gray text-sm">
            <td>
                <input
                type="checkbox"
                checked={isSolved}
                onChange={() => markProblemSolved(problem)}
                />
            </td>
            <td>{problem.problemName}</td>
            <td className={`${getDifficultyColour(problem.problemDifficulty)}`}>
                {problem.problemDifficulty === 0 ? "Easy" :
                 problem.problemDifficulty === 1 ? "Medium" :
                 problem.problemDifficulty === 2 ? "Hard" : "Unknown"}
            </td>
            <td>{problem.problemLookups}</td>
            <td>
                <a
                    href={problem.problemUrl}
                    className="text-blue-400 underline">
                    Solve
                </a>
            </td>
        </tr>
    )
}