import { createAuthModule } from "../_lib/auth.js";
import { createDatabase } from "../_lib/database.js";
import { clearSessionCookie, error, HttpError, assertSameOrigin, json, readJson, sessionCookie } from "../_lib/http.js";
import { createMediaAdapter } from "../_lib/media.js";
import { isAllowedAdminRequest } from "../_lib/network.js";
import { createPublishingModule } from "../_lib/publishing.js";

function segments(request) {
  return new URL(request.url).pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
}

function requireAdminNetwork(context) {
  if (!isAllowedAdminRequest(context.request, context.env.ADMIN_ALLOWED_CIDRS)) {
    throw new HttpError(403, "Halaman Admin hanya dapat diakses dari jaringan Kelurahan.");
  }
}

function databaseError(responseError) {
  if (responseError?.code === "23505") return new HttpError(409, "Data yang sama sudah terdaftar.");
  if (responseError?.code === "23514" || responseError?.code === "23502") return new HttpError(400, "Data belum lengkap atau tidak valid.");
  return responseError;
}

export async function onRequest(context) {
  try {
    const request = context.request;
    const path = segments(request);
    const database = createDatabase(context.env.DATABASE_URL);
    const media = createMediaAdapter(context.env.MEDIA_BUCKET, Number(context.env.MAX_UPLOAD_BYTES) || 5_242_880);
    const publishing = createPublishingModule(database, media);
    const auth = createAuthModule(database, Number(context.env.SESSION_DAYS) || 7);

    if (path[0] === "public" && request.method === "GET") {
      if (path[1] === "content") {
        const response = json(await publishing.publicContent());
        response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
        return response;
      }
      if (path[1] === "news" && path[2]) return json(await publishing.publicNews(path[2]));
      throw new HttpError(404, "Data publik tidak ditemukan.");
    }

    requireAdminNetwork(context);
    assertSameOrigin(request);

    if (path[0] === "auth") {
      if (path[1] === "register" && request.method === "POST") {
        const result = await auth.register(await readJson(request));
        return json({ user: result.user }, 201, { "Set-Cookie": sessionCookie(result.session.token, result.session.maxAge) });
      }
      if (path[1] === "login" && request.method === "POST") {
        const result = await auth.login(await readJson(request));
        return json({ user: result.user }, 200, { "Set-Cookie": sessionCookie(result.session.token, result.session.maxAge) });
      }
      if (path[1] === "logout" && request.method === "POST") {
        await auth.logout(request);
        return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
      }
      if (path[1] === "session" && request.method === "GET") return json({ user: await auth.current(request) });
      throw new HttpError(404, "Halaman autentikasi tidak ditemukan.");
    }

    if (path[0] !== "admin") throw new HttpError(404, "Tujuan tidak ditemukan.");
    await auth.current(request);

    if (path[1] === "media" && request.method === "POST") {
      const form = await request.formData();
      const key = await media.upload(form.get("file"), form.get("category"));
      return json({ key, url: `/media/${key}` }, 201);
    }
    if (path[1] === "media" && request.method === "DELETE" && path.length > 2) {
      await media.remove(path.slice(2).join("/"));
      return json({ ok: true });
    }

    const resource = path[1];
    const id = path[2];
    if (request.method === "GET" && !id) return json({ items: await publishing.list(resource) });
    if (request.method === "POST" && !id) return json({ item: await publishing.create(resource, await readJson(request)) }, 201);
    if (request.method === "PUT" && id) return json({ item: await publishing.update(resource, id, await readJson(request)) });
    if (request.method === "DELETE" && id) return json({ item: await publishing.remove(resource, id) });
    throw new HttpError(405, "Metode tidak diizinkan.");
  } catch (caught) {
    const handled = databaseError(caught);
    if (handled instanceof HttpError) return error(handled.message, handled.status);
    console.error(handled);
    return error("Terjadi kesalahan pada server.", 500);
  }
}
