"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

type SplashScreenProps = {
    onFinish?: () => void;
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
    const [progress, setProgress] = useState(0);
    const logoRef = useRef(null);
    const creativeRef = useRef(null);
    const developerRef = useRef(null);
    const smartToyRef = useRef(null);
    const autoAwesomeRef = useRef(null);
    const progressBarRef = useRef(null);
    const loadingTextRef = useRef(null);

    const now = new Date();
    const currentYear = now.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = monthNames[now.getMonth()];

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate in elements
        tl
          .to(progressBarRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
          .to(loadingTextRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

        // Animate progress bar fill
        tl.to({ progress: 0 }, {
            progress: 100,
            duration: 5.5,
            ease: "power2.inOut",
            onUpdate: function() {
                setProgress(Math.floor(this.targets()[0].progress));
            },
            onComplete: () => {
                setTimeout(() => {
                    onFinish?.();
                }, 400);
            }
        });

        // Add pulse effect to border
        gsap.to(".animate-pulse-fast", {
            scale: 1.05,
            opacity: 0.7,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });

        return () => {
            tl.kill();
        };
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-[9999] bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light font-body overflow-hidden flex flex-col items-center justify-center transition-colors duration-300">

            {/* Center Content */}
            <div className="relative flex flex-col items-center justify-center z-10 w-full max-w-4xl px-4">
                <div className="relative mb-12 text-center select-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[140%] border border-primary/30 dark:border-primary-opposite/30 rounded-[100%] rotate-[-12deg] animate-pulse-fast pointer-events-none" />
                </div>

                {/* Progress */}
                <div className="w-full max-w-md flex flex-col items-center gap-4 mt-8">
                    <div className="flex justify-between w-full font-display text-xl uppercase tracking-widest text-primary dark:text-primary-opposite">
                        <span>Loading Assets</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>

                    <div ref={progressBarRef} className="w-full h-4 border-2 border-primary dark:border-primary-opposite rounded-full p-1 box-content relative overflow-hidden">
                        <div
                            className="h-full bg-primary dark:bg-primary-opposite rounded-full"
                            style={{ width: `${progress}%` }}
                        >
                            <div
                                className="absolute inset-0 w-full h-full opacity-30"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px)",
                                }}
                            />
                        </div>
                    </div>

                    <p ref={loadingTextRef} className="mt-4 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Preparing...
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 w-full flex justify-between px-8 md:px-12 text-xs font-bold font-mono tracking-tighter uppercase text-primary dark:text-primary-opposite">
                <div className="hidden md:block">Indonesia, ID</div>
                <div>© {currentYear} • Rosfandy</div>
                <div className="hidden md:block">{currentMonth} {currentYear}</div>
            </div>
        </div>
    );
}
