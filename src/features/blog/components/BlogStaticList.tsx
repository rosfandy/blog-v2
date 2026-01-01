"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { MdCampaign } from "react-icons/md";
import { Blog } from "../types/blog.type";
import { slugify } from "@/utils/slugify";

const BlogStaticList = ({ blogs }: { blogs: Blog[] }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (blogs && sectionRef.current) {
            const tl = gsap.timeline();

            // Animate header
            if (headerRef.current) {
                tl.fromTo(headerRef.current,
                    { opacity: 0, y: -30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                );
            }

            // Animate blog items
            const blogItems = sectionRef.current.querySelectorAll('.blog-item');
            if (blogItems.length > 0) {
                tl.fromTo(blogItems,
                    {
                        opacity: 0,
                        y: 40,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.2,
                        ease: "power2.out"
                    },
                    "-=0.4"
                );
            }
        }
    }, [blogs]);

    return (
        <section ref={sectionRef} className="mb-24 py-12 md:px-48 px-8">
            <div 
                ref={headerRef} 
                className="flex flex-col md:flex-row items-baseline gap-4 mb-8 border-b-2 border-secondary dark:border-red-400 pb-4"
                style={{ opacity: 0 }}
            >
                <MdCampaign size={42} />
                <h2 className="font-display text-5xl uppercase text-secondary dark:text-red-400">Blog</h2>
                <div className="flex-grow hidden md:block border-t border-secondary dark:border-red-400 h-px self-center ml-4"></div>
            </div>
            <div className="space-y-16">
                {blogs?.map((blog, index) => (
                    <div 
                        key={blog.id} 
                        className="blog-item group"
                        style={{ opacity: 0 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between text-secondary dark:text-red-400 text-sm font-bold uppercase mb-2">
                            <span className={`bg-secondary text-white dark:bg-red-400 dark:text-black px-2 py-0.5 transform ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'} inline-block`}>
                                {blog.category || 'General'}
                            </span>
                            <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <h3 className="font-display text-3xl md:text-4xl text-secondary dark:text-red-400 mb-4 group-hover:underline decoration-4 underline-offset-4 decoration-secondary">
                            {blog.title}
                        </h3>
                        <p className="text-lg leading-relaxed mb-6">
                            {blog.description || 'No description available.'}
                        </p>
                        <Link
                            href={`/blog/${slugify(blog.title)}-${blog.id}`}
                            className="inline-block bg-black text-white px-6 py-2 rounded-full font-bold text-sm uppercase hover:bg-secondary transition-colors"
                        >
                            Read more
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogStaticList;