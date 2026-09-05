import test from "node:test";
import assert from "node:assert/strict";
import { createPublishingModule } from "../functions/_lib/publishing.js";

function fakeDatabase(responses = []) {
  const calls = [];
  return {
    calls,
    async query(text, parameters = []) { calls.push({ text, parameters }); return responses.shift() || []; },
  };
}

test("publishing module memvalidasi dan membuat berita", async () => {
  const database = fakeDatabase([[{ id: 1, title: "Berita Desa" }]]);
  const publishing = createPublishingModule(database, { remove() {} });
  const item = await publishing.create("news", {
    title: "Berita Desa", excerpt: "Ringkas", body: "Isi berita desa.", image_key: "news/a.jpg",
    is_published: true, is_featured: true, published_at: "2025-02-15T10:00:00Z",
  });
  assert.equal(item.id, 1);
  assert.match(database.calls[0].text, /^INSERT INTO news/);
  assert.match(database.calls[0].parameters.at(-1), /^berita-desa-/);
});

test("publishing module menolak tujuan layanan non-HTTPS", async () => {
  const publishing = createPublishingModule(fakeDatabase(), { remove() {} });
  await assert.rejects(() => publishing.create("services", {
    name: "Permohonan KTP", destination_url: "http://example.com", icon_key: null, sort_order: 1, is_active: true,
  }), /HTTPS/);
});

test("menghapus data juga menghapus media terkait", async () => {
  const database = fakeDatabase([[{ id: 7, image_key: "gallery/a.jpg" }]]);
  const removed = [];
  const publishing = createPublishingModule(database, { async remove(key) { removed.push(key); } });
  await publishing.remove("gallery", 7);
  assert.deepEqual(removed, ["gallery/a.jpg"]);
});
