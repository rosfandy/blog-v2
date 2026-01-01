import BlogStaticReader from "@/features/blog/components/BlogStaticReader";
import { getBlog, getBlogs } from "@/features/blog/server/blog.server";

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; 
  const blog = await getBlog(id);

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
