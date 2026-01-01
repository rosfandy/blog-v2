"use client";

const CommentDashboardContent = () => {
    return (
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
            <header className="w-full p-6 md:p-8 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="font-display text-4xl md:text-5xl text-gray-800 dark:text-white tracking-tight mb-2">COMMENTS<span className="text-primary">.</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage and moderate your blog comments.</p>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="text-center py-12">
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No Comments Yet</h3>
                    <p className="text-gray-500 mb-6">Comments will appear here once readers start engaging with your posts.</p>
                </div>
            </div>
        </main>
    );
};

export default CommentDashboardContent;