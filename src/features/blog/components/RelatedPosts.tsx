"use client";

import Image from 'next/image';
import { MdArrowForward, MdOpenInNew } from 'react-icons/md';

interface RelatedPostsProps {
  currentBlogId?: string;
}

const RelatedPosts = ({ currentBlogId }: RelatedPostsProps) => {
  return (
    <section className="mb-24">
      <div className="flex items-end justify-between mb-10">
        <h3 className="font-display text-4xl md:text-5xl text-primary dark:text-[#9f9cff] uppercase leading-none">Related<br /><span className="text-secondary">Reads</span></h3>
        <a className="hidden md:flex items-center gap-2 font-mono font-bold uppercase text-sm text-gray-500 hover:text-primary transition-colors" href="#">
          View all articles
          <MdArrowForward className="text-lg" />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a className="group block relative border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors bg-white dark:bg-[#222] shadow-lg hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none" href="#">
          <div className="aspect-[3/2] overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-multiply"></div>
            <Image alt="Related post" fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3Mi2u9MRFhY3az5iwEYslwQHHvCgaq5K5Sq4K8HkMWoBeXF3Ep4CkBBmyChTSFhgqrPlSDq4XzcPzygGz6SUF52z0v-CHpTFUwp5gdygGBRDRSvOUaz1Rc1A4MuSFS3wh8FEX7rvqMKncfdUrHqPwp13XeUjliWQP7d0F1pmv33MhyLxAn5gwotjdmj3-3R2N1GAgBW2XXi_a82a9SaJOTD5njenz_JW7dF_UD30ym45smGPTM2m_0GwTTYu_qSCVuvhI0s5AgSw" />
            <div className="absolute top-4 right-4 z-20 bg-white dark:bg-black p-3 rounded-full translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <MdOpenInNew className="text-primary text-xl block" />
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border border-secondary/20">Case Study</span>
              <span className="text-gray-400 text-xs font-mono uppercase">5 min read</span>
            </div>
            <h4 className="font-display text-3xl uppercase mb-3 group-hover:text-primary transition-colors dark:text-gray-100 leading-none">Optimizing Canvas Performance</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">Deep dive into offscreen canvas and web workers for smoother animations in complex scenes.</p>
          </div>
        </a>
        <a className="group block relative border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors bg-white dark:bg-[#222] shadow-lg hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none" href="#">
          <div className="aspect-[3/2] overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-multiply"></div>
            <Image alt="Related post" fill className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0hEdXjsprrvqv7GQV1bukt2g7e_43M7oJ0uDZlcJwOu5B-CB0dwfpJMOvKySAg2QDOw8C5SZ4wJKmwG7C3bvXb7ykMg5QOxSXkeB7aINaiuUDGV_UfS-yg_fKPgrm64sb8FrvKFP5az0mqEJ7G-gH61Z00iN4YBQ34bbDWt87l2ppLQBEQMBh1zHy_T7APnhfx77Tpf2CteS6ZEihwG32xhvj09Obrz9OQpvS2e_gcFAx85z5VfQaRwYxRFN3Z6rw4k_pxPtXxl8" />
            <div className="absolute top-4 right-4 z-20 bg-white dark:bg-black p-3 rounded-full translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
              <MdOpenInNew className="text-primary text-xl block" />
            </div>
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border border-primary/20">Tutorial</span>
              <span className="text-gray-400 text-xs font-mono uppercase">8 min read</span>
            </div>
            <h4 className="font-display text-3xl uppercase mb-3 group-hover:text-primary transition-colors dark:text-gray-100 leading-none">React Three Fiber Basics</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">Getting started with 3D in React without losing your mind. A beginner's guide to the ecosystem.</p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default RelatedPosts;