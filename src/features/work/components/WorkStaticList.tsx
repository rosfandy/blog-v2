"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdSmartToy, MdViewInAr, MdStyle, MdArrowOutward, MdMouse, MdCode } from 'react-icons/md';
import { slugify } from "@/utils/slugify";

gsap.registerPlugin(ScrollTrigger);

export type Project = {
    category: string[];
    year: number;
    title: string;
    description: string[];
    techStack: string[];
    thumbnail?: string;
    id: string;
};

const WorkStaticList = ({ projects }: { projects: Project[] }) => {
    const mainRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (mainRef.current && headerRef.current) {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: -30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );

            const projectItems = mainRef.current.querySelectorAll('.project-item');

            projectItems.forEach((item) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "top 50%",
                            toggleActions: "play none none none",
                        }
                    }
                );
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleProjectClick = (projectTitle: string, projectId: string) => {
        router.push(`/work/${slugify(projectTitle)}-${projectId}`);
    };

    return (
        <main ref={mainRef} className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
            <header
                ref={headerRef}
                className="mb-24 text-center md:text-left relative"
                style={{ opacity: 0 }}
            >
                <h1 className="font-display text-[15vw] md:text-[12vw] leading-[0.8] text-primary select-none mix-blend-multiply dark:mix-blend-screen opacity-90">
                    JOURNEY<br />
                    <span className="text-accent ml-0 md:ml-24 block md:inline">WORK</span>
                </h1>
                <div className="absolute top-0 right-10 text-primary hidden md:block animate-bounce" >
                    <MdSmartToy className="text-6xl transform rotate-12" />
                </div>
                <div className="absolute bottom-10 left-10 text-accent hidden md:block animate-pulse">
                    <MdCode className="text-5xl" />
                </div>
            </header>
            <div className="flex flex-col gap-16 md:gap-24">
                {projects.map((project, index) => {
                    const projectUrl = `/work/${slugify(project.title)}-${project.id}`;
                    
                    return (
                        <article
                            key={index}
                            className="project-item group relative border-t border-gray-300 dark:border-gray-700 pt-8 transition-all duration-500 hover:border-primary cursor-pointer"
                            style={{ opacity: 0 }}
                            onClick={() => handleProjectClick(project.title, project.id)}
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-4 font-heading font-bold uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400">
                                <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-1">{project.category[0]}</span>
                                <span className="text-accent">{project.category[1]}</span>
                                <span className="w-8 h-[1px] bg-gray-400"></span>
                                <span>{project.year}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                                <div className="md:col-span-8">
                                    <h2 className="font-display text-4xl text-secondary md:text-6xl lg:text-5xl uppercase text-accent mb-2 leading-[0.9] group-hover:translate-x-2 transition-transform duration-300">
                                        {project.title.split('\n').map((line, i) => (
                                            i === 0 ? (
                                                <span key={i}>{line}</span>
                                            ) : (
                                                <span key={i}><br />{line}</span>
                                            )
                                        ))}
                                    </h2>
                                    <div className="prose dark:prose-invert max-w-none mb-8 text-lg md:text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                                        {project.description.map((para, i) => <p key={i}>{para}</p>)}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            className="inline-flex rounded-full items-center justify-center px-6 py-2 bg-black text-white dark:bg-white dark:text-black font-heading font-bold uppercase tracking-wider hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            Visit
                                            <MdArrowOutward className="text-base ml-1" />
                                        </button>
                                    </div>
                                </div>
                                <div className="md:col-span-4 flex flex-col justify-between">
                                    <img src={project.thumbnail} alt={project.title} className="h-auto md:w-[400px] rounded-xl w-full" />
                                    <div className="mt-6">
                                        <h4 className="font-heading font-bold uppercase text-sm mb-3 text-gray-400">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map(tech => <span key={tech} className="px-2 py-1 border border-gray-300 dark:border-gray-700 text-xs font-mono uppercase rounded text-gray-600 dark:text-gray-400 bg-white dark:bg-[#222]">{tech}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
            <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mt-24 mb-12"></div>
        </main>
    )
}

export default WorkStaticList