# Domain Context

## Domain terms

- **Berita**: Informasi publik Desa Banjaran. Berita memiliki judul, isi, gambar, tanggal terbit, status terbit, dan dapat ditandai sebagai unggulan.
- **Rotator berita**: Tampilan bergilir untuk Berita unggulan.
- **Aparatur Desa**: Data petugas desa yang ditampilkan kepada publik, termasuk nama, jabatan, foto, urutan tampil, dan status aktif.
- **Galeri**: Koleksi foto atau video yang dipublikasikan oleh Admin.
- **Data Penduduk**: Jumlah penduduk pria dan wanita untuk suatu periode; jumlah total dihitung dari keduanya.
- **Layanan Mandiri**: Tautan layanan warga yang memiliki nama, ikon, tujuan, urutan tampil, dan status aktif.
- **Lokasi Desa**: Informasi lokasi yang ditampilkan sebagai kartu peta di sisi kanan halaman publik.
- **Admin**: Petugas Humas atau IT yang dapat mendaftar, login, dan mengelola seluruh konten. Semua Admin memiliki kewenangan yang sama.

## Agreed constraints

- Backend menggunakan vanilla JavaScript.
- Data persisten disimpan di PostgreSQL.
- Gambar diunggah ke penyimpanan server-side, bukan dimasukkan sebagai URL oleh Admin.
- Pendaftaran dan halaman Admin hanya dapat diakses dari rentang IP publik Kelurahan yang dikonfigurasi.
- Tidak ada pengelolaan akun Admin oleh Admin lain.
- Tidak ada riwayat aktivitas Admin.
- Seluruh rotator menggunakan autoplay lima detik, navigasi sebelumnya/berikutnya, dan kembali ke awal setelah mencapai ujung.
- Jadwal salat dihitung setiap hari untuk zona Asia/Jakarta dengan koordinat Desa Banjaran `-5.62087, 105.11417`, sudut Subuh 20°, dan Isya 18°.
- Jadwal salat adalah perhitungan astronomis dan bukan salinan jadwal resmi Kementerian Agama.
- Deployment menggunakan Cloudflare Pages/Workers, gambar menggunakan Cloudflare R2, dan PostgreSQL menggunakan Neon.
- Hanya driver resmi Neon dan Wrangler resmi Cloudflare yang menjadi paket tambahan.
