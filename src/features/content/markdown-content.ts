import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import MarkdownIt from "markdown-it";

type Frontmatter = {
  tags?: string[];
  date?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
};

type ParsedMarkdown = {
  title: string;
  frontmatter: Frontmatter;
  body: string;
  category: string;
};

function stripMarkdownExtension(fileName: string): string {
  return fileName.replace(/\.md$/i, "");
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

const defaultNormalizeLink = md.normalizeLink.bind(md);

md.normalizeLink = (url: string) => {
  const trimmed = url.trim();

  if (/^www\./i.test(trimmed)) {
    return defaultNormalizeLink(`https://${trimmed}`);
  }

  if (/^https?:\/(?!\/)/i.test(trimmed)) {
    return defaultNormalizeLink(trimmed.replace(/^https?:\//i, (m) => `${m}/`));
  }

  return defaultNormalizeLink(trimmed);
};

function parseFrontmatter(content: string): { frontmatter: Frontmatter; body: string } {
  if (!content.startsWith("---\n")) {
    return { frontmatter: {}, body: content };
  }

  const endFrontmatterIndex = content.indexOf("\n---", 4);
  if (endFrontmatterIndex === -1) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterRaw = content.slice(4, endFrontmatterIndex).trim();
  const body = content.slice(endFrontmatterIndex + 4).trim();

  const frontmatter: Frontmatter = {};
  const lines = frontmatterRaw.split("\n");
  let currentArrayKey: keyof Frontmatter | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("- ") && currentArrayKey) {
      const item = trimmed.slice(2).trim();
      const value = item.replace(/^['\"]|['\"]$/g, "");
      if (!Array.isArray(frontmatter[currentArrayKey])) {
        frontmatter[currentArrayKey] = [];
      }
      (frontmatter[currentArrayKey] as string[]).push(value);
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();

    currentArrayKey = null;

    if (key === "tags") {
      if (!rawValue) {
        frontmatter.tags = [];
        currentArrayKey = "tags";
      }
      continue;
    }

    const value = rawValue.replace(/^['\"]|['\"]$/g, "");
    if (key === "date") frontmatter.date = value;
    if (key === "description") frontmatter.description = value;
    if (key === "thumbnail") frontmatter.thumbnail = value;
    if (key === "category") frontmatter.category = value;
  }

  return { frontmatter, body };
}

function markdownToHtml(markdownSource: string): string {
  return md.render(markdownSource);
}

export async function readMarkdownDirectory(directoryPath: string): Promise<ParsedMarkdown[]> {
  const files = await readdir(directoryPath, { withFileTypes: true });
  const markdownFiles = files
    .filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".md"))
    .map((file) => file.name)
    .sort((a, b) => a.localeCompare(b));

  const parsed = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(directoryPath, fileName);
      const raw = await readFile(fullPath, "utf8");
      const { frontmatter, body } = parseFrontmatter(raw);

      return {
        title: stripMarkdownExtension(fileName),
        frontmatter,
        category: frontmatter.category || "blog",
        body: markdownToHtml(body),
      };
    })
  );

  return parsed;
}
