export default function SearchBar({ value, onChange, placeholder = "Search...", icon }) {
  return (
    <div className="flex items-center bg-gray rounded-md px-4 py-2 w-84 gap-x-1">
      {icon && <span className="text-white mr-2">{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full text-white outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}