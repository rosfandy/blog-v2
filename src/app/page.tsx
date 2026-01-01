"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { LuBinary, LuHand, LuLightbulb, LuMousePointer2, LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from "next-themes";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HeroSection = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutContentRef = useRef(null);

  // Refs for icons behind text
  const icon1BackRef = useRef(null);
  const icon2BackRef = useRef(null);
  const icon3BackRef = useRef(null);
  const icon4BackRef = useRef(null);

  // Refs for icons in front of text
  const icon1FrontRef = useRef(null);
  const icon2FrontRef = useRef(null);
  const icon3FrontRef = useRef(null);
  const icon4FrontRef = useRef(null);

  useEffect(() => {
    /* ===============================
       FADE IN CONTAINER
    =============================== */
    if (containerRef.current) {
      gsap.set(containerRef.current, { autoAlpha: 0 });
      gsap.to(containerRef.current, {
        duration: 5,
        autoAlpha: 1,
      });
    }

    /* ===============================
       HERO TEXT SCALE ON SCROLL
    =============================== */
    gsap.to(textRef.current, {
      scale: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    /* ===============================
       ORBIT ICON ANIMATION
    =============================== */
    const orbitDuration = 15;
    const radiusX = 300;
    const radiusY = 110;

    const iconPairs = [
      { back: icon1BackRef, front: icon1FrontRef, startAngle: 0 },
      { back: icon2BackRef, front: icon2FrontRef, startAngle: 90 },
      { back: icon3BackRef, front: icon3FrontRef, startAngle: 180 },
      { back: icon4BackRef, front: icon4FrontRef, startAngle: 270 },
    ];

    iconPairs.forEach(({ back, front, startAngle }) => {
      const startAngleRad = startAngle * (Math.PI / 180);

      gsap.to({}, {
        duration: orbitDuration,
        repeat: -1,
        ease: "none",
        onUpdate: function () {
          const progress = this.progress();
          const angle = startAngleRad + progress * Math.PI * 2;

          const x = Math.cos(angle) * radiusX;
          const y = Math.sin(angle) * radiusY;

          const transitionZone = 30;

          let backOpacity, frontOpacity;

          if (y < -transitionZone) {
            backOpacity = 0.5;
            frontOpacity = 0;
          } else if (y > transitionZone) {
            backOpacity = 0;
            frontOpacity = 1;
          } else {
            const transitionProgress =
              (y + transitionZone) / (transitionZone * 2);
            backOpacity = 0.5 * (1 - transitionProgress);
            frontOpacity = transitionProgress;
          }

          const scale =
            y < 0 ? 0.8 + 0.2 * ((y + radiusY) / radiusY) : 1;

          if (back.current && front.current) {
            gsap.set(back.current, {
              x,
              y,
              rotation: (angle * 180) / Math.PI + 90,
              scale,
              opacity: backOpacity,
              visibility: "visible",
            });

            gsap.set(front.current, {
              x,
              y,
              rotation: (angle * 180) / Math.PI + 90,
              scale,
              opacity: frontOpacity,
              visibility: "visible",
            });
          }
        },
      });
    });

    /* ===============================
       ABOUT PIN + DELAYED SLIDE CONTENT
    =============================== */
    if (aboutRef.current && aboutContentRef.current) {
      // posisi awal content di bawah layar
      gsap.set(aboutContentRef.current, { y: "100%" });

      const aboutTL = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      aboutTL
        // ⏸️ ABOUT tampil full dulu
        .to({}, { duration: 1 })

        // ⬆️ baru content naik
        .fromTo(
          aboutContentRef.current,
          { y: "200%" },
          { y: "0%", ease: "none" }
        );
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const handleRedirect = ()=>{
    localStorage.setItem("splashShown", "false");
    router.push("/blog");
  }

  return (
    <div ref={containerRef} style={{ opacity: 0, visibility: 'hidden' }} className={`transition-colors duration-500`}>
      <div ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center pt-20">
        <div className="relative w-full max-w-7xl mx-auto text-center z-10 px-6">
          <div ref={textRef} className="relative">
            {/* Icons BEHIND text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px] border-2 rounded-[50%] opacity-30 transition-colors duration-500 ${isDark ? 'border-[#a29dff]' : 'border-[#7a76ff]'
                }`} style={{ clipPath: 'inset(0 0 50% 0)' }}></div>

              <div ref={icon1BackRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuMousePointer2 className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>

              <div ref={icon2BackRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuBinary className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>

              <div ref={icon3BackRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuHand className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>

              <div ref={icon4BackRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuLightbulb className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>
            </div>

            <h1 className="font-display text-[15vw] md:text-[11vw] leading-[0.85] tracking-tighter text-transparent select-none relative z-10">
              <div className="relative inline-block">
                <span className={`transition-all duration-500 retro-3d-text`}>
                  HELLO
                </span>
              </div>
              <br />
              <div className="relative inline-block">
                <span className="text-3d-stroke block" data-text="WORLD">
                  WORLD
                </span>
              </div>
            </h1>

            {/* Icons IN FRONT of text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-20">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[220px] border-2 rounded-[50%] opacity-30 transition-colors duration-500 ${isDark ? 'border-[#a29dff]' : 'border-[#7a76ff]'
                }`} style={{ clipPath: 'inset(50% 0 0 0)' }}></div>

              <div ref={icon1FrontRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuMousePointer2 className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>

              <div ref={icon2FrontRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuBinary className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>

              <div ref={icon3FrontRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuHand className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>

              <div ref={icon4FrontRef} className="orbit-icon absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LuLightbulb className={`w-12 h-12 transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'}`} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className={`mt-12 flex items-center justify-center gap-3 font-mono text-sm transition-colors duration-500 ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'
            }`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-60">
              <path d="M20 5 L35 15 L35 25 L20 35 L5 25 L5 15 Z" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="20" cy="20" r="3" fill="currentColor" />
            </svg>
            <span className="tracking-wider">WELCOME, HOME SWEET HOME</span>
          </div>
        </div>
      </div>

      {/* About Section - Pinned */}
      <div id="about-section" ref={aboutRef} className='relative' >
        <section className={`min-h-screen flex items-center justify-center transition-colors duration-500 relative`}>
          <div className="text-center relative z-10">
            <h2 className={`font-display md:text-8xl text-7xl mb-4 transition-colors duration-500 text-3d-stroke`}
              data-text="ABOUT">ABOUT</h2>
            <p className={`font-mono transition-colors duration-500 text-lg ${isDark ? 'text-[#a29dff]' : 'text-[#7a76ff]'
              }`}>WORK & MYSELF</p>
          </div>
        </section>

        {/* Content Section - Slides Up */}
        <section ref={aboutContentRef}
          className="fixed! items-center inset-0 min-h-full bg-background z-50 overflow-y-auto hide-scrollbar border-t border-primary">
          <div className="min-h-screen flex items-center md:py-20">
            <div className="max-w-7xl mx-auto px-6 flex justify-center items-center h-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 flex flex-col justify-between">
                  <div className="mt-8">
                    <h3 className="font-display text-4xl mb-2 text-primary">I&apos;M ROSFANDY</h3>
                    <p className="text-sm font-bold uppercase tracking-widest border-t-2 border-primary pt-2 dark:border-white">Based in Indonesia</p>
                  </div>
                </div>
                <div className="md:col-span-8 space-y-8">
                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    I build interactive digital experiences that are{" "}
                    <span className="text-primary">playfull</span>,{" "}
                    <span className="bg-primary text-white px-2 italic transform -skew-x-6 inline-block">
                      accessible.
                    </span>
                  </h2>
                  <div className="space-y-4 text-lg">
                    <p>
                       This is my personal space where I document my journey through code—sharing projects I&apos;ve built, lessons I&apos;ve learned, and technical insights along the way.
                     </p>
                     <p>
                       Browse my projects, read my documentation, or learn more about my background. And if you&apos;d like to connect, feel free to reach out or check out my resume.
                      </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href='http://tiny.cc/rosfandyCV' className="inline-flex items-center px-6 py-3 bg-text-light text-background-light dark:bg-white dark:text-black font-bold uppercase tracking-wider rounded-full hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer">
                      Download CV
                    </Link>
                    <div onClick={handleRedirect} className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-bold uppercase tracking-wider rounded-full hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer">
                      Visit Blog
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .retro-3d-text {
          text-shadow:
            1px 1px 0px #b8b6ff,
            2px 2px 0px #b8b6ff,
            3px 3px 0px #b8b6ff,
            4px 4px 0px #b8b6ff,
            5px 5px 0px #b8b6ff,
            6px 6px 0px rgba(0, 0, 0, 0.1);
        }
        
        .retro-3d-text-dark {
          text-shadow:
            1px 1px 0px #6360cc,
            2px 2px 0px #6360cc,
            3px 3px 0px #6360cc,
            4px 4px 0px #6360cc,
            5px 5px 0px #6360cc,
            6px 6px 0px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default HeroSection;