import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { SiLinkedin, SiGithub, SiX } from 'react-icons/si';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-4 md:px-8 pb-12 pt-24 mt-auto bg-background-light dark:bg-background-dark relative border-t border-gray-200 dark:border-gray-800" id="contact">
            <div className="">
                <div className="md:col-span-5 flex flex-col justify-between items-end text-right h-full">
                    <div className="flex flex-col items-end">
                        <h3 className="font-mono font-bold uppercase text-xl md:text-2xl mb-2 text-gray-800 dark:text-gray-200">Have a project in mind?</h3>
                        <a className="font-mono font-bold uppercase text-xl md:text-2xl hover:underline decoration-2 underline-offset-4 flex items-center gap-2 text-primary dark:text-[#9f9cff]" href="mailto:bagusrosfandy@gmail.com">
                           <BsArrowRight />
                            bagusrosfandy@gmail.com
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-300 dark:border-gray-800">
                <div className="flex flex-wrap gap-4 md:gap-6 font-mono font-bold uppercase text-sm md:text-base text-gray-600 dark:text-gray-400">
                    <span className="mr-2">Socials</span>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">Github</a>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">Codepen</a>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">Bluesky</a>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">Mastodon</a>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">Instagram</a>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">LinkedIn</a>
                    <a className="underline decoration-1 underline-offset-2 hover:text-primary dark:hover:text-[#9f9cff]" href="#">RSS</a>
                </div>
                <div className="mt-8 md:mt-0 font-mono font-bold uppercase text-sm text-gray-500 dark:text-gray-500">
                    © {currentYear} Rosfandy
                </div>
            </div>
        </footer>

    )
}