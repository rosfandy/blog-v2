"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { MdExpandMore, MdClose } from "react-icons/md";

export interface SelectOption {
    value: string;
    label: string;
}

interface SingleSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    mode?: "single";
    showSearch?: boolean;
    className?: string;
}

interface MultipleSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: SelectOption[];
    placeholder?: string;
    mode: "multiple";
    showSearch?: boolean;
    className?: string;
}

type SelectProps = SingleSelectProps | MultipleSelectProps;

const Select = (props: SelectProps) => {
    const { value, onChange, options, placeholder = "Select option", mode = "single", showSearch = false, className = "" } = props;
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);
    const [query, setQuery] = useState("");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const isMultiple = mode === "multiple";
    const selectedValues = isMultiple ? (value as string[]) : value ? [value as string] : [];

    const handleSelect = (newValue: string | string[]) => {
        if (isMultiple) {
            (onChange as (value: string[]) => void)(newValue as string[]);
        } else {
            (onChange as (value: string) => void)(newValue as string);
        }
    };

    /** FILTER */
    const filteredOptions = useMemo(() => {
        if (!showSearch) return options;
        return options.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [options, query, showSearch]);

    /** OPEN */
    const openDropdown = () => {
        setRender(true);
        setOpen(true);
    };

    /** CLOSE */
    const closeDropdown = () => {
        if (!listRef.current) {
            setOpen(false);
            setRender(false);
            return;
        }

        gsap.to(listRef.current, {
            opacity: 0,
            y: -8,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                setOpen(false);
                setRender(false);
                setQuery("");
            },
        });
    };

    const toggle = () => {
        open ? closeDropdown() : openDropdown();
    };

    /** CLICK OUTSIDE */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                open &&
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    /** OPEN ANIMATION */
    useEffect(() => {
        if (open && listRef.current) {
            gsap.fromTo(
                listRef.current,
                { opacity: 0, y: -8 },
                { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
            );
        }
    }, [open]);

    /** SELECT */
    const selectValue = (val: string) => {
        if (isMultiple) {
            const next = selectedValues.includes(val)
                ? selectedValues.filter((v) => v !== val)
                : [...selectedValues, val];

            handleSelect(next);
        } else {
            handleSelect(val);
            closeDropdown();
        }
    };

    const removeValue = (val: string) => {
        if (!isMultiple) return;
        handleSelect(selectedValues.filter((v) => v !== val));
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={toggle}
                className="
                    w-full min-h-[44px] flex flex-wrap items-center gap-2
                    border border-gray-200 dark:border-white/10
                    rounded-xl px-3 py-2 text-sm
                    text-gray-800 dark:text-white
                    focus:outline-none
                "
            >
                {selectedValues.length === 0 && (
                    <span className="text-gray-400">{placeholder}</span>
                )}

                {selectedValues.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    if (!opt) return null;

                    return isMultiple ? (
                        <span
                            key={val}
                            className="
                                flex items-center gap-1
                                bg-primary/10 text-primary
                                rounded-lg px-2 py-0.5 text-xs font-medium
                            "
                        >
                            {opt.label}
                            <MdClose
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeValue(val);
                                }}
                            />
                        </span>
                    ) : (
                        <span key={val}>{opt.label}</span>
                    );
                })}

                <MdExpandMore
                    className={`ml-auto text-lg transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown */}
            {render && (
                <div
                    ref={listRef}
                    className="
                        absolute z-30 mt-2 w-full overflow-hidden
                        rounded-xl border border-gray-200 dark:border-white/10
                        bg-white dark:bg-neutral-900
                        shadow-lg
                    "
                >
                    {showSearch && (
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="
                                w-full px-3 py-2 text-sm
                                border-b border-gray-200 dark:border-white/10
                                bg-transparent outline-none
                            "
                        />
                    )}

                    <div className="max-h-56 overflow-y-auto">
                        {filteredOptions.length === 0 && (
                            <div className="px-4 py-3 text-sm text-gray-400">
                                No results
                            </div>
                        )}

                        {filteredOptions.map((o) => {
                            const active = selectedValues.includes(o.value);

                            return (
                                <button
                                    key={o.value}
                                    type="button"
                                    onClick={() => selectValue(o.value)}
                                    className={`
                                        w-full flex items-center justify-between
                                        px-4 py-2 text-sm text-left
                                        hover:bg-gray-100 dark:hover:bg-white/10
                                        transition-colors
                                        ${
                                            active
                                                ? "text-primary font-semibold"
                                                : "text-gray-700 dark:text-gray-200"
                                        }   
                                    `}
                                >
                                    {o.label}
                                    {active && "✓"}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select;
