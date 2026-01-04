import { supabase } from "@/config/supabase";
import { Blog } from "../types/blog.type";

export async function getBlogs(): Promise<Blog[]> {
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
    .eq("type", "blog")
    .order("created_at", { ascending: false });

  if (error || !data) throw error || new Error("Failed to fetch blogs");

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

export async function getBlog(id: string): Promise<Blog | null> {
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

  if (error) return null;
  if (!data) return null;

  return {
    ...data,
    tags: data.tags
      ? typeof data.tags === "string"
        ? JSON.parse(data.tags)
        : data.tags
      : [],
  };
}
