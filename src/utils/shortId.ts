export function shortenId(longId: string): string {
  // Bierzemy pierwsze 4 znaki z ID
  return longId.slice(0, 5);
}

export function getFullId(shortId: string, allIds: string[]): string | null {
  // Znajdujemy pełne ID, które zaczyna się od skróconego ID
  return allIds.find((id) => id.startsWith(shortId)) || null;
}
