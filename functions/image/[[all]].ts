
interface Env {
  // @ts-ignore
  BUCKET: R2Bucket;
}

// @ts-ignore
export async function onRequestGet(request: Request, env: Env, ctx: ExecutionContext) {

  const url = new URL(request.url);
  const key = url.pathname.replace("/image/", "");

  const object = await env.BUCKET.get(key);
  if (!object) {
    return new Response(null, { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set("Content-Type", object.httpMetadata?.contentType || "application/octet-stream");

  return new Response(object.body, { status: 200, headers });
} 