import { HttpError } from "./http.js";

const ACCEPTED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function safeCategory(value) {
  return ["news", "officials", "gallery", "services"].includes(value) ? value : "misc";
}

export function createMediaAdapter(bucket, maxUploadBytes = 5_242_880) {
  if (!bucket) throw new Error("MEDIA_BUCKET belum dikonfigurasi.");
  return {
    async upload(file, category) {
      if (!(file instanceof File)) throw new HttpError(400, "File gambar wajib dipilih.");
      const extension = ACCEPTED_TYPES.get(file.type);
      if (!extension) throw new HttpError(400, "Gambar harus berformat JPG, PNG, atau WebP.");
      if (file.size < 1 || file.size > maxUploadBytes) throw new HttpError(400, `Ukuran gambar maksimal ${Math.floor(maxUploadBytes / 1_048_576)} MB.`);
      const key = `${safeCategory(category)}/${crypto.randomUUID()}.${extension}`;
      await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
      return key;
    },
    remove(key) {
      return key ? bucket.delete(key) : Promise.resolve();
    },
    get(key) {
      return bucket.get(key);
    },
  };
}
