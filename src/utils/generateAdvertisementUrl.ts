import { generateSlug } from "./slug";

export function generateAdvertisementUrl(ad: { title: string; _id: string }) {
  const slug = generateSlug(ad.title);
  const shortId = ad._id.substring(0, 5); // Używamy tylko pierwszych 5 znaków ID
  return `/szukam-partnera-do-bachaty/ogloszenie/${slug}-${shortId}`;
}
