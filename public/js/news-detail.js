const container = document.querySelector("#newsDetail");
const id = new URLSearchParams(location.search).get("id");

function showError(message) { container.replaceChildren(); const text = document.createElement("p"); text.textContent = message; container.append(text); }

if (!/^\d+$/.test(id || "")) showError("Berita tidak ditemukan.");
else {
  fetch(`/api/public/news/${id}`).then(async (response) => {
    const result = await response.json(); if (!response.ok) throw new Error(result.error || "Berita tidak ditemukan."); return result;
  }).then((news) => {
    document.title = `${news.title} — Desa Banjaran`; container.replaceChildren();
    const article = document.createElement("article"); article.className = "page-content news-detail";
    const title = document.createElement("h1"); title.textContent = news.title; article.append(title);
    if (news.published_at) { const date = document.createElement("time"); date.textContent = new Date(news.published_at).toLocaleDateString("id-ID", { dateStyle: "long" }); article.append(date); }
    if (news.image_key) {
      const image = document.createElement("img");
      image.src = news.image_key.startsWith("http://") || news.image_key.startsWith("https://") || news.image_key.startsWith("/") ? news.image_key : `/media/${encodeURI(news.image_key)}`;
      image.alt = news.title;
      article.append(image);
    }
    const body = document.createElement("div"); body.className = "news-body"; body.textContent = news.body; article.append(body); container.append(article);
  }).catch((error) => showError(error.message));
}
