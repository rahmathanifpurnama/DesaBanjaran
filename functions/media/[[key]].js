import { createMediaAdapter } from "../_lib/media.js";

export async function onRequestGet(context) {
  const key = Array.isArray(context.params.key) ? context.params.key.join("/") : context.params.key;
  if (!key || key.includes("..")) return new Response("Tidak ditemukan", { status: 404 });
  const object = await createMediaAdapter(context.env.MEDIA_BUCKET).get(key);
  if (!object) return new Response("Tidak ditemukan", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(object.body, { headers });
}
