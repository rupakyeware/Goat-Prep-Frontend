export default function PrimaryButton({ type = "button", onClick, disabled, children }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full bg-primary text-black py-3 px-6 rounded-md text-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
}
