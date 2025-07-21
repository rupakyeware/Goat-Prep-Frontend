import { useNavigate } from "react-router-dom";
import { MAANG } from "../../constants/companies.js";
import { useAuth } from "../../context/AuthContext.jsx";
import AsyncSearchSelect from "../ui/common/AsyncSearchSelect.jsx";
import { useEffect, useState } from "react";
import { loadCompaniesForAsyncSearch } from "../../services/company/companyService.js";
import SimpleSelect from "../ui/common/SimpleSelect.jsx";
import RangeSlider from "../ui/common/RangeSlider.jsx";
import SimpleButton from "../ui/common/SimpleButton.jsx";

export default function Sidebar({ filters, setFilters }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [selectedCompany, setSelectedCompany] = useState(null);

    const difficultyOptions = [
        { value: "", label: "All" },
        { value: "0", label: "Easy" },
        { value: "1", label: "Medium" },
        { value: "2", label: "Hard" },
    ]

    useEffect(() => {
        if (selectedCompany && selectedCompany.value) {
            navigate("/company/" + selectedCompany.value);
        }
    }, [selectedCompany])

    const handleButtonClick = () => {
        navigate("/submit");
    }

    const handleDifficultyChange = (newDifficulty) => {
        setFilters(prev => ({ ...prev, difficulty: newDifficulty.value }));
    }

    const handleMinLookupsChange = (newMinLookups) => {
        setFilters(prev => ({ ...prev, minLookups: newMinLookups }));
    }

    return (
        <div className="min-h-screen w-85 text-white flex flex-col px-4 py-12">
            {/* Filters */}
            <div className="mb-4 bg-sidebar-main border border-solid border-slate px-3 py-6 rounded-md">
                <h3 className="text-xl text-left text-light-heading">Filters</h3>
                {/* Difficulty Filter */}
                <p className="text-left text-sm text-light-heading mt-2 mb-1">Difficulty</p>
                <SimpleSelect
                    loadOptions={difficultyOptions}
                    placeholder="All"
                    onChange={handleDifficultyChange}
                />
                {/* Min Lookups Filter */}
                <p className="text-left text-sm text-light-heading mt-3">Times Asked</p>
                <div className="px-2">
                    <RangeSlider
                        min={0}
                        max={1000}
                        value={filters.minLookups}
                        onChange={(val) => setFilters(prev => ({ ...prev, minLookups: val }))}
                    />
                </div>
            </div>
            {/* MAANG questions */}
            <div className="bg-sidebar-main border border-solid border-slate px-3 py-6 rounded-md">
                <AsyncSearchSelect
                    placeholder="Search for popular companies"
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    loadOptions={loadCompaniesForAsyncSearch}
                />
                <ul className="text-left mt-2 space-y-1 text-light-heading">
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/"} className="block w-full hover:text-white">All</a>
                    </li>
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/company/" + MAANG.Meta} className="block w-full hover:text-white">Meta</a>
                    </li>
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/company/" + MAANG.Apple} className="block w-full hover:text-white">Apple</a>
                    </li>
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/company/" + MAANG.Amazon} className="block w-full hover:text-white">Amazon</a>
                    </li>
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/company/" + MAANG.Nvidia} className="block w-full hover:text-white">Nvidia</a>
                    </li>
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/company/" + MAANG.Netflix} className="block w-full hover:text-white">Netflix</a>
                    </li>
                    <li className="hover:bg-slate py-1 px-2 rounded-md">
                        <a href={"/company/" + MAANG.Google} className="block w-full hover:text-white">Google</a>
                    </li>
                </ul>
            </div>
            <div className="mt-4">
                <SimpleButton
                    onClick={handleButtonClick}
                    text="Submit Experience"
                    className="w-full text-white border border-[0.5px] border-yellow hover:bg-yellow hover:text-black py-2 rounded-md"
                />
            </div>
            <div className="mt-auto">
                <SimpleButton
                    onClick={logout}
                    text="Sign Out"
                    className="w-full text-white border border-[0.5px] border-red-500 hover:bg-red-500 hover:text-white py-2 rounded-md"
                />
            </div>
        </div>
    )
}