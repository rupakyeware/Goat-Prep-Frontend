import { useNavigate } from "react-router-dom";
import { MAANG } from "../../constants/companies.js";
import { useAuth } from "../../context/AuthContext.jsx";
import AsyncSearchSelect from "../ui/common/AsyncSearchSelect.jsx";
import { useEffect, useState } from "react";
import { loadCompaniesForAsyncSearch } from "../../services/company/companyService.js";

export default function Sidebar({filters, setFilters}) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if(selectedCompany && selectedCompany.value) {
            navigate("/company/" + selectedCompany.value);
        }
    },[selectedCompany])

    const handleButtonClick = () => {            
        navigate("/submit");
    }

    const handleDifficultyChange = (newDifficulty) => {
        setFilters(prev => ({...prev, difficulty: newDifficulty}));
    }

    const handleMinLookupsChange = (newMinLookups) => {
        setFilters(prev=> ({...prev, minLookups: newMinLookups}));
    }

    return (
        <div className="min-h-screen min-w-64 text-white flex flex-col">
            {/* Filters */}
            <div className="mb-4 bg-black p-2">
                <h3 className="text-lg">Filter questions by</h3>
                {/* Difficulty Filter */}
                <p className="text-left mt-2">Difficulty</p>
                <select 
                className="w-full" 
                value={filters.difficulty ?? ""} 
                onChange={(e) => {
                    handleDifficultyChange(e.target.value)
                }}>
                    <option value="">All</option>
                    <option value="0">Easy</option>
                    <option value="1">Medium</option>
                    <option value="2">Hard</option>
                </select>
                {/* Min Lookups Filter */}
                <p className="text-left mt-2">Times Asked</p>
                <input 
                className="w-full"
                type="number" 
                placeholder="All" 
                value={filters.minLookups ?? ""} 
                onChange={(e) => {
                    handleMinLookupsChange(e.target.value);
                }}/>
            </div>
            {/* MAANG questions */}
            <div className="bg-black p-2">
                <AsyncSearchSelect
                    placeholder="Search for popular companies"
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    loadOptions={loadCompaniesForAsyncSearch}
                />
                <ul className="space-y-1 text-left mt-2">
                    <li><a href={"/"}>All</a></li>
                    <li><a href={"/company/" + MAANG.Meta}>Meta</a></li>
                    <li><a href={"/company/" + MAANG.Apple}>Apple</a></li>
                    <li><a href={"/company/" + MAANG.Amazon}>Amazon</a></li>
                    <li><a href={"/company/" + MAANG.Nvidia}>Nvidia</a></li>
                    <li><a href={"/company/" + MAANG.Netflix}>Netflix</a></li>
                    <li><a href={"/company/" + MAANG.Google}>Google</a></li>
                </ul>
            </div>
            <button onClick={handleButtonClick}>Submit Experience</button>
            <div className="mt-auto p-2">
                <button 
                    onClick={logout} 
                    className="w-full text-red-500 hover:bg-red-500 hover:text-white py-2 mt-4"                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}