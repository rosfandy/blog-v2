import BlogStaticReader from "@/features/blog/components/BlogStaticReader";
import { getProjectById, getProjects } from "@/features/work/server/work.server";
import { slugify } from "@/utils/slugify";
import type { Metadata } from "next";
import { APP_URL } from "@/constant";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const decodedId = decodeURIComponent(id);
  const projectId = decodedId.split("-").pop() || "";
  const project = await getProjectById(projectId);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const tags = project.tags
    ? typeof project.tags === 'string'
      ? JSON.parse(project.tags)
      : project.tags
    : [];

  const ogImage = `${APP_URL}/og-default.jpg`;
  const canonicalUrl = `${APP_URL}/work/${id}`;

  return {
    title: project.title,
    description: project.description,
    keywords: tags.join(', '),
    authors: [{ name: project.profiles?.full_name || 'Bagus Rosfandy' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: project.created_at,
      modifiedTime: project.updated_at || project.created_at,
      authors: [project.profiles?.full_name || 'Bagus Rosfandy'],
      tags: tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImage]
    }
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    id: `${slugify(project.title)}-${project.id}`,
  }));
}

const WorkPostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const decodedId = decodeURIComponent(id);
  const projectId = decodedId.split("-").pop();
  const project = await getProjectById(projectId || "");

  if (!project) {
    return (
      <section className="mb-24 py-12 md:px-48 px-8">
        <div className="text-center py-16">
          <p className="text-red-500">Project not found</p>
        </div>
      </section>
    );
  }

  return <BlogStaticReader blog={project} />;
};

export default WorkPostPage;