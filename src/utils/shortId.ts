export function shortenId(fullId: string): string {
  return fullId.substring(0, 5);
}

export function expandId(shortId: string): string {
  if (shortId.length === 24) return shortId;
  // Szukamy pełnego ID zaczynającego się od shortId
  return shortId;
}
