// Use IMAGE_DOMAIN from env if available, fallback to relative path in production
const IMAGE_DOMAIN = import.meta.env.DEV 
  ? (import.meta.env.IMAGE_DOMAIN || 'https://www.eyeson.uk')
  : ''; // Empty string means use relative URLs in production

export async function getImage(imagePath: string): Promise<string> {
  if (!imagePath) {
    return "/placeholder.png";
  }

  // Clean up the image path
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  try {
    // First try the R2 Function endpoint (direct R2 bucket access)
    const r2Url = `/image/${cleanPath}`;
    console.log('Trying R2 bucket access:', r2Url);
    
    try {
      const r2Response = await fetch(r2Url);
      if (r2Response.ok) {
        console.log('R2 bucket access successful:', r2Url);
        return r2Url;
      } else {
        console.warn('R2 bucket access failed:', await r2Response.text());
      }
    } catch (error) {
      console.warn('R2 bucket access error:', error);
    }

    // If R2 fails, try the custom domain as fallback
    const imageUrl = IMAGE_DOMAIN ? `${IMAGE_DOMAIN}/${cleanPath}` : `/${cleanPath}`;
    console.log('Trying custom domain:', imageUrl);
    
    const response = await fetch(imageUrl, { 
      method: 'HEAD',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
    
    if (response.ok) {
      console.log('Custom domain successful:', imageUrl);
      return imageUrl;
    }
  } catch (error) {
    console.warn('Failed to fetch image:', imagePath, error);
  }

  // If all attempts fail, return placeholder
  console.warn(`Image not found: ${imagePath}. Using local placeholder image.`);
  return "/placeholder.png";
}