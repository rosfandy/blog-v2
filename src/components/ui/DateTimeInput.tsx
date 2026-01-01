"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MdExpandMore, MdCalendarToday, MdAccessTime } from "react-icons/md";

interface DateTimeInputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({ value, onChange, className = "" }) => {
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);
    const [tempDate, setTempDate] = useState("");
    const [tempTime, setTempTime] = useState("");

    const containerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    // Parse existing value
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            const dateStr = date.toISOString().split('T')[0];
            const timeStr = date.toTimeString().slice(0, 5);
            setTempDate(dateStr);
            setTempTime(timeStr);
        }
    }, [value]);

    // Format display value
    const getDisplayValue = () => {
        if (!value) return null;
        const date = new Date(value);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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

    /** APPLY CHANGES */
    const handleApply = () => {
        if (tempDate && tempTime) {
            const dateTimeStr = `${tempDate}T${tempTime}:00`;
            onChange(new Date(dateTimeStr).toISOString());
            closeDropdown();
        }
    };

    /** CLEAR */
    const handleClear = () => {
        onChange("");
        setTempDate("");
        setTempTime("");
        closeDropdown();
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={toggle}
                className="
                    w-full min-h-[44px] flex items-center gap-2
                    border border-gray-200 dark:border-white/10
                    rounded-xl px-3 py-2 text-sm
                    text-gray-800 dark:text-white
                    focus:outline-none
                    hover:border-primary/50 transition-colors
                "
            >
                <MdCalendarToday className="text-gray-400" />
                {value ? (
                    <span className="flex-1 text-left">{getDisplayValue()}</span>
                ) : (
                    <span className="flex-1 text-left text-gray-400">Select date and time</span>
                )}
                <MdExpandMore
                    className={`text-lg transition-transform ${open ? "rotate-180" : ""
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
                        bg-white dark:bg-surface-dark
                        shadow-lg
                    "
                >
                    <div className="p-4 space-y-4">
                        {/* Date Input */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                <MdCalendarToday className="text-sm" />
                                Date
                            </label>
                            <input
                                type="date"
                                value={tempDate}
                                onChange={(e) => setTempDate(e.target.value)}
                                className="
                                    w-full px-3 py-2 text-sm
                                    border border-gray-200 dark:border-white/10
                                    rounded-lg
                                    bg-white dark:bg-surface-dark
                                    text-gray-800 dark:text-white
                                    focus:border-primary focus:ring-1 focus:ring-primary
                                    outline-none transition-all
                                "
                            />
                        </div>

                        {/* Time Input */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                <MdAccessTime className="text-sm" />
                                Time
                            </label>
                            <input
                                type="time"
                                value={tempTime}
                                onChange={(e) => setTempTime(e.target.value)}
                                className="
                                    w-full px-3 py-2 text-sm
                                    border border-gray-200 dark:border-white/10
                                    rounded-lg
                                    bg-white dark:bg-surface-dark
                                    text-gray-800 dark:text-white
                                    focus:border-primary focus:ring-1 focus:ring-primary
                                    outline-none transition-all
                                "
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="
                                    flex-1 px-3 py-2 text-sm font-medium
                                    border border-gray-200 dark:border-white/10
                                    rounded-lg
                                    text-gray-700 dark:text-gray-300
                                    hover:bg-gray-100 dark:hover:bg-white/10
                                    transition-colors
                                "
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                disabled={!tempDate || !tempTime}
                                className="
                                    flex-1 px-3 py-2 text-sm font-medium
                                    bg-primary text-white
                                    rounded-lg
                                    hover:bg-primary-opposite
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    transition-colors
                                "
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateTimeInput;