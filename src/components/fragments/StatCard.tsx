"use client";

import { MdVisibility, MdArticle, MdChatBubble, MdSchedule } from 'react-icons/md';

interface StatCardProps {
    icon: 'visibility' | 'article' | 'chat_bubble' | 'schedule';
    title: string;
    value: string;
    change: string;
    changeColor: 'green' | 'red';
}

const iconMap = {
    visibility: MdVisibility,
    article: MdArticle,
    chat_bubble: MdChatBubble,
    schedule: MdSchedule,
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeColor }) => {
    const Icon = iconMap[icon];
    const changeClass = changeColor === 'green' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10';

    return (
        <div className="p-5 rounded-2xl bg-white/60 dark:bg-surface-dark/60 backdrop-blur-md border border-gray-200 dark:border-white/5 flex flex-col justify-between group hover:border-secondary/30 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <span className={`p-2 rounded-lg bg-secondary/10 text-secondary`}>
                    <Icon className="text-lg" />
                </span>
                <span className={`text-xs font-bold ${changeClass} px-2 py-1 rounded-full`}>{change}</span>
            </div>
            <div>
                <span className="text-gray-500 text-xs font-bold tracking-wider uppercase">{title}</span>
                <h3 className="font-display text-3xl text-gray-800 dark:text-white mt-1">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;