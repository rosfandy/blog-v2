"use client";

interface VisitorGrowthChartProps {
    data: { day: string; value: string; height: string }[];
}

const VisitorGrowthChart: React.FC<VisitorGrowthChartProps> = ({ data }) => {
    return (
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white/60 dark:bg-surface-dark/60 backdrop-blur-md border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Visitor Growth</h3>
                <select className="bg-transparent border border-gray-200 dark:border-white/10 rounded-lg text-xs font-bold text-gray-500 focus:ring-0 focus:border-primary cursor-pointer outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 w-full">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="w-full bg-primary/10 dark:bg-primary/5 hover:bg-primary/40 dark:hover:bg-primary/30 rounded-t-lg transition-all relative group cursor-pointer"
                        style={{ height: item.height }}
                    >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">{item.value}</div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day}>{day}</span>
                ))}
            </div>
        </div>
    );
};

export default VisitorGrowthChart;