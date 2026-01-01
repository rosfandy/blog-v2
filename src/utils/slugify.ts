/**
 * Slugify helper (URL-safe, static-export-safe)
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[:]/g, "")            // ⬅️ hapus ":" saja
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
