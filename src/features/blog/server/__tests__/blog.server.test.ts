import { getBlog, getBlogs } from "@/features/blog/server/blog.server";

describe("blog.server.ts", () => {
  describe("getBlogs", () => {
    it("returns blog notes from markdown files", async () => {
      const blogs = await getBlogs();

      expect(blogs.length).toBeGreaterThan(0);
      expect(blogs[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          content: expect.any(String),
          tags: expect.any(Array),
          category: "blog",
        })
      );
    });
  });

  describe("getBlog", () => {
    it("returns one blog by id", async () => {
      const blogs = await getBlogs();
      const firstBlogId = blogs[0]?.id;

      expect(firstBlogId).toBeDefined();

      const blog = await getBlog(String(firstBlogId));

      expect(blog).not.toBeNull();
      expect(blog?.id).toBe(firstBlogId);
    });

    it("returns null for unknown id", async () => {
      const blog = await getBlog("999999");
      expect(blog).toBeNull();
    });
  });
});
