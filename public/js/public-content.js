const mediaUrl = (key) => {
  if (!key) return "";
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/") || key.startsWith("assets/")) {
    return key;
  }
  return `/media/${encodeURI(key)}`;
};

const contentReady = fetch("/api/public/content")
  .then(async (response) => {
    if (!response.ok) throw new Error("Data dinamis belum tersedia.");
    return response.json();
  })
  .then(renderContent)
  .catch((error) => console.warn(error.message));
window.contentReady = contentReady;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderNews(news) {
  if (!news?.length) return;
  const featured = news.filter((item) => item.is_featured && item.image_key);
  const slides = featured.length ? featured : news.filter((item) => item.image_key).slice(0, 5);
  const track = document.querySelector(".carousel-slide");
  if (track && slides.length) {
    track.replaceChildren(
      ...slides.map((item) => {
        const card = element("div", "carousel-item");
        const link = element("a");
        link.href = `/news.html?id=${item.id}`;
        const image = element("img");
        image.src = mediaUrl(item.image_key);
        image.alt = item.title;
        const caption = element("div", "carousel-caption");
        caption.append(element("h3", "", item.title));
        link.append(image, caption);
        card.append(link);
        return card;
      })
    );
  }
  const articles = document.querySelector(".articles");
  if (articles) {
    articles.replaceChildren(
      ...news.slice(0, 10).map((item) => {
        const link = element("a");
        link.href = `/news.html?id=${item.id}`;
        const article = element("article");
        if (item.image_key) {
          const image = element("img");
          image.src = mediaUrl(item.image_key);
          image.alt = item.title;
          article.append(image);
        }
        article.append(element("h3", "", item.title), element("p", "", item.excerpt || ""));
        link.append(article);
        return link;
      })
    );
  }
}

function renderOfficials(items) {
  const track = document.querySelector(".desa-track");
  if (!track || !items?.length) return;
  track.replaceChildren(
    ...items.map((item) => {
      const card = element("div", "desa-card");
      if (item.photo_key) {
        const image = element("img");
        image.src = mediaUrl(item.photo_key);
        image.alt = `Foto ${item.name}`;
        card.append(image);
      }
      card.append(element("h4", "", item.name), element("p", "", item.position));
      return card;
    })
  );
}

function youtubeEmbed(value) {
  try {
    const url = new URL(value);
    const id =
      url.hostname === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v") || url.pathname.split("/").pop();
    return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
  } catch {
    return null;
  }
}

function renderGallery(items) {
  const grid = document.querySelector(".galeri-grid");
  if (!grid || !items?.length) return;
  grid.replaceChildren(
    ...items.map((item) => {
      const card = element("div", "galeri-item");
      if (item.media_type === "image" && item.image_key) {
        const image = element("img");
        image.src = mediaUrl(item.image_key);
        image.alt = item.title;
        card.append(image);
      } else {
        const source = youtubeEmbed(item.youtube_url);
        if (source) {
          const frame = element("iframe");
          frame.src = source;
          frame.title = item.title;
          frame.loading = "lazy";
          frame.allowFullscreen = true;
          card.append(frame);
        }
      }
      return card;
    })
  );
}

function renderPopulation(item) {
  if (!item) return;
  const counts = document.querySelectorAll(".penduduk-box .jumlah");
  if (counts.length >= 3) {
    [item.male_count, item.female_count, item.total_count].forEach((value, index) => {
      counts[index].textContent = Number(value).toLocaleString("id-ID");
    });
  }

  const score = item.idm_score != null ? item.idm_score : "0.6423";
  const minScore = item.idm_minimum_score != null ? item.idm_minimum_score : "0.7072";
  const status = String(item.idm_status || "BERKEMBANG").toUpperCase();
  const target = String(item.idm_target || "MAJU").toUpperCase();

  const idmTemplate = `
  <div class="main-container">
      <div class="left-content">
          <div class="idm-container">
              <div class="idm-status">
                  <h1>Status Index Desa Membangun (IDM)</h1>
              
              <!-- Location Cards Grid -->
              <div class="idm-location-grid">
                  <div class="idm-card provinsi">
                      <span>PROVINSI</span>
                      <h3>LAMPUNG</h3>
                  </div>
                  <div class="idm-card kabupaten">
                      <span>KABUPATEN / KOTA</span>
                      <h3>PESAWARAN</h3>
                  </div>
                  <div class="idm-card kecamatan">
                      <span>KECAMATAN</span>
                      <h3>PADANG CERMIN</h3>
                  </div>
                  <div class="idm-card kelurahan">
                      <span>KELURAHAN / DESA</span>
                      <h3>BANJARAN</h3>
                  </div>
              </div>
              
              <!-- Status Cards Grid -->
              <div class="idm-status-grid">
                  <div class="idm-card skor-current">
                      <span>SKOR IDM SAAT INI</span>
                      <h3>${score}</h3>
                  </div>
                  <div class="idm-card skor-minimal">
                      <span>SKOR IDM MINIMAL</span>
                      <h3>${minScore}</h3>
                  </div>
                  <div class="idm-card status-idm">
                      <span>STATUS IDM</span>
                      <h3>${status}</h3>
                  </div>
                  <div class="idm-card target-status">
                      <span>TARGET STATUS</span>
                      <h3>${target}</h3>
                  </div>
              </div>
            </div>
          </div>
    </div>
  </div>`;

  if (typeof pageContents !== "undefined") {
    pageContents["idm"] = idmTemplate;
  }
  if (window.location.hash === "#idm") {
    const mainContent = document.querySelector(".main-container .left-content");
    if (mainContent) {
      mainContent.innerHTML = idmTemplate;
    }
  }
}

function renderContent(data) {
  renderNews(data.news);
  renderOfficials(data.officials);
  renderGallery(data.gallery);
  renderPopulation(data.population);
}
