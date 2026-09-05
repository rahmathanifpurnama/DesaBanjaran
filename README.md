# Website Desa Banjaran

Website publik dan halaman Admin berbasis vanilla JavaScript. Cloudflare Pages menayangkan file publik, Cloudflare Workers menjalankan backend, Cloudflare R2 menyimpan gambar, dan Neon PostgreSQL menyimpan data.

Penjelasan setiap teknologi tersedia di [`docs/TECHNOLOGY.md`](docs/TECHNOLOGY.md).
Panduan langkah deployment Cloudflare & Neon tersedia di [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Menjalankan secara lokal

1. Pasang Node.js 22.
2. Jalankan `npm install`.
3. Salin `.dev.vars.example` menjadi `.dev.vars` dan isi koneksi Neon.
4. Jalankan `database/schema.sql`, lalu `database/seed.sql` melalui Neon SQL Editor.
5. Jalankan `npm run dev`.
6. Buka `/admin/register.html` dari IP yang tercantum pada `ADMIN_ALLOWED_CIDRS`.

## Konfigurasi Cloudflare

- Buat bucket R2 bernama `desa-banjaran-media`.
- Isi secret `DATABASE_URL` melalui Cloudflare dashboard atau `wrangler pages secret put DATABASE_URL`.
- Ganti contoh `ADMIN_ALLOWED_CIDRS` di `wrangler.jsonc` dengan IP publik Kelurahan.
- Deploy dengan `npm run deploy`.

`ADMIN_ALLOWED_CIDRS` menerima daftar CIDR yang dipisahkan koma. Contoh satu IP: `36.80.10.20/32`.

## Perintah

- `npm test` — pengujian module murni.
- `npm run check` — pemeriksaan sintaks.
- `npm run dev` — development lokal.
- `npm run deploy` — deployment Pages.
