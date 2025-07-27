import { useEffect, useState } from "react";
import { getFilteredProblems, getProblemsByCompanyId, getProblemsByName } from "../../../services/problems/problemService";
import ProblemRow from "./ProblemRow";
import SearchBar from "../common/TextInput";
import { FileText } from "react-bootstrap-icons";
import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropleft, IoMdArrowDropleftCircle, IoMdArrowDropright, IoMdArrowDroprightCircle } from "react-icons/io";
import { useUser } from "../../../context/UserContext";

export default function ProblemsTable() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { solvedProblems, markProblemSolved, filters, setFilters } = useUser();

    useEffect(() => {
        console.log(JSON.stringify(filters));
        // Fetch problems data with filters (if any)
        const fetchData = async () => {
            try { 
                setLoading(true);
                let data;
                if (filters.companyId) {
                    data = await getProblemsByCompanyId(filters);
                }
                else {
                    if (filters.name?.trim()) {
                        data = await getProblemsByName({ name: filters.name });
                    }
                    else {
                        data = await getFilteredProblems(filters);
                    }
                }
                setProblems(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [filters]);
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
                    ) : <div className="flex">
                            <p className="text-white text-3xl">{filters.companyName}</p>
                        </div>}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                setFilters((prev) => ({
                                    ...prev,
                                    page: Math.max(prev.page - 1, 0),
                                }));
                            }}
                            className="hover:text-yellow"
                        >
                            <IoMdArrowDropleftCircle className="w-7 h-7" />
                        </button>
                        <p>{filters.page + 1}</p>
                        <button
                            disabled={problems.length === 0}
                            onClick={() => {
                                setFilters((prev) => ({
                                    ...prev,
                                    page: prev.page + 1,
                                }));
                            }}
                            className={problems.length === 0 ? "text-slate cursor-not-allowed" : "hover:text-yellow"}
                        >
                            <IoMdArrowDroprightCircle className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 mb-1 grid grid-cols-[1fr_10fr_2fr_2fr] w-full text-light-heading text-sm text-left px-2 py-1">
                <div>Status</div>
                <div>Problem</div>
                <div>Difficulty</div>
                <div>Times Asked</div>
            </div>
            {loading ? (
                <p className="text-gray text-center mt-4">Loading...</p>
            ) : problems.length === 0 ? (
                <p className="text-gray text-center mt-4">Nothing to see here</p>
            ) : (
                problems.map((problem) => (
                    <ProblemRow key={`${problem.problemId}-${solvedProblems.length}`} problem={problem} />
                ))
            )}
        </div>
    )
}