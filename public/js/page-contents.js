// Definisi konten untuk setiap halaman
const pageContents = {
  "profil-wilayah": `
        <div class="content-wrapper">
    <div class="page-header">
        <h1>Profil Wilayah Desa</h1>
    </div>
    
    <div class="page-content">
        <div class="main-section">
            <h2>Gambaran Umum Desa</h2>
            <p>Desa Banjaran merupakan salah satu desa yang terletak di Kecamatan Padang Cermin, Kabupaten Pesawaran, Provinsi Lampung. Desa ini memiliki luas wilayah sekitar 1,560 hektar dengan topografi yang beragam.</p>
            
            <h2>KONDISI GEOGRAFIS</h2>
            
            <h3>Tata Guna Tanah</h3>
            <table class="stat-table">
                <tr>
                    <th>NO</th>
                    <th>TATA GUNA TANAH</th>
                    <th>LUAS</th>
                </tr>
                <tr>
                    <td>1.</td>
                    <td>Luas Pemukiman</td>
                    <td>259 ha/m²</td>
                </tr>
                <tr>
                    <td>2.</td>
                    <td>Luas Persawahan</td>
                    <td>74 ha/m²</td>
                </tr>
                <tr>
                    <td>3.</td>
                    <td>Luas Perkebunan</td>
                    <td>265 ha/m²</td>
                </tr>
                <tr>
                    <td>4.</td>
                    <td>Luas Fasilitas Umum</td>
                    <td>8.4 ha/m²</td>
                </tr>
                <tr>
                    <td>5.</td>
                    <td>Luas Tanah Hutan</td>
                    <td>953 ha/m²</td>
                </tr>
                <tr>
                    <td><strong>Total Luas</strong></td>
                    <td><strong>1,560 ha/m²</strong></td>
                    <td></td>
                </tr>
            </table>

            <h3>Letak Desa</h3>
            <p>Letak Desa Banjaran berada di sebelah Barat yang merupakan Ibu Kota Kabupaten Pesawaran, jarak dari Desa Padang Cermin ke Desa Khepong Jaya sekitar 1 km. Adapun batas-batas desa adalah sebagai berikut:</p>
            <ul>
                <li>Sebelah Utara: Desa Padang Cermin, Kecamatan Padang Cermin</li>
                <li>Sebelah Timur: Desa Sanggi Berak, Kecamatan Padang Cermin</li>
                <li>Sebelah Selatan: Desa Gayau, Kecamatan Padang Cermin</li>
                <li>Sebelah Barat: Desa Trimulyo, Kecamatan Padang Cermin</li>
            </ul>
        </div>
    </div>
</div>
`,

  "profil-potensi": `
         <div class="content-wrapper">
        <div class="page-header">
            <h1>Potensi Desa</h1>
        </div>
        <div class="main-section">
        <div class="page-content">           
            <h2>A. Batas Wilayah</h2>
            <ul>
                <li>Utara: Desa Padang Cermin dan Desa Khepong Jaya</li>
                <li>Selatan: Desa Gayau dan Desa Maja</li>
                <li>Timur: Desa Sanggi</li>
                <li>Barat: Desa Trimulyo</li>
            </ul>

            <h2>B. Luas Wilayah Menurut Penggunaan</h2>
            <table>
                <tr>
                    <th>Jenis Tanah</th>
                    <th>Luas (Ha)</th>
                </tr>
                <tr>
                    <td>Tanah Sawah</td>
                    <td>74.00</td>
                </tr>
                <tr>
                    <td>Tanah Kering</td>
                    <td>259.10</td>
                </tr>
                <tr>
                    <td>Tanah Perkebunan</td>
                    <td>265.50</td>
                </tr>
                <tr>
                    <td>Fasilitas Umum</td>
                    <td>8.40</td>
                </tr>
                <tr>
                    <td>Tanah Hutan</td>
                    <td>953.00</td>
                </tr>
                <tr>
                    <th>Total Luas</th>
                    <th>1,560.00 Ha</th>
                </tr>
            </table>

          
                <h2>Potensi Sumber Daya Alam</h2>
                <div class="potensi-item">
                    <h3>Pertanian</h3>
                    <p>Lahan pertanian di Desa Banjaran sangat subur dan cocok untuk berbagai jenis tanaman pangan seperti padi, jagung, dan sayuran.</p>
                </div>

                <div class="potensi-item">
                    <h3>Perkebunan</h3>
                    <p>Area perkebunan ditanami berbagai komoditas seperti kopi, lada, dan kakao.</p>
                </div>

                <div class="potensi-item">
                    <h3>Wisata Alam</h3>
                    <p>Desa Banjaran memiliki beberapa objek wisata alam seperti air terjun, area camping, dan spot memancing.</p>
                </div>
           

            <h2>C. Pertanian</h2>
            <table>
                <tr>
                    <th>Komoditas</th>
                    <th>Luas (Ha)</th>
                    <th>Hasil Panen (Ton/Ha)</th>
                </tr>
                <tr>
                    <td>Padi</td>
                    <td>74.00</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>Kopi</td>
                    <td>100.00</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Kakao</td>
                    <td>75.00</td>
                    <td>75</td>
                </tr>
            </table>

            <h2>D. Perkebunan</h2>
            <table>
                <tr>
                    <th>Jenis Komoditas</th>
                    <th>Luas (Ha)</th>
                    <th>Hasil (Kw/Ha)</th>
                </tr>
                <tr>
                    <td>Kopi</td>
                    <td>100</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Lada</td>
                    <td>65</td>
                    <td>70</td>
                </tr>
            </table>

            <h2>E. Kehutanan</h2>
            <p>Hutan Lindung: 953.00 Ha</p>

            <h2>F. Sumber Daya Air</h2>
            <table>
                <tr>
                    <th>Sumber Air</th>
                    <th>Jumlah Unit</th>
                    <th>Pemanfaat (KK)</th>
                    <th>Kondisi</th>
                </tr>
                <tr>
                    <td>Mata Air</td>
                    <td>74</td>
                    <td>74</td>
                    <td>Baik</td>
                </tr>
                <tr>
                    <td>Sumur Gali</td>
                    <td>918</td>
                    <td>918</td>
                    <td>Baik</td>
                </tr>
                <tr>
                    <td>PAM</td>
                    <td>46</td>
                    <td>46</td>
                    <td>Baik</td>
                </tr>
            </table>

            <div class="stat-section">
                <h2>Data Produksi Tahunan</h2>
                <table class="stat-table">
                    <tr>
                        <th>Komoditas</th>
                        <th>Produksi (Ton)</th>
                    </tr>
                    <tr>
                        <td>Padi</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <td>Kopi</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>Kakao</td>
                        <td>75</td>
                    </tr>
                </table>
            </div>

            <h2>G. Prasarana dan Sarana Pendidikan</h2>
            <ul>
                <li>Sekolah Dasar: 2 unit</li>
                <li>TK/PAUD: 1 unit</li>
                <li>Sekolah Islam: 1 unit</li>
                <li>Madrasah Ibtidaiyah: 1 unit</li>
            </ul>

            <h2>H. Mata Pencaharian Pokok</h2>
            <ul>
                <li>Petani: 503 orang</li>
                <li>Buruh Tani: 797 orang</li>
                <li>Pegawai Negeri Sipil: 11 orang</li>
                <li>Nelayan: 7 orang</li>
                <li>Guru Swasta: 9 orang</li>
                <li>Ibu Rumah Tangga: 701 orang</li>
            </ul>

            <h2>I. Prasarana Energi dan Penerangan</h2>
            <ul>
                <li>Listrik PLN: 857 unit</li>
                <li>Genset Pribadi: 6 unit</li>
            </ul>
        </div>
         </div>
    </div>
        </div>
    </div>
    `,

  "sejarah-desa": `
        <div class="content-wrapper">
    <div class="page-header">
        <h1>Sejarah Desa</h1>
    </div>
    
    <div class="page-content">
        <div class="main-section">
            <h2>Asal Usul Desa Banjaran</h2>
            <p>Desa Banjaran dahulu didirikan oleh Hi. Moh Nur. Dahulu pemukiman penduduk Banjaran berada diseberang sungai yang sekarang merupakan areal Pesawahan Banjaran.</p>
            
            <p>Atas permintaan Hi. Moh. Nur kepada Hi. Moh. Syarif (Orang Tua dari Ismail Suntan Raja Dilampung/Pimpinan Marga Way Ratai), Maka pindahlah Pekon Banjaran ketempat yang sekarang ini, dengan beberapa persyaratan Secara Adat Lampung yaitu: Beras 1 (satu) Talam, Kain Putih 1 (satu) Potong dan dengan sejumlah uang Ringgit.</p>
            
            <p>Maka pada tahun 1917 berdirilah kampung tersebut dengan nama Pekon Kota Bumi, tetapi secara pemerintahan tetap dengan nama Banjaran. Asal kata Banjaran itu sendiri berasal dari bahasa Lampung yaitu Banjaran (ditambatkan). Asal mulanya adalah kulit kerbau yang diolah menjadi tali dan ditambatkan dari timur sampai ke barat sebagai batas dari Desa Banjaran.</p>

            <p>Nama Banjaran berasal dari kata "Banjar" yang berarti deretan atau barisan, mengacu pada pola pemukiman awal yang berbaris mengikuti aliran sungai.</p>

            <h3>Periode Perkembangan</h3>
            <div class="timeline-section">
                <div class="timeline">
                    <div class="timeline-item">
                        <h4>1917</h4>
                        <p>Berdirinya kampung dengan nama Pekon Kota Bumi</p>
                    </div>
                    <div class="timeline-item">
                        <h4>1930</h4>
                        <p>Pembukaan wilayah pertama oleh perintis</p>
                    </div>
                    <div class="timeline-item">
                        <h4>1950</h4>
                        <p>Pembentukan struktur pemerintahan desa</p>
                    </div>
                    <div class="timeline-item">
                        <h4>1975</h4>
                        <p>Pembangunan balai desa pertama</p>
                    </div>
                    <div class="timeline-item">
                        <h4>2000</h4>
                        <p>Pengembangan sektor wisata</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
  "visi-misi": `
  <div class="content-wrapper">
    <div class="page-header">
        <h1>Visi dan Misi Desa Banjaran</h1>
    </div>
    
    <div class="page-content">
        <div class="main-section">
            <h2>Visi Desa</h2>
            <p>Terwujudnya tata kelola pemerintah Desa Banjaran yang baik dan bersih, dan peningkatan pemberdayaan masyarakat guna mewujudkan kehidupan masyarakat desa yang mandiri, makmur, dan sejahtera.</p>
            
            <h2>Misi Desa</h2>
            <ul>
                <li>Terwujudnya Desa Banjaran sebagai Desa Mandiri.</li>
                <li>Terwujudnya tata kelola pemerintah Desa Banjaran yang baik dan bersih.</li>
                <li>Peningkatan pemberdayaan masyarakat guna mewujudkan kehidupan masyarakat desa yang mandiri, makmur, dan sejahtera.</li>
            </ul>
        </div>
    </div>
  </div>
`,
};

// Add to pageContents object
pageContents["idm"] = `
  <div class="main-container">
      <div class="left-content">
          <div class="idm-container">
              <div class="idm-status">
                  <h1>Status Index Desa Membangun (IDM)</h1>
              
              <!-- Location Cards Grid -->
              <div class="idm-location-grid">
                  <!-- Provinsi Card -->
                  <div class="idm-card provinsi">
                      <span>PROVINSI</span>
                      <h3>LAMPUNG</h3>
                  </div>
                  
                  <!-- Kabupaten Card -->
                  <div class="idm-card kabupaten">
                      <span>KABUPATEN / KOTA</span>
                      <h3>PESAWARAN</h3>
                  </div>
                  
                  <!-- Kecamatan Card -->
                  <div class="idm-card kecamatan">
                      <span>KECAMATAN</span>
                      <h3>PADANG CERMIN</h3>
                  </div>
                  
                  <!-- Kelurahan Card -->
                  <div class="idm-card kelurahan">
                      <span>KELURAHAN / DESA</span>
                      <h3>BANJARAN</h3>
                  </div>
              </div>
              
              <!-- Status Cards Grid -->
              <div class="idm-status-grid">
                  <!-- Skor IDM Card -->
                  <div class="idm-card skor-current">
                      <span>SKOR IDM SAAT INI</span>
                      <h3>0.6423</h3>
                  </div>
                  
                  <!-- Skor Minimal Card -->
                  <div class="idm-card skor-minimal">
                      <span>SKOR IDM MINIMAL</span>
                      <h3>0.7072</h3>
                  </div>
                  
                  <!-- Status IDM Card -->
                  <div class="idm-card status-idm">
                      <span>STATUS IDM</span>
                      <h3>BERKEMBANG</h3>
                  </div>
                  
                  <!-- Target Status Card -->
                  <div class="idm-card target-status">
                      <span>TARGET STATUS</span>
                      <h3>MAJU</h3>
                  </div>
              </div>
            </div>
          </div>
    </div>
  </div>
  `;

// Tentukan route yang valid
const validRoutes = [
  "profil-wilayah",
  "profil-potensi",
  "sejarah-desa",
  "visi-misi",
  "idm",
];

// Function untuk mengelola visibilitas komponen
function manageComponentVisibility(route) {
  const sidebar = document.querySelector(".sidebar");
  const pemerintahWrapper = document.querySelector(".pemerintah-wrapper");

  if (route === "pemerintah") {
    if (sidebar) {
      sidebar.style.display = "none";
    }
    if (pemerintahWrapper) {
      pemerintahWrapper.style.display = "none";
    }
  } else {
    if (sidebar) {
      sidebar.style.display = "flex"; // Gunakan flex agar tetap mengikuti layout
    }
    if (pemerintahWrapper) {
      pemerintahWrapper.style.display = "none";
    }
  }
}

// Function untuk mengganti konten
function changeContent(route) {
  if (validRoutes.includes(route)) {
    const mainContent = document.querySelector(".main-container .left-content");
    if (mainContent && pageContents[route]) {
      // Update konten utama
      mainContent.innerHTML = pageContents[route];

      // Atur visibilitas sidebar
      manageComponentVisibility(route);

      // Update URL
      history.pushState(null, "", `#${route}`);
    }
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Handler untuk link menu
  const routedLinks = document.querySelectorAll(
    '.dropdown-content a, a[href="#pemerintah"], a[href="#idm"]'
  );
  routedLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const route = e.target.getAttribute("href").substring(1);
      if (validRoutes.includes(route)) {
        changeContent(route);
      }
    });
  });

  // Handler untuk logo/home link
  const homeLinks = document.querySelectorAll(
    'a[href="index.html"], .home-icon'
  );
  homeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  });

  // Check initial route
  const initialRoute = window.location.hash.substring(1);
  if (validRoutes.includes(initialRoute)) {
    changeContent(initialRoute);
  }
});
