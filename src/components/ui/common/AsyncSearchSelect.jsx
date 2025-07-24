import AsyncSelect from "react-select/async";

export default function AsyncSearchSelect({
    loadOptions,
    isMulti = false,
    placeholder = "Search...",
    onChange,
    value,
    label
}) {
    return (
        <div className="text-white w-full">
            {label && <label className="block mb-1">{label}</label>}
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                isMulti={isMulti}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: "#434343",
                        borderColor: "#333",
                        color: "#E7E7E7",
                        textAlign: "left"
                    }),
                    input: (base) => ({
                        ...base,
                        '[type="text"]':{
                            color: 'white !important'
                        }
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "#1f1f1f",
                        color: "#E7E7E7",
                        textAlign: "left"

                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#333" : "#1f1f1f",
                        color: "#E7E7E7",
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "#fff",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#333",
                        color: "#E7E7E7",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "#E7E7E7",
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
    );
}