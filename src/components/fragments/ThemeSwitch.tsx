import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { gsap } from 'gsap';

export const ThemeSwitch = () => {
    const { theme, setTheme, systemTheme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    };
    
    return (
            <button
                onMouseEnter={() =>
                    gsap.to(".custom-cursor", { scale: 1.5 })
                }
                onMouseLeave={() =>
                    gsap.to(".custom-cursor", { scale: 1 })
                }
                onClick={toggleTheme}
                className={`fixed bottom-5 right-5 z-100 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    isDark
                        ? 'bg-[#7a76ff] text-white shadow-lg shadow-[#7a76ff]/30'
                        : 'bg-[#7a76ff] text-white shadow-lg'
                }`}
                aria-label="Toggle dark mode"
            >
                {isDark ? (
                    <LuSun className="w-6 h-6" />
                ) : (
                    <LuMoon className="w-6 h-6" />
                )}
            </button>
    )
}