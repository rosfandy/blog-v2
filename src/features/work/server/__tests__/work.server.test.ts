import { getProjectById, getProjects } from "@/features/work/server/work.server";

describe("work.server.ts", () => {
  describe("getProjects", () => {
    it("returns project notes from markdown files", async () => {
      const projects = await getProjects();

      expect(projects.length).toBeGreaterThan(0);
      expect(projects[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          content: expect.any(String),
          tags: expect.any(Array),
          category: "project",
        })
      );
    });
  });

  describe("getProjectById", () => {
    it("returns one project by id", async () => {
      const projects = await getProjects();
      const firstProjectId = projects[0]?.id;

      expect(firstProjectId).toBeDefined();

      const project = await getProjectById(String(firstProjectId));

      expect(project).not.toBeNull();
      expect(project?.id).toBe(firstProjectId);
    });

    it("returns null for unknown id", async () => {
      const project = await getProjectById("999999");
      expect(project).toBeNull();
    });
  });
});
