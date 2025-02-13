import { generateSlug } from "./slug";

export const getProfileUrl = ({
  id,
  name,
  slug,
}: {
  id: string;
  name: string;
  slug?: string;
}) => {
  // Jeśli mamy slug, użyj go
  if (slug) return `/profile/${slug}`;

  // W przeciwnym razie wygeneruj z nazwy
  const generatedSlug = generateSlug(name);

  // Jeśli nie udało się wygenerować sluga, użyj ID
  return `/profile/${generatedSlug || id}`;
};
