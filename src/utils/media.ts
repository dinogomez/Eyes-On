import { getImage } from "astro:assets";

const MEDIA_DOMAIN = "media.eyeson.uk";

const transformImageUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return `https://${MEDIA_DOMAIN}/${cleanPath}`;
};


export const media = async (
  imagePath: string,
  options: {
    width?: number;
    height?: number;
    format?: "webp" | "avif" | "png" | "jpg";
  } = {}
): Promise<string> => {
  try {
    // Use Astro's image optimization
    const optimized = await getImage({
      src: imagePath,
      width: options.width || 3440,
      height: options.height,
      format: options.format || "webp",
      quality: "max",
    });

    // Return the optimized URL - Cloudflare will handle caching
    return transformImageUrl(optimized.src);
  } catch (error) {
    console.error("Error optimizing image:", error);
    // Fallback to original URL
    return transformImageUrl(imagePath);
  }
};
