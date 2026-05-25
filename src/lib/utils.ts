import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(image: string | undefined | null) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `https://fastcard-1-o23z.onrender.com/images/${image}`;
}
