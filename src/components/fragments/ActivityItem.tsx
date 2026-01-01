"use client";

import { MdPersonAdd } from 'react-icons/md';

interface ActivityItemProps {
    avatar: string;
    name: string;
    action: string;
    post?: string;
    detail: string;
    time: string;
    icon?: 'person_add';
}

const iconMap = {
    person_add: MdPersonAdd,
};

const ActivityItem: React.FC<ActivityItemProps> = ({ avatar, name, action, post, detail, time, icon }) => {
    const isTextAvatar = avatar.length <= 2;

    return (
        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors cursor-pointer">
            <div className={`w-10 h-10 rounded-full ${isTextAvatar ? 'bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm' : 'bg-surface-dark border border-white/10 flex items-center justify-center text-primary'}`}>
                {isTextAvatar ? avatar : <MdPersonAdd className="text-sm" />}
            </div>
            <div>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold">{name}</span> {action} {post && <span className="font-bold text-primary">&quot;{post}&quot;</span>}
                </p>
                <p className="text-xs text-gray-500 mt-1">{detail}</p>
                <span className="text-[10px] font-bold text-gray-400 mt-2 block">{time}</span>
            </div>
        </div>
    );
};

export default ActivityItem;