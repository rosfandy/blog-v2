import { Blog } from "../types/blog.type";
import path from "node:path";
import { readMarkdownDirectory } from "@/features/content/markdown-content";

export async function getBlogs(): Promise<Blog[]> {
  const blogDir = path.join(process.cwd(), "src", "notes", "app", "blog");
  const markdownBlogs = await readMarkdownDirectory(blogDir);

  return markdownBlogs.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.frontmatter.description || "No description available.",
    content: item.body,
    status: "published",
    category: item.frontmatter.category || "blog",
    created_at: item.frontmatter.date || new Date().toISOString(),
    updated_at: item.frontmatter.date || new Date().toISOString(),
    tags: item.frontmatter.tags || [],
    date: item.frontmatter.date,
    thumbnail: item.frontmatter.thumbnail,
    profiles: {
      id: "local-author",
      username: "bagusrosfandy",
      full_name: "Bagus Rosfandy",
    },
  }));
}

export async function getBlog(id: string): Promise<Blog | null> {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.id.toString() === id) || null;
}
