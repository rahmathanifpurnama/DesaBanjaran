# Teknologi Website Desa Banjaran

Dokumen ini menjelaskan teknologi yang telah disetujui. Proyek tidak menggunakan framework frontend, framework backend, ORM, atau penyedia autentikasi tambahan.

## Cloudflare Pages

Cloudflare Pages menayangkan file publik di direktori `public/`: HTML, CSS, vanilla JavaScript, dan aset bawaan website. Pages tidak menyimpan data Admin.

## Cloudflare Workers

Pages Functions berjalan pada runtime Cloudflare Workers. Implementation berada di direktori `functions/` dan menangani pembatasan IP, pendaftaran, login, session, validasi, pengelolaan konten, serta hubungan ke database dan media.

Workers tidak memiliki filesystem permanen. Karena itu data masuk ke Neon PostgreSQL dan gambar masuk ke R2.

## Cloudflare R2

R2 adalah penyimpanan object untuk gambar. Bucket `desa-banjaran-media` menyimpan gambar berita, foto Aparatur Desa, foto Galeri, dan ikon Layanan Mandiri. Browser membaca gambar melalui rute `/media/...`; kredensial bucket tidak diberikan kepada browser.

Batas unggahan awal adalah 5 MB per gambar. Format yang diterima: JPG, PNG, dan WebP.

## Neon PostgreSQL

Neon menyediakan database PostgreSQL. Skema berada di `database/schema.sql`. Database menyimpan akun dan session Admin, Berita, Aparatur Desa, Galeri, Data Penduduk, Layanan Mandiri, serta Lokasi Desa.

`@neondatabase/serverless` adalah driver resmi yang menghubungkan Workers dengan Neon. Query ditulis menggunakan SQL tanpa ORM.

## Wrangler

Wrangler adalah alat resmi Cloudflare untuk development dan deployment. `npm run dev` menjalankan Pages dan Functions secara lokal; `npm run deploy` mengirimkannya ke Cloudflare.

## Pembatasan jaringan Admin

`ADMIN_ALLOWED_CIDRS` berisi satu atau beberapa IP/rentang IP publik Kelurahan. Pemeriksaan dilakukan pada halaman Admin dan setiap permintaan perubahan data. Mengubah tampilan browser tidak dapat melewati pemeriksaan backend ini.

Contoh satu IP:

```text
36.80.10.20/32
```

Contoh satu rentang:

```text
36.80.10.0/24
```

Jika ISP mengubah IP publik Kelurahan, konfigurasi ini juga harus diperbarui.

## Jadwal salat dinamis

Jadwal dihitung di browser untuk tanggal saat ini pada zona `Asia/Jakarta`, menggunakan koordinat Desa Banjaran `-5.62087, 105.11417`. Sudut Subuh menggunakan 20° dan Isya 18°. Jadwal diperbarui saat halaman dibuka dan diperiksa ulang setiap jam.

Jadwal merupakan perhitungan astronomis, bukan salinan jadwal resmi Kementerian Agama. Perbedaan beberapa menit masih mungkin terjadi karena metode pembulatan dan kebijakan ihtiyat setempat.
