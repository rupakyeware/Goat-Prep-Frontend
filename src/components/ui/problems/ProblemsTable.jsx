import { useEffect, useState } from "react";
import { getFilteredProblems, getProblemsByName } from "../../../services/problems/problemService";
import ProblemRow from "./ProblemRow";
import SearchBar from "../common/SearchBar";
import { FileText } from "react-bootstrap-icons";

export default function ProblemsTable({filters, setFilters}) {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        console.log(filters);
        // Fetch problems data with filters (if any)
        const fetchData = async () => {
            try {
                let data;
                if(filters.name?.trim()) {
                    data = await getProblemsByName({name: filters.name});
                }
                else data = await getFilteredProblems(filters);
                setProblems(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [JSON.stringify(filters)]); 
    // To compare actual values of filters and not references, I used stringify

    return (
        <div className="w-full">
            <div className="w-full mt-4 flex justify-between items-center">
                <div>
                    <SearchBar value={filters.name ?? ""}
                    placeholder="Search for problems"
                    onChange={(e) => setFilters(prev => ({
                        ...prev, name: e.target.value, page: 0
                    }))}
                    />
                </div>
                <div className="flex justify-center items-center space-x-2">
                    <button
                    onClick={() => {setFilters(prev => ({...prev, page: Math.max(prev.page-1, 0)}))}}
                    >{"<"}</button>
                    <p>{filters.page+1}</p>
                    <button
                    onClick={() => {setFilters(prev => ({...prev, page: prev.page+1}))}}
                    >{">"}</button>
                </div>
            </div>
            <table className="w-full text-left border-collapse">
                <thead className="text-sm text-">
                    <tr>
                        <th>Status</th>
                        <th>Problem</th>
                        <th>Difficulty</th>
                        <th>Count</th>
                        <th>Solve</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem) => (
                        <ProblemRow key={problem.problemId} problem={problem} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}