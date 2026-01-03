"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { MdHome, MdSearch, MdPerson, MdFolder, MdEditNote, MdErrorOutline, MdSentimentVeryDissatisfied } from "react-icons/md";

export default function NotFound() {
    useEffect(() => {
        gsap.fromTo(".not-found-content",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    return (
        <main className="flex-grow py-32 md:py-24 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center relative min-h-[60vh]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-center opacity-[0.13] dark:opacity-[0.05]">
                <MdSentimentVeryDissatisfied className="text-[30vw] text-primary rotate-12" />
            </div>
            <div className="text-center relative z-10 max-w-3xl mx-auto not-found-content">
                <div className="mb-2 inline-flex items-center gap-2 border border-secondary/30 bg-secondary/10 px-4 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="text-xs font-mono font-bold uppercase text-secondary tracking-widest">Error 404</span>
                </div>
                <h1 className="font-display text-[24vw] md:text-[14vw] leading-[0.85]  tracking-tighter text-transparent select-none relative z-10">
                    <div className="relative inline-block">
                        <span className={`transition-all duration-500 retro-3d-text`}>
                            404
                        </span>
                    </div>
                </h1>
                <h2 className="font-display text-4xl md:text-6xl text-secondary dark:text-secondary uppercase mt-4 mb-8 -rotate-2 transform origin-center">
                    Page Not Found
                </h2>
                <p className="font-sans text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-12 leading-relaxed">
                    Oops! It looks like you've wandered into the digital void. The page you're looking for might have been moved, deleted, or never existed in the first place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link className="bg-primary hover:bg-primary/90 text-white font-mono uppercase text-sm font-bold py-4 px-8 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg flex items-center gap-2" href="/">
                        <MdHome className="text-lg" />
                        Back to Homepage
                    </Link>
                </div>
                <div className=" pt-16 border-t border-primary/10 dark:border-white/5 w-full">
                    <p className="font-mono text-xs uppercase font-bold text-gray-400 mb-6 tracking-wide">Or check out these popular pages:</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        <Link className="group flex items-center gap-2 text-primary dark:text-[#9f9cff] font-display uppercase text-xl md:text-2xl hover:text-secondary transition-colors" href="/work">
                            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all">
                                <MdFolder className="text-sm" />
                            </span>
                            Projects
                        </Link>
                        <Link className="group flex items-center gap-2 text-primary dark:text-[#9f9cff] font-display uppercase text-xl md:text-2xl hover:text-secondary transition-colors" href="/blog">
                            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all">
                                <MdEditNote className="text-sm" />
                            </span>
                            Blog
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}