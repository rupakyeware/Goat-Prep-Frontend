import { useNavigate } from "react-router-dom";
import { MAANG } from "../../constants/companies.js";
import { useAuth } from "../../context/AuthContext.jsx";
import AsyncSearchSelect from "../ui/common/AsyncSearchSelect.jsx";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash/debounce";
import { loadCompaniesForAsyncSearch } from "../../services/company/companyService.js";
import SimpleSelect from "../ui/common/SimpleSelect.jsx";
import RangeSlider from "../ui/common/RangeSlider.jsx";
import SimpleButton from "../ui/common/SimpleButton.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { filter } from "lodash";

export default function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { filters, setFilters } = useUser();
    const [sliderValue, setSliderValue] = useState(0);

    const difficultyOptions = [
        { value: "", label: "All" },
        { value: "0", label: "Easy" },
        { value: "1", label: "Medium" },
        { value: "2", label: "Hard" },
    ]

    const handleButtonClick = () => {
        navigate("/submit");
    }

    const handleDifficultyChange = (newDifficulty) => {
        setFilters(prev => ({
            ...prev,
            difficulty: newDifficulty.value,
            page: 0
        }));
    }

    const handleMinLookupsChange = (newMinLookups) => {
        setFilters(prev => ({
            ...prev,
            minLookups: newMinLookups,
            page: 0
        }));
    }

    const debouncedOnChange = useMemo(() => debounce((val) => {
        setFilters(prev => ({
            ...prev,
            minLookups: val,
            page: 0

        }));
    }, 200), []);

    useEffect(() => {
        debouncedOnChange(sliderValue);
    }, [sliderValue])

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
                        value={sliderValue}
                        onChange={setSliderValue}
                    />
                </div>
            </div>
            {/* MAANG questions */}
            <div className="bg-sidebar-main border border-solid border-slate px-3 py-6 rounded-md">
                <AsyncSearchSelect
                    placeholder="Search for popular companies"
                    value={filters.companyName !== undefined ? filters.companyName : ""}
                    onChange={(val) => {
                        setFilters((prev => ({
                            ...prev,
                            companyName: val?.label,
                            companyId: val?.value
                        })))
                    }}
                    loadOptions={loadCompaniesForAsyncSearch}
                />
                <ul className="text-left mt-2 space-y-1 text-light-heading">
                        <li className="hover:bg-slate hover:cursor-pointer py-1 px-2 rounded-md"
                        onClick={() => {
                            setFilters((prev) => ({
                                ...prev,
                                companyName: undefined,
                                companyId: undefined,
                                page: 0
                            }))
                        }}
                        >
                            All
                        </li>
                    {Object.keys(MAANG).map((companyName) => (
                        <li className="hover:bg-slate hover:cursor-pointer py-1 px-2 rounded-md"
                        onClick={() => {
                            setFilters((prev) => ({
                                ...prev,
                                companyName: companyName,
                                companyId: MAANG[companyName],
                                page: 0
                            }))
                        }}
                        >
                            {companyName}
                        </li>
                    ))}
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

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        debouncedOnChange.cancel?.();
    });
}