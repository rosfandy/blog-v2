"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";

export const Navbar = () => {
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        if (navRef.current && !isAnimated) {
            const tl = gsap.timeline({
                onComplete: () => setIsAnimated(true)
            });

            tl.fromTo(navRef.current,
                {
                    y: -100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );

            const navItems = navRef.current.querySelectorAll('.nav-item');
            if (navItems.length > 0) {
                tl.fromTo(navItems,
                    {
                        y: -20,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out"
                    },
                    "-=0.4"
                );
            }
        }
    }, [isAnimated]);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blogs" },
        { href: "/work", label: "Works" },
    ];

    return (
        <nav 
            ref={navRef} 
            className="fixed top-0 w-full z-50 px-4 py-4 md:px-8 md:py-6 flex justify-center items-start bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm"
            style={{ opacity: 0, transform: 'translateY(-100px)' }}
        >
            <div className="flex gap-4 md:gap-6 text-xl font-display text-primary dark:text-[#9f9cff] uppercase">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item hover:text-secondary dark:hover:text-secondary transition-colors ${
                            isActive(item.href)
                                ? "text-secondary dark:text-secondary underline underline-offset-4 decoration-2"
                                : ""
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}      