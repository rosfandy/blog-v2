import WorkStaticList, { Project } from '@/features/work/components/WorkStaticList';
import { getProjects } from '@/features/work/server/work.server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Work - Portfolio',
    description: 'Explore my creative projects, case studies, and work journey in web development and design.',
};

export default async function WorkPage() {
    const blogs = await getProjects();

    const projects: Project[] = blogs.map(blog => ({
        id: blog.id.toString(),
        category: [blog.category, 'Project'],
        year: new Date(blog.date || blog.created_at).getFullYear(),
        title: blog.title,
        description: [blog.description],
        techStack: blog.tags || [],
        thumbnail: blog.thumbnail
    }));

    return <WorkStaticList projects={projects} />;
}