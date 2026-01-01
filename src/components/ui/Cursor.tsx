"use client";

import { useEffect, useRef } from "react";
import { LuMousePointer2 } from "react-icons/lu";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { FaRegDotCircle } from "react-icons/fa";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const mounted = resolvedTheme !== undefined;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.set(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const isDark = resolvedTheme === "dark";

  return mounted ? (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 z-[999999] pointer-events-none"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <FaRegDotCircle
        className={`w-4 h-4 transition-colors duration-300 ${
          isDark ? "text-[#a29dff]" : "text-[#7a76ff]"
        }`}
      />
    </div>
  ) : null;
}
