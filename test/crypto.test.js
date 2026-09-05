import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../functions/_lib/crypto.js";

test("password disimpan sebagai hash dengan salt", async () => {
  const stored = await hashPassword("password-yang-kuat");
  assert.notEqual(stored.hash, "password-yang-kuat");
  assert.equal(await verifyPassword("password-yang-kuat", stored.salt, stored.hash), true);
  assert.equal(await verifyPassword("password-yang-salah", stored.salt, stored.hash), false);
});

test("password pendek ditolak", async () => {
  await assert.rejects(() => hashPassword("pendek"), /10–200/);
});
