"use client";

import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

interface PopularPostItemProps {
    rank: string;
    title: string;
    category: string;
    views: string;
    change: number;
}

const PopularPostItem: React.FC<PopularPostItemProps> = ({ rank, title, category, views, change }) => {
    const isPositive = change > 0;
    const Icon = isPositive ? MdArrowUpward : MdArrowDownward;
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors group">
            <div className="flex items-center gap-4">
                <span className="text-lg font-display text-gray-300 dark:text-gray-600 w-4">{rank}</span>
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">{title}</span>
                    <span className="text-xs text-gray-500">{category}</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="font-bold text-sm text-gray-800 dark:text-white">{views}</span>
                <span className={`text-[10px] ${colorClass} flex items-center`}>
                    <Icon className="text-[10px] mr-0.5" /> {Math.abs(change)}%
                </span>
            </div>
        </div>
    );
};

export default PopularPostItem;