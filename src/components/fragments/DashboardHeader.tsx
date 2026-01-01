"use client";

import { MdNotifications, MdAdd } from 'react-icons/md';

interface DashboardHeaderProps {
    title: string;
    description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
    return (
        <header className="w-full p-6 md:p-8 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="font-display text-4xl md:text-5xl text-gray-800 dark:text-white tracking-tight mb-2">{title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-white/5 hover:text-primary transition-colors">
                    <MdNotifications className="text-lg" />
                </button>
                <button className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-secondary/30 transform hover:-translate-y-0.5">
                    <MdAdd className="text-lg" />
                    CREATE POST
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;