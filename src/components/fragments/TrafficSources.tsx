"use client";

interface TrafficSource {
    name: string;
    percentage: number;
    color: string;
}

interface TrafficSourcesProps {
    sources: TrafficSource[];
}

const TrafficSources: React.FC<TrafficSourcesProps> = ({ sources }) => {
    return (
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white/60 dark:bg-surface-dark/60 backdrop-blur-md border border-gray-200 dark:border-white/5 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Traffic Sources</h3>
            <div className="flex flex-col gap-6 flex-1 justify-center">
                {sources.map((source, index) => (
                    <div key={index} className="group">
                        <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full bg-${source.color}-500`}></span> {source.name}
                            </span>
                            <span className="text-gray-800 dark:text-white">{source.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-white/5 rounded-full h-2 overflow-hidden">
                            <div className={`bg-${source.color}-500 h-2 rounded-full w-[${source.percentage}%] transition-all duration-1000 ease-out group-hover:w-[${source.percentage + 3}%]`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrafficSources;