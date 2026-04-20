import { Blog } from "@/features/blog/types/blog.type";
import path from "node:path";
import { readMarkdownDirectory } from "@/features/content/markdown-content";


export async function getProjects(): Promise<Blog[]> {
  const projectDir = path.join(process.cwd(), "src", "notes", "app", "project");
  const markdownProjects = await readMarkdownDirectory(projectDir);

  return markdownProjects.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.frontmatter.description || "No description available.",
    content: item.body,
    status: "published",
    category: item.category,
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

export async function getProjectById(id: string): Promise<Blog | null> {
  const projects = await getProjects();
  return projects.find((project) => project.id.toString() === id) || null;
}
