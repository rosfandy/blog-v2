import BlogStaticList from "@/features/blog/components/BlogStaticList";
import { getBlogs } from "@/features/blog/server/blog.server";
import { Metadata } from "next";
import { APP_URL, SITE_NAME } from "@/constant";

export const metadata: Metadata = {
  title: "Blog - Articles & Insights",
  description: "Explore my latest blog posts covering web development, design trends, and technology insights.",
  alternates: {
    canonical: `${APP_URL}/blog`,
  },
  openGraph: {
    title: `Blog - ${SITE_NAME}`,
    description: "Explore my latest blog posts covering web development, design trends, and technology insights.",
    url: `${APP_URL}/blog`,
    type: "website"
  }
};

const BlogPage = async () => {
    const blogs = await getBlogs();

    return <BlogStaticList blogs={blogs} />;
};

export default BlogPage;