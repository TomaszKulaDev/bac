export const isInstagramUrl = (url: string): boolean => {
  return (
    url.includes("instagram.com/p/") ||
    url.includes("instagram.com/reel/") ||
    url.includes("instagram.com/tv/")
  );
};

export const getInstagramPostId = (url: string): string | null => {
  const regex = /(?:instagram.com\/(?:p|reel|tv)\/)([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
