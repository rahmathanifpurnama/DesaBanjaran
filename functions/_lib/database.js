import { neon } from "@neondatabase/serverless";

export function createDatabase(connectionString) {
  if (!connectionString) throw new Error("DATABASE_URL belum dikonfigurasi.");
  const sql = neon(connectionString);
  return {
    query(text, parameters = []) {
      return sql.query(text, parameters);
    },
  };
}
