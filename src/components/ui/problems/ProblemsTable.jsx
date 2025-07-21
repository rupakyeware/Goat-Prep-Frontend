import { useEffect, useState } from "react";
import { getFilteredProblems, getProblemsByCompanyId, getProblemsByName } from "../../../services/problems/problemService";
import ProblemRow from "./ProblemRow";
import SearchBar from "../common/SearchBar";
import { FileText } from "react-bootstrap-icons";
import { BiSearch } from "react-icons/bi";

export default function ProblemsTable({ filters, setFilters }) {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        // Fetch problems data with filters (if any)
        const fetchData = async () => {
            try {
                let data;
                if (filters.companyId) {
                    data = await getProblemsByCompanyId(filters);
                }
                else {
                    if (filters.name?.trim()) {
                        data = await getProblemsByName({ name: filters.name });
                    }
                    else data = await getFilteredProblems(filters);
                }
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
            <div className="w-full mt-4 flex justify-between items-center justify-between gap-4">
                <div className="flex w-full justify-between items-center gap-4">
                    {!filters.companyId ? (
                        <div className="flex-1">
                            <SearchBar
                                value={filters.name ?? ""}
                                placeholder="Search for problems"
                                icon={<BiSearch />}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                        page: 0,
                                    }))
                                }
                            />
                        </div>
                    ) : <div className="flex-1" />}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                setFilters((prev) => ({
                                    ...prev,
                                    page: Math.max(prev.page - 1, 0),
                                }));
                            }}
                        >
                            {"<"}
                        </button>
                        <p>{filters.page + 1}</p>
                        <button
                            onClick={() => {
                                setFilters((prev) => ({
                                    ...prev,
                                    page: prev.page + 1,
                                }));
                            }}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
            <table className="w-full text-left border-collapse mt-4">
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