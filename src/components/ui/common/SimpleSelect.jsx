import Select from "react-select";

export default function SimpleSelect({
    loadOptions,
    isMulti = false, 
    placeholder = "Search...",
    onChange, 
    value,
    label,
    ...rest // ⬅️ Catch all extra props
}) {
    return (
        <div className="text-white w-full">
            {label && <label className="block mb-1">{label}</label>}
            <Select
                options={loadOptions}
                defaultValue={loadOptions[0]}
                isMulti={isMulti}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                {...(rest.onMenuOpen ? { onMenuOpen: rest.onMenuOpen } : {})} // ⬅️ Conditionally forward
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: "#434343",
                        borderColor: "#333",
                        color: "#E7E7E7",
                        textAlign: "left"
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "#1f1f1f",
                        color: "#fff",
                        textAlign: "left"
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#333" : "#1f1f1f",
                        color: "#fff",
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "#fff",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#333",
                        color: "#fff",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "#fff",
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: "#fff",
                        ':hover': {
                            backgroundColor: "#555",
                            color: "white",
                        },
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 4,
                    colors: {
                        ...theme.colors,
                        primary25: "#333",
                        primary: "#555",
                    },
                })}
            />
        </div>
    )
}