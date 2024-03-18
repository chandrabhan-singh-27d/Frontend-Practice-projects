import { forwardRef, useId } from "react";

const Select = ({
    options,
    label,
    className = "",
    ...props
}, ref) => {
    const ID = useId()
    return (
        <div className="w-full">
            {label && <label
                htmlFor={ID}
                className=''
            >
                {label}
            </label>}
            <select
                {...props}
                id={ID}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}
            >
                {options?.map(eachOption => (
                    <option key={eachOption} value={eachOption}>
                        {eachOption}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(Select);