import { MetadataRoute } from 'next';
import { getBlogs } from '@/features/blog/server/blog.server';
import { APP_URL } from '@/constant';
import { slugify } from '@/utils/slugify'; // ⬅️ Import slugify yang sama

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_URL || 'https://rosfandy.me';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Blog posts with error handling
  try {
    const blogs = await getBlogs();
    const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${slugify(blog.title)}-${blog.id}`, 
      lastModified: new Date(blog.updated_at || blog.created_at),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}