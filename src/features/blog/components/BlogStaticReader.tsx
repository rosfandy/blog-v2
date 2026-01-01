"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Link from 'next/link';
import Image from 'next/image';
import { MdArrowBack, MdCalendarToday, MdTimer, MdSchool, MdPlayCircle, MdShare, MdLink, MdFavorite, MdArrowForward, MdOpenInNew, MdArticle } from 'react-icons/md';
import './blogreader.css';
import CommentStaticReader from "@/features/comments/components/reader/CommentStaticReader";
import { Blog } from "../types/blog.type";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

interface BlogStaticReaderProps {
    blog: Blog
}

type TocItem = {
    id: string
    title: string
    level: number
}

const BlogStaticReader = ({ blog }: BlogStaticReaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const articleRef = useRef<HTMLDivElement>(null);
    const [processedContent, setProcessedContent] = useState<string>('');

    const [tocItems, setTocItems] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string | null>(null)


    useEffect(() => {
        if (!blog.content) return

        const parser = new DOMParser()
        const doc = parser.parseFromString(blog.content, 'text/html')

        const headings = doc.querySelectorAll('h1, h2, h3')
        const items: TocItem[] = []

        headings.forEach((el, index) => {
            const level = Number(el.tagName.replace('H', ''))
            const title = el.textContent?.trim() || ''

            if (!title) return

            let id = el.id
            if (!id) {
                id = title
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '')

                if (!id) id = `section-${index}`
                el.id = id
            }

            items.push({ id, title, level })
        })

        const serializer = new XMLSerializer()
        const processedHtml = serializer
            .serializeToString(doc.body)
            .replace('<body>', '')
            .replace('</body>', '')

        setTocItems(items)
        setProcessedContent(processedHtml)
    }, [blog.content])

    useEffect(() => {
        if (!tocItems.length) return

        const triggers: ScrollTrigger[] = []

        tocItems.forEach((item) => {
            const el = document.getElementById(item.id)
            if (!el) return

            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveId(item.id),
                onEnterBack: () => setActiveId(item.id),
            })

            triggers.push(trigger)
        })

        return () => {
            triggers.forEach((t) => t.kill())
        }
    }, [tocItems])

    useEffect(() => {
        if (!containerRef.current || !pinRef.current) return;

        const GAP = 28;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: () =>
                    `top+=${pinRef.current!.offsetTop - GAP} top+=${GAP}`,

                end: () =>
                    `+=${articleRef.current!.offsetHeight - pinRef.current!.offsetHeight}`,

                pin: pinRef.current,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            });

            ScrollTrigger.refresh();
        });


        return () => ctx.revert();
    }, []);

    const handleTocClick = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()

        const target = document.getElementById(id)
        if (!target) return

        gsap.to(window, {
            duration: 0.1,
            ease: 'power2.out',
            scrollTo: {
                y: target,
                offsetY: 96, 
            },
        })
    }

    return (
        <main className="flex-grow pt-12 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
            <div className="mb-8 md:mb-12">
                <Link className="inline-flex items-center gap-2 text-primary dark:text-[#9f9cff] font-mono uppercase font-bold text-sm hover:-translate-x-1 transition-transform group" href="/blog">
                    <MdArrowBack className="group-hover:text-secondary transition-colors" />
                    <span className="group-hover:text-secondary transition-colors">Back to Articles</span>
                </Link>
            </div>
            <header className="mb-12 md:mb-16 relative">
                <div className="absolute -top-10 -right-10 text-secondary dark:text-secondary opacity-20 rotate-12 pointer-events-none">
                    <MdArticle className="text-[120px]" />
                </div>
                <div className="flex flex-wrap gap-4 items-center mb-6 font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#9f9cff] px-3 py-1 rounded-full border border-primary/20 dark:border-primary/30">{blog.category || 'General'}</span>
                    <span className="flex items-center gap-1">
                        <MdCalendarToday className="text-base" />
                        {new Date(blog.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    <span className="flex items-center gap-1">
                        <MdTimer className="text-base" />
                        5 min read
                    </span>
                </div>
                <h1 className="font-display text-6xl md:text-7xl lg:text-9xl leading-[0.85] text-primary dark:text-[#9f9cff] uppercase mb-8 max-w-5xl tracking-tight">
                    {blog.title}
                </h1>
                <div className="flex items-center gap-4 pt-6 border-t border-primary/10 dark:border-white/10 max-w-md">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent-pink p-[2px]">
                        <Image
                            alt="Author"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover rounded-full border-2 border-background-light dark:border-background-dark"
                            src={blog.profiles?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDMMQ8lFUrh73irfx3gVFSdxSK7s5pEx2JVmlH-EvNWn56aT8HU99fZQPHDFu0XRY7X7amplY1xzrPIov81WbbeumaefRs2ihDqgmNAX_KoLUOsrx48saQANAGMV0a_B0ay6gQkmcZH5e1ugxlAgVQUcLmebomxSL0entLQDRMORtRLblHacS3f9P0YqQ-HGU-I0haBi-tEj9bc8eDltyuzrg9VjWXYBu2ppkOA6Ds5iA3nVj09bY5vbtacvQYJzJ5WOTvHtvnrR_w"}
                        />
                    </div>
                    <div>
                        <p className="font-mono font-bold text-base uppercase text-gray-900 dark:text-gray-100">
                            Written by {blog.profiles?.full_name || blog.profiles?.username || 'Anonymous'}
                        </p>
                        <p className="font-sans text-xs text-primary dark:text-[#9f9cff] font-medium tracking-wide">
                            {blog.profiles?.full_name ? 'Author' : 'Creative Developer & Designer'}
                        </p>
                    </div>
                </div>
            </header>
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-16 rounded-[2rem] overflow-hidden group shadow-xl shadow-primary/5 dark:shadow-none ring-1 ring-black/5 dark:ring-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <Image alt="Abstract digital art representing web development" fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1jaA0lzZke-EWvySPpvBQNKpI8FUsL_D2dOYvIJu_8aXe6PUNbBVKdC-VrIaCqwJkl-tuE6BuPzK_3WXNfU5fhhm_JaWpCyr0cKkP2nAepn4m0_9wv_3RESVPLjWcTxb8gr8Q0y82p7VztSEaAcmg7fySyB-oL4woCoyWKQbZLTWGlmtIywTpq7acuUdAU1-MfpgzWfuDZ3Xzg_YC1Yk_xEl6nilm3uYCUFsbSQUGWhLGilUjwj8moDvNhTFCR69O8i3DuwVraaw" />
                {/* <div className="absolute bottom-6 left-6 z-20">
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-mono font-bold uppercase hover:bg-white/20 transition-colors flex items-center gap-2">
                        <MdPlayCircle className="text-base" />
                        View Live Demo
                    </button>
                </div>
                <div className="absolute bottom-6 right-6 z-20 bg-background-dark/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-gray-300">
                    Image: Unsplash
                </div> */}
            </div>
            <div
                ref={containerRef}
                className="relative max-w-7xl mx-auto"
            >
                <div
                    ref={pinRef}
                    className="absolute w-1/5"
                >
                    <aside className="hidden lg:block self-start max-w-[200px]">
                        <div
                            className="space-y-8">
                            <div>
                                <h4 className="font-display text-2xl uppercase text-secondary mb-6">Contents</h4>
                                <nav className="flex flex-col gap-3 font-mono text-sm font-bold uppercase text-gray-500 dark:text-gray-400">
                                    {tocItems.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            onClick={handleTocClick(item.id)}
                                            className={`
        flex items-center gap-2 transition-colors group
        ${item.level === 2 ? 'ml-4 text-xs' : ''}
        ${item.level === 3 ? 'ml-8 text-[10px]' : ''}
        ${activeId === item.id
                                                    ? 'text-primary dark:text-[#9f9cff]'
                                                    : 'hover:text-primary dark:hover:text-[#9f9cff]'
                                                }
      `}
                                        >
                                            <span
                                                className={`
          w-1.5 h-1.5 rounded-full transition-colors
          ${activeId === item.id
                                                        ? 'bg-primary'
                                                        : 'bg-gray-300 group-hover:bg-primary'
                                                    }
        `}
                                            />
                                            {item.title}
                                        </a>
                                    ))}
                                </nav>

                            </div>
                        </div>
                    </aside>
                </div>


                <div className="lg:ml-[20%] ml-0 lg:w-4/5 w-full  mt-16 lg:mt-24 relative z-10">
                    <article ref={articleRef} id="article" className="min-h-[50vh] lg:col-span-8 prose dark:prose-invert prose-lg md:prose-xl max-w-none font-sans leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: processedContent || blog.content || '' }} />
                    </article>
                    <div className="border-t border-b border-primary/10 dark:border-white/10 py-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="font-mono text-sm font-bold uppercase mr-2 text-gray-400">Tags:</span>
                            {blog?.tags && blog.tags.length > 0 ? blog.tags.map((tag: string, index: number) => (
                                <span key={index} className="px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-mono font-bold hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                    {tag}
                                </span>
                            )) : (
                                <>
                                    <span className="px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-mono font-bold hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">Web Development</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-sm font-bold uppercase text-gray-400">Share:</span>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 hover:text-primary hover:border-primary hover:-translate-y-1 transition-all">
                                <MdShare className="text-lg" />
                            </button>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 hover:text-primary hover:border-primary hover:-translate-y-1 transition-all">
                                <MdLink className="text-lg" />
                            </button>
                            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-400 hover:text-primary hover:border-primary hover:-translate-y-1 transition-all">
                                <MdFavorite className="text-lg" />
                            </button>
                        </div>
                    </div>

                </div>
                {/* <RelatedPosts currentBlogId={blog.id.toString()} /> */}
                <CommentStaticReader blogId={blog.id.toString()} />
            </div>

        </main>
    );
};

export default BlogStaticReader;