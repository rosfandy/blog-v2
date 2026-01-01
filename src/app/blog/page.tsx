import BlogStaticList from "@/features/blog/components/BlogStaticList";
import { getBlogs } from "@/features/blog/server/blog.server";

const BlogPage = async () => {
    const blogs = await getBlogs();

    return <BlogStaticList blogs={blogs} />;
};

export default BlogPage;