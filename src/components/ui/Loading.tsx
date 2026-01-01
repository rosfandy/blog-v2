"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Loading({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const loadingTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl
      // intro
      .fromTo(
        progressBarRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        loadingTextRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      )

      // fake progress
      .to(
        { progress: 0 },
        {
          progress: 100,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate() {
            setProgress(Math.floor(this.targets()[0].progress));
          },
          onComplete() {
            // outro
            onFinish();
          },
        }
      );

    // pulse ring
    gsap.to(".loading-pulse", {
      scale: 1.05,
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(".loading-pulse");
    };
  }, [onFinish]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors"
    >
      <div className="relative flex flex-col items-center w-full max-w-md px-4">

        {/* Pulse Ring */}
        <div className="absolute w-[120%] h-[140%]  border-primary/30 dark:border-primary-opposite/30 rounded-full rotate-[-12deg] loading-pulse pointer-events-none" />

        {/* Progress */}
        <div className="w-full flex flex-col gap-4 z-10">
          <div className="flex justify-between font-display text-lg uppercase tracking-widest text-primary dark:text-primary-opposite">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>

          <div
            ref={progressBarRef}
            className="w-full h-6 border-2 border-primary dark:border-primary-opposite rounded-full p-1 overflow-hidden"
          >
            <div
              className="h-full bg-primary dark:bg-primary-opposite rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px)",
                }}
              />
            </div>
          </div>

          <p
            ref={loadingTextRef}
            className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 text-center"
          >
            Preparing...
          </p>
        </div>
      </div>
    </div>
  );
}
