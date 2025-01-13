import { generateSlug } from "./slug";

export function generateAdvertisementUrl(ad: { title: string; _id: string }) {
  const slug = generateSlug(ad.title);
  return `/szukam-partnera-do-bachaty/ogloszenie/${slug}-${ad._id}`;
}
