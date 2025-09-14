export default function slugify(input: string, existing: string[] = []): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  let slug = base || "boat";
  let i = 1;
  while (existing.includes(slug)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}
