import BlogStaticReader from "@/features/blog/components/BlogStaticReader";
import { getBlog, getBlogs } from "@/features/blog/server/blog.server";
import { slugify } from "@/utils/slugify";
import type { Metadata } from "next";
import { APP_URL } from "@/constant";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // Decode URL-encoded characters before processing
  const decodedId = decodeURIComponent(id);
  const blogId = decodedId.split("-").pop() || "";
  const blog = await getBlog(blogId);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  // Ensure tags is always an array
  const tags = blog.tags
    ? typeof blog.tags === 'string'
      ? JSON.parse(blog.tags)
      : blog.tags
    : [];

  const ogImage = `${APP_URL}/og-default.jpg`;
  const canonicalUrl = `${APP_URL}/blog/${id}`;

  return {
    title: blog.title,
    description: blog.description,
    keywords: tags.join(', '),
    authors: [{ name: blog.profiles?.full_name || 'Bagus Rosfandy' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at || blog.created_at,
      authors: [blog.profiles?.full_name || 'Bagus Rosfandy'],
      tags: tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [ogImage]
    }
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    id: `${slugify(blog.title)}-${blog.id}`,
  }));
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  
  // Decode URL-encoded characters before processing
  const decodedId = decodeURIComponent(id);
  const blogId = decodedId.split("-").pop();
  const blog = await getBlog(blogId || "");

  if (!blog) {
    return (
      <section className="mb-24 py-12 md:px-48 px-8">
        <div className="text-center py-16">
          <p className="text-red-500">Blog post not found</p>
        </div>
      </section>
    );
  }

  return <BlogStaticReader blog={blog} />;
};

export default BlogPostPage;