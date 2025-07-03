export default function Sidebar() {
    return (
        <div className="w-60 min-h-screen p-4 text-white fixed top-0 left-0 flex flex-col p-6">
            {/* Filters */}
            <div className="mb-4 bg-black ">
                <h3 className="text-lg mb-2">Filter questions by</h3>
            </div>
            <div className="flex-grow bg-black ">
                <h3 className="text-lg mb-2">Search questions in</h3>
            </div>
        </div>
    )
}