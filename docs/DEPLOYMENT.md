# Panduan Deployment Cloudflare Pages & Neon PostgreSQL

Dokumen ini menjelaskan langkah demi langkah untuk melakukan deployment Website Desa Banjaran ke Cloudflare Pages dengan database Neon PostgreSQL dan penyimpanan gambar Cloudflare R2.

---

## 1. Keamanan Git & File Rahasia

Sebelum melakukan `git push` ke GitHub, pastikan berkas rahasia tidak ikut terunggah:
- File `.dev.vars` (berisi password database lokal) **sudah masuk dalam `.gitignore`** dan **tidak akan terunggah** ke GitHub.
- File `.dev.vars.example` hanya berisi contoh template tanpa kredensial asli.
- Kredensial database asli untuk produksi akan dimasukkan langsung ke menu **Environment Variables / Secrets** di Cloudflare Dashboard.

---

## 2. Persiapan Database (Neon PostgreSQL)

1. Buka [console.neon.tech](https://console.neon.tech) dan masuk ke akun Anda.
2. Buat database baru (atau gunakan yang sudah dibuat).
3. Buka **SQL Editor** pada dashboard Neon, lalu jalankan secara berurutan:
   - Salin isi berkas `database/schema.sql` lalu klik **Run**.
   - Salin isi berkas `database/seed.sql` lalu klik **Run**.
4. Salin **Connection String** database Neon Anda (contoh: `postgresql://neondb_owner:password@ep-xyz.aws.neon.tech/neondb?sslmode=require`).

---

## 3. Persiapan Penyimpanan Gambar (Cloudflare R2)

1. Buka [dash.cloudflare.com](https://dash.cloudflare.com).
2. Di menu sebelah kiri, pilih **R2 Object Storage**.
3. Klik **Create Bucket**.
4. Beri nama bucket: **`desa-banjaran-media`** (harus sama persis dengan yang ada di `wrangler.jsonc`).
5. Pilih lokasi terdekat (misal: *Asia-Pacific* / *Automatic*), lalu klik **Create Bucket**.

---

## 4. Cara Deploy ke Cloudflare

Ada 2 cara yang dapat Anda pilih:

### Cara A: Otomatis Lewat GitHub (Sangat Direkomendasikan)
1. Push project Anda ke repository GitHub:
   ```bash
   git add .
   git commit -m "feat: website desa banjaran with vanilla js backend"
   git push origin main
   ```
2. Buka [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create Application** → **Pages** → **Connect to Git**.
3. Pilih repository GitHub Anda (`Website-Desa-Banjaran`).
4. Pada bagian **Build Settings**:
   - **Framework preset:** `None`
   - **Build command:** *(kosongkan)*
   - **Build output directory:** `public`
5. Pada bagian **Environment variables (Variables and Secrets)**:
   - Tambahkan variabel:
     - `DATABASE_URL` = *(isi dengan connection string Neon PostgreSQL Anda)*
     - `ADMIN_ALLOWED_CIDRS` = *(isi dengan IP publik internet Kelurahan, misal: `36.80.10.20/32`)*
     - `SESSION_DAYS` = `7`
     - `MAX_UPLOAD_BYTES` = `5242880`
6. Klik **Save and Deploy**.
7. Setelah proses deploy selesai, sambungkan bucket R2:
   - Masuk ke proyek Pages Anda di Cloudflare → Tab **Settings** → **Functions** → **R2 Bucket Bindings**.
   - Klik **Add binding**:
     - Variable name: `MEDIA_BUCKET`
     - R2 Bucket: pilih `desa-banjaran-media`
   - Klik **Save**.
8. Lakukan Redeploy (atau lakukan commit baru) agar binding R2 aktif.

---

### Cara B: Deploy Langsung via Terminal (Wrangler CLI)
1. Login ke akun Cloudflare di terminal Anda:
   ```bash
   npx wrangler login
   ```
2. Tambahkan secret database ke Cloudflare:
   ```bash
   npx wrangler pages secret put DATABASE_URL
   ```
   *(Masukkan URL Neon PostgreSQL Anda saat diminta)*
3. Jalankan perintah deploy:
   ```bash
   npm run deploy
   ```

---

## 5. Mengakses Website & Admin Setelah Deploy

- **Website Publik:** Buka URL domain Cloudflare Pages Anda (misal: `https://website-desa-banjaran.pages.dev`).
- **Pendaftaran Admin Pertama:** Buka `https://website-desa-banjaran.pages.dev/admin/register.html` dari jaringan IP Kelurahan yang telah didaftarkan.
- **Login Admin:** Buka `https://website-desa-banjaran.pages.dev/admin/login.html`.
