// Import AWS SDK
import AWS from 'aws-sdk';

// Configure the AWS SDK with your R2 credentials using import.meta.env
const s3 = new AWS.S3({
  accessKeyId: import.meta.env.R2_ACCESS_KEY,
  secretAccessKey: import.meta.env.R2_SECRET_KEY,
  endpoint: import.meta.env.R2_URL,
  s3ForcePathStyle: true, // Required for R2
  signatureVersion: 'v4'
});

// Use IMAGE_DOMAIN from env if available, fallback to relative path in production
const IMAGE_DOMAIN = import.meta.env.DEV 
  ? (import.meta.env.IMAGE_DOMAIN || 'https://www.eyeson.uk')
  : ''; // Empty string means use relative URLs in production

// Function to get an image from the R2 bucket (fallback method)
export async function getImageFromBucket(imagePath: string): Promise<Buffer> {
  const bucketName = import.meta.env.R2_BUCKET;
  if (!bucketName) {
    throw new Error("R2_BUCKET environment variable is not set.");
  }

  const params = {
    Bucket: bucketName as string,
    Key: imagePath
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body as Buffer; 
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
} 

export function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export async function getImage(imagePath: string): Promise<string> {
  if (!imagePath) {
    return "/placeholder.png";
  }

  // Clean up the image path
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  try {
    // First try the direct URL approach
    const imageUrl = IMAGE_DOMAIN ? `${IMAGE_DOMAIN}/${cleanPath}` : `/${cleanPath}`;
    const response = await fetch(imageUrl, { 
      method: 'HEAD',
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
    
    if (response.ok) {
      return imageUrl;
    }

    // If direct URL fails, try the R2 Function endpoint
    const r2Response = await fetch(`/image/${cleanPath}`);
    if (r2Response.ok) {
      return `/image/${cleanPath}`;
    }
  } catch (error) {
    console.warn(`Failed to fetch image: ${imagePath}`);
  }

  // If all attempts fail, return placeholder
  console.warn(`Image not found: ${imagePath}. Using local placeholder image.`);
  return "/placeholder.png";
}