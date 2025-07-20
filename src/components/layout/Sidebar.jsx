export default function Sidebar({filters, setFilters}) {
    const handleDifficultyChange = (newDifficulty) => {
        setFilters(prev => ({...prev, difficulty: newDifficulty}));
    }

    const handleMinLookupsChange = (newMinLookups) => {
        setFilters(prev=> ({...prev, minLookups: newMinLookups}));
    }

    return (
        <div className="min-h-screen text-white flex flex-col">
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
            <div className="flex-grow bg-black p-2">
                <h3 className="text-lg mb-2">Search questions in</h3>
            </div>
        </div>
    )
}