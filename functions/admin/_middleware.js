import { isAllowedAdminRequest } from "../_lib/network.js";

export async function onRequest(context) {
  if (!isAllowedAdminRequest(context.request, context.env.ADMIN_ALLOWED_CIDRS)) {
    return new Response("Halaman Admin hanya dapat diakses dari jaringan Kelurahan.", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  return context.next();
}
