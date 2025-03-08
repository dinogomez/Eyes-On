import type { R2Bucket } from "@cloudflare/workers-types";

interface Env {
  BUCKET: R2Bucket;
}

// @ts-ignore
export async function onRequestGet(context) {
  const path = new URL(context.request.url).pathname.replace("/images/", "");
  console.log(path);
  const file = await context.env.BUCKET.get(path);
  
  if (!file) {
    return new Response(null, { 
      status: 404,
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate'
      }
    });
  }

  const headers = new Headers();
  // Cache successful responses for 1 year
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('Content-Type', file.httpMetadata?.contentType || 'application/octet-stream');
  
  return new Response(file.body, {
    headers
  });
} 