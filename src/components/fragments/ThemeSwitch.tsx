"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { gsap } from 'gsap';

export const ThemeSwitch = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    // Initial animation on mount
    useEffect(() => {
        if (buttonRef.current) {
            gsap.fromTo(buttonRef.current,
                {
                    scale: 0,
                    rotate: -180,
                    opacity: 0
                },
                {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    delay: 0.5
                }
            );
        }
    }, []);

    const toggleTheme = () => {
        // Animate icon rotation on theme change
        if (iconRef.current) {
            gsap.to(iconRef.current, {
                rotate: 360,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(iconRef.current, { rotate: 0 });
                }
            });
        }

        // Animate button pulse
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1.2,
                duration: 0.15,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        }

        setTheme(isDark ? "light" : "dark");
    };

    const handleMouseEnter = () => {
        gsap.to(".custom-cursor", { scale: 1.5 });
        
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1.15,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = () => {
        gsap.to(".custom-cursor", { scale: 1 });
        
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };
    
    return (
        <button
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={toggleTheme}
            className={`fixed bottom-5 right-5 z-[100] p-3 rounded-full transition-colors duration-300 ${
                isDark
                    ? 'bg-[#7a76ff] text-white shadow-lg shadow-[#7a76ff]/30'
                    : 'bg-[#7a76ff] text-white shadow-lg'
            }`}
            style={{ opacity: 0 }}
            aria-label="Toggle dark mode"
        >
            <div ref={iconRef}>
                {isDark ? (
                    <LuSun className="w-6 h-6" />
                ) : (
                    <LuMoon className="w-6 h-6" />
                )}
            </div>
        </button>
    )
}