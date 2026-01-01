import { MetadataRoute } from 'next';
import { getBlogs } from '@/features/blog/server/blog.server';
import { APP_URL } from '@/constant';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_URL;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Blog posts
  const blogs = await getBlogs();
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${encodeURIComponent(blog.title.replace(/\s+/g, '-').toLowerCase())}-${blog.id}`,
    lastModified: new Date(blog.updated_at || blog.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}