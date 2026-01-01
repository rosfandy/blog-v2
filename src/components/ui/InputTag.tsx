"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

interface InputTagProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
}

const InputTag: React.FC<InputTagProps> = ({ value, onChange, placeholder = "Add tags...", className = "" }) => {
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        if (inputValue.trim() && !value.includes(inputValue.trim())) {
            onChange([...value, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeTag = (tag: string) => {
        onChange(value.filter(t => t !== tag));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className={`bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-2 min-h-[80px] focus-within:border-primary transition-all flex flex-wrap gap-2 content-start ${className}`}>
            {value.map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-primary/20 text-primary border border-primary/30">
                    {tag}
                    <button
                        type="button"
                        className="ml-1 hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTag(tag);
                        }}
                    >
                        <MdClose />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                className="bg-transparent border-none focus:ring-0 outline-none text-sm p-1 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 min-w-[80px] flex-1"
            />
        </div>
    );
};

export default InputTag;