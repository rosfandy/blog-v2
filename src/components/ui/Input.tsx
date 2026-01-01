"use client";

interface InputProps {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    [key: string]: any;
}

const Input: React.FC<InputProps> = ({
    type = "text",
    value,
    onChange,
    placeholder,
    className = "",
    ...rest
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-xl px-4 py-3 text-gray-800 dark:text-white
                outline-none focus:outline-none focus:ring-0
                transition-all text-sm font-medium ${className}`}
            {...rest}
        />
    );
};

export default Input;
