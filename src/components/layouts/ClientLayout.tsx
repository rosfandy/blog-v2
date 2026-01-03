"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "../fragments/SplashScreen";
import Cursor from "../ui/Cursor";
import { gsap } from 'gsap';
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeSwitch } from "../fragments/ThemeSwitch";
import QueryProvider from "../provider/QueryProvider";
import { Footer } from "../fragments/Footer";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const hasShownSplash = localStorage.getItem("splashShown");
    if (hasShownSplash) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted || loading) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    ScrollTrigger.refresh();

    return () => {
      smoother.kill();
    };
  }, [mounted, loading]);

  const handleFinish = () => {
    localStorage.setItem("splashShown", "true");
    setLoading(false);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  if (!mounted) return null;

  return (
    <>
      {/* 🔑 Cursor tetap render di luar kondisi */}
      <Cursor />

      {loading ? (
        <SplashScreen onFinish={handleFinish} />
      ) : (
          <div id="smooth-wrapper">
            <ThemeSwitch />
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[50] h-screen">
              <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl animate-float"></div>
              <div
                className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '2s' }}
              />
            </div>
            <QueryProvider>
              <div id="smooth-content" >
                {children}
              </div>
            </QueryProvider>
          </div>
      )}
    </>
  );
}