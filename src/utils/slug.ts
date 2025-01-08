export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Usuń znaki specjalne
    .replace(/\s+/g, "-") // Zamień spacje na myślniki
    .replace(/-+/g, "-") // Usuń wielokrotne myślniki
    .trim();
}
