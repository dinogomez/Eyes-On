import type { R2Bucket } from '@cloudflare/workers-types';

interface Env {
  BUCKET: R2Bucket;
}

export async function onRequest(context: { env: Env; params: { key: string | string[] } }) {
  try {
    const key = Array.isArray(context.params.key) ? context.params.key[0] : context.params.key;
    if (!key) {
      return new Response("Key is required", { status: 400 });
    }

    const obj = await context.env.BUCKET.get(key);
    if (obj === null) {
      return new Response("Not found", { status: 404 });
    }

    const ext = key.split('.').pop()?.toLowerCase() || '';
    const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                       ext === 'png' ? 'image/png' :
                       ext === 'webp' ? 'image/webp' :
                       ext === 'gif' ? 'image/gif' :
                       'application/octet-stream';

    // Convert R2 object to ArrayBuffer
    const arrayBuffer = await obj.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
} 