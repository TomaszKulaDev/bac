export function generateSlug(title: string): string {
  if (!title) return "";

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // usuń znaki specjalne
    .replace(/\s+/g, "-") // zamień spacje na myślniki
    .replace(/-+/g, "-") // usuń wielokrotne myślniki
    .trim()
    .replace(/^-+|-+$/g, ""); // usuń myślniki z początku i końca

  console.log("Generowanie sluga:", {
    input: title,
    output: slug,
  });

  return slug;
}
