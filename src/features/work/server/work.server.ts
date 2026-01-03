import { supabase } from "@/config/supabase";
import { Blog } from "@/features/blog/types/blog.type";


export async function getProjects(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
     *,
      profiles (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq("type", "project")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((blog) => ({
    ...blog,
    tags: blog.tags
      ? typeof blog.tags === "string"
        ? JSON.parse(blog.tags)
        : blog.tags
      : [],
    profiles: blog.profiles?.[0],
  }));
}

export async function getProjectById(id: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select(`
      *,
      profiles (
        id,
        username,
        full_name,
        avatar_url,
        bio
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    tags: data.tags
      ? typeof data.tags === "string"
        ? JSON.parse(data.tags)
        : data.tags
      : [],
  };
}
