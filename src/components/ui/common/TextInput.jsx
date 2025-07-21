export default function SearchBar({value, onChange, placeholder = "Search...", icon}) {
    return (
        <div className="flex items-center bg-gray rounded-md px-4 py-2 space-x-2">
            {icon && <span>{icon}</span>}
            <input
                type="text"
                placeholder={placeholder}
                className="w-full text-md text-white outline-none focus:ring-0 focus:outline-none"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}