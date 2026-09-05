-- SEED DATA POPULATION & IDM
INSERT INTO population (period, male_count, female_count, idm_score, idm_minimum_score, idm_status, idm_target, is_current)
VALUES ('2025', 1807, 1725, 0.6423, 0.7072, 'BERKEMBANG', 'MAJU', TRUE)
ON CONFLICT (period) DO UPDATE 
SET male_count = EXCLUDED.male_count, 
    female_count = EXCLUDED.female_count,
    idm_score = EXCLUDED.idm_score,
    idm_minimum_score = EXCLUDED.idm_minimum_score,
    idm_status = EXCLUDED.idm_status,
    idm_target = EXCLUDED.idm_target,
    is_current = EXCLUDED.is_current;

-- SEED DATA NEWS (BERITA & CAROUSEL)
INSERT INTO news (title, slug, excerpt, body, image_key, is_published, is_featured, published_at)
VALUES 
('PERINGATAN HARI HARI LAHIR DESA BANJARAN KE-88', 'peringatan-hari-lahir-desa-banjaran-ke-88', 'Peringatan Hari Lahir Desa Banjaran Ke-88 diselenggarakan secara meriah bersama seluruh masyarakat.', 'Peringatan Hari Lahir Desa Banjaran Ke-88 diselenggarakan secara meriah bersama seluruh masyarakat Desa Banjaran, Kecamatan Padang Cermin, Kabupaten Pesawaran, Provinsi Lampung.', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-14768-utama_.jpg', TRUE, TRUE, NOW() - INTERVAL '2 days'),
('PELATIHAN IMPLEMENTASI SMART VILLAGE PROVINSI LAMPUNG', 'pelatihan-implementasi-smart-village-provinsi-lampung', 'Pelatihan Implementasi Smart Village Provinsi Lampung dalam rangka percepatan digitalisasi desa.', 'Pelatihan Implementasi Smart Village Provinsi Lampung dalam rangka percepatan digitalisasi desa guna meningkatkan kualitas pelayanan publik masyarakat desa.', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5640-utama_.jpg', TRUE, TRUE, NOW() - INTERVAL '4 days'),
('Wisata Pantai Desa Banjaran', 'wisata-pantai-desa-banjaran', 'Potensi wisata pesisir pantai Desa Banjaran yang asri dan mempesona.', 'Potensi wisata pesisir pantai Desa Banjaran yang asri dan mempesona, menjadi salah satu destinasi unggulan di Kecamatan Padang Cermin.', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-16708-utama_.jpg', TRUE, TRUE, NOW() - INTERVAL '6 days'),
('Profil Masyrakat Desa', 'profil-masyarakat-desa', 'Gambaran umum profil dan kegiatan sosial kemasyarakatan Desa Banjaran.', 'Gambaran umum profil dan kegiatan sosial kemasyarakatan Desa Banjaran, yang menjunjung tinggi nilai gotong royong dan kebersamaan antar warga.', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5644-utama_.jpg', TRUE, FALSE, NOW() - INTERVAL '10 days'),
('Lembaga Desa', 'lembaga-desa', 'Struktur dan kelembagaan pendukung pemerintahan di Desa Banjaran.', 'Struktur dan kelembagaan pendukung pemerintahan di Desa Banjaran meliputi LPM, PKK, Karang Taruna, dan lembaga kemasyarakatan lainnya.', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5647-utama_.jpg', TRUE, FALSE, NOW() - INTERVAL '12 days')
ON CONFLICT (slug) DO NOTHING;

-- SEED DATA OFFICIALS (APARATUR DESA)
INSERT INTO officials (name, position, photo_key, sort_order, is_active)
VALUES
('MAT HAMZAH', 'Kepala Desa', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_140324105348.png', 1, TRUE),
('ASRUL YANI', 'Sekretaris Desa', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_1809051803730005.png', 2, TRUE),
('KARDI', 'Kepala Seksi Pemerintahan', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_140324110044.png', 3, TRUE),
('EDI PURNOMO', 'Kepala Seksi Kesejahteraan', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_140324110026.png', 4, TRUE),
('DEDI FEBERLIANSYAH', 'Kepala Seksi Pelayanan', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_1809053012810002.png', 5, TRUE),
('TRIYANI', 'Kepala Urusan tata Usaha Dan Umum', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_1809055203890009.png', 6, TRUE),
('PARYANTO', 'Kepala Urusan Keuangan', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_140324110125.png', 7, TRUE),
('HANDOKO', 'Kepala Urusan Perencanaan', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_140324110000.png', 8, TRUE),
('WAWAN SETIAWAN', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_1809051906870003.png', 9, TRUE),
('ZAINUDIN', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_140324110155.png', 10, TRUE),
('AGUS SUPRIADI', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_1809051808850010.png', 11, TRUE),
('AGUS EDI KUSWANTO', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/18_09_05_2001_Aparat_1809052704900003.png', 12, TRUE),
('SELFIA MAGARETA', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/3518165603920001.png', 13, TRUE),
('BUYUNG', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/140324110224.png', 14, TRUE),
('MARYADI', 'Kepala Dusun', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050103840006.png', 15, TRUE),
('SUHERI', 'Badan Permusyawaratan Desa', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/140324105322.png', 16, TRUE),
('MARIYATUN', 'Badan Permusyawaratan Desa', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809054703830008.png', 17, TRUE),
('YULIANTO', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050906810007.png', 18, TRUE),
('JAHARI', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809051512530002.png', 19, TRUE),
('SUNARTO', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050307720008.png', 20, TRUE),
('TRISNO WAHYONO', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809051108720008.png', 21, TRUE),
('TARMUJI', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050802720006.png', 22, TRUE),
('SUGIYANTO', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050107730053.png', 23, TRUE),
('BOYAMSAH', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809051604860010.png', 24, TRUE),
('SAHIR', 'Lembaga', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050507610003.png', 25, TRUE),
('SUPARTA', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809052105750001.png', 26, TRUE),
('Nama Pejabat', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809050902730002.png', 27, TRUE),
('ANNISA FITRIANI', 'Operator IT', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/180905430500000.png', 28, TRUE),
('DIAH AYU LESTARI', 'Operator IT', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809056903970008.png', 29, TRUE),
('AMIN SUTOYO', 'Lainnya', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/foto_aparat/1809051904120025.png', 30, TRUE);

-- SEED DATA GALLERY (FOTO & VIDEO YOUTUBE)
INSERT INTO gallery (title, media_type, image_key, youtube_url, sort_order, is_active)
VALUES
('Peringatan Hari Lahir Desa Banjaran Ke-88', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-14768-utama_.jpg', NULL, 1, TRUE),
('Pelatihan Implementasi Smart Village', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5640-utama_.jpg', NULL, 2, TRUE),
('Profil Desa Banjaran', 'youtube', NULL, 'https://www.youtube.com/watch?v=sFJ97E7xevc', 3, TRUE),
('Persiapan Lomba PBB se-kecamatan', 'youtube', NULL, 'https://www.youtube.com/watch?v=KRVJdjwvETI', 4, TRUE),
('Dokumentasi Kegiatan Desa Banjaran 1', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5646-utama_.jpg', NULL, 5, TRUE),
('Dokumentasi Kegiatan Desa Banjaran 2', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5647-utama_.jpg', NULL, 6, TRUE),
('Dokumentasi Kegiatan Desa Banjaran 3', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5645-utama_.jpg', NULL, 7, TRUE),
('Dokumentasi Kegiatan Desa Banjaran 4', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5649-utama_.jpg', NULL, 8, TRUE),
('Dokumentasi Kegiatan Desa Banjaran 5', 'image', 'https://metadesa.id/LAMPUNG/PESAWARAN/PadangCermin/Banjaran/artikel/18_09_05_2001-5643-utama_.jpg', NULL, 9, TRUE);

-- SEED DATA CITIZEN SERVICES (LAYANAN MANDIRI)
INSERT INTO citizen_services (name, destination_url, icon_key, sort_order, is_active)
VALUES
('Surat Permohonan KTP', 'https://banjaran-padangcermin.metadesa.id/pages/menu/loginlayananmandiri.aspx', NULL, 1, TRUE),
('Surat Permohonan KK', 'https://banjaran-padangcermin.metadesa.id/pages/menu/loginlayananmandiri.aspx', NULL, 2, TRUE),
('Surat Keterangan Tidak Mampu', 'https://banjaran-padangcermin.metadesa.id/pages/menu/loginlayananmandiri.aspx', NULL, 3, TRUE),
('Surat Keterangan Usaha', 'https://banjaran-padangcermin.metadesa.id/pages/menu/loginlayananmandiri.aspx', NULL, 4, TRUE),
('Surat Keterangan Domisili', 'https://banjaran-padangcermin.metadesa.id/pages/menu/loginlayananmandiri.aspx', NULL, 5, TRUE),
('Surat Keterangan Izin Keramaian', 'https://banjaran-padangcermin.metadesa.id/pages/menu/loginlayananmandiri.aspx', NULL, 6, TRUE);

-- SEED DATA VILLAGE LOCATIONS (PETA & BALAI DESA)
INSERT INTO village_locations (title, embed_url, sort_order, is_active)
VALUES
('Peta Desa Banjaran', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18687.770681440612!2d105.11417264060051!3d-5.620868596346017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e412eaa45ab6c69%3A0x86c08d9d17b4997a!2sBanjaran%2C%20Kec.%20Padang%20Cermin%2C%20Kabupaten%20Pesawaran%2C%20Lampung!5e0!3m2!1sid!2sid!4v1739593479964!5m2!1sid!2sid', 1, TRUE),
('Lokasi Balai Desa', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3407.127079831005!2d105.13622377364317!3d-5.605239260237678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41294fd56f1a19%3A0x4aadac80b04c34d3!2sKantor%20Desa%20Banjaran!5e0!3m2!1sid!2sid!4v1739646565887!5m2!1sid!2sid', 2, TRUE);
