import { hashPassword, randomToken, sha256, verifyPassword } from "./crypto.js";
import { HttpError, parseCookies } from "./http.js";

function normalizeEmail(value) {
  if (typeof value !== "string") throw new HttpError(400, "Email wajib diisi.");
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Email tidak valid.");
  return email;
}

function normalizeName(value) {
  if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > 100) {
    throw new HttpError(400, "Nama harus terdiri dari 2–100 karakter.");
  }
  return value.trim();
}

export function createAuthModule(database, sessionDays = 7) {
  async function startSession(userId) {
    const token = randomToken();
    const tokenHash = await sha256(token);
    const maxAge = Math.max(1, sessionDays) * 86_400;
    await database.query(
      "INSERT INTO admin_sessions (token_hash, user_id, expires_at) VALUES ($1, $2, NOW() + ($3 * INTERVAL '1 second'))",
      [tokenHash, userId, maxAge],
    );
    return { token, maxAge };
  }

  return {
    async register(input) {
      const name = normalizeName(input.name);
      const email = normalizeEmail(input.email);
      const password = await hashPassword(input.password);
      const result = await database.query(
        "INSERT INTO admin_users (name, email, password_salt, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
        [name, email, password.salt, password.hash],
      );
      return { user: result[0], session: await startSession(result[0].id) };
    },

    async login(input) {
      const email = normalizeEmail(input.email);
      const result = await database.query("SELECT * FROM admin_users WHERE LOWER(email) = $1 LIMIT 1", [email]);
      const user = result[0];
      if (!user || !(await verifyPassword(input.password || "", user.password_salt, user.password_hash))) {
        throw new HttpError(401, "Email atau password salah.");
      }
      return { user: { id: user.id, name: user.name, email: user.email }, session: await startSession(user.id) };
    },

    async current(request) {
      const token = parseCookies(request).desa_session;
      if (!token) throw new HttpError(401, "Silakan login terlebih dahulu.");
      const result = await database.query(
        `SELECT u.id, u.name, u.email
         FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id
         WHERE s.token_hash = $1 AND s.expires_at > NOW() LIMIT 1`,
        [await sha256(token)],
      );
      if (!result[0]) throw new HttpError(401, "Session telah berakhir. Silakan login kembali.");
      return result[0];
    },

    async logout(request) {
      const token = parseCookies(request).desa_session;
      if (token) await database.query("DELETE FROM admin_sessions WHERE token_hash = $1", [await sha256(token)]);
    },
  };
}
