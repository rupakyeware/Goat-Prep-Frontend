export default function SearchBar({value, onChange, placeholder = "Search..."}) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full px-2 py-1 text-white"
            value={value}
            onChange={onChange}
        />
    )
}