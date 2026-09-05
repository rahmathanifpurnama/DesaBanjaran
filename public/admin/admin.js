const resources = {
  news: {
    title: "Berita", description: "Informasi publik dan berita unggulan.", category: "news", fields: [
      ["title", "Judul", "text", true], ["excerpt", "Ringkasan", "textarea"], ["body", "Isi berita", "textarea", true],
      ["image_key", "Gambar", "file"], ["published_at", "Tanggal terbit", "datetime-local"],
      ["is_published", "Terbitkan", "checkbox"], ["is_featured", "Tampilkan sebagai unggulan", "checkbox"],
    ], columns: ["title", "is_published", "is_featured", "published_at"]
  },
  officials: {
    title: "Aparatur Desa", description: "Nama, jabatan, foto, dan urutan tampil.", category: "officials", fields: [
      ["name", "Nama", "text", true], ["position", "Jabatan", "text", true], ["photo_key", "Foto", "file"],
      ["sort_order", "Urutan", "number", true], ["is_active", "Aktif", "checkbox"],
    ], columns: ["name", "position", "sort_order", "is_active"]
  },
  gallery: {
    title: "Galeri", description: "Foto dan video YouTube.", category: "gallery", fields: [
      ["title", "Judul", "text", true], ["media_type", "Jenis media", "select", true, [["image", "Foto"], ["youtube", "YouTube"]]],
      ["image_key", "Gambar", "file"], ["youtube_url", "Tautan YouTube HTTPS", "url"],
      ["sort_order", "Urutan", "number", true], ["is_active", "Aktif", "checkbox"],
    ], columns: ["title", "media_type", "sort_order", "is_active"]
  },
  population: {
    title: "Data Penduduk & IDM",
    description: "Jumlah penduduk dan Status Indeks Desa Membangun (IDM).",
    fields: [
      ["period", "Periode (Tahun)", "text", true],
      ["male_count", "Jumlah Pria", "number", true],
      ["female_count", "Jumlah Wanita", "number", true],
      ["idm_score", "Skor IDM Saat Ini (misal: 0.6423)", "number"],
      ["idm_minimum_score", "Skor IDM Minimal (misal: 0.7072)", "number"],
      ["idm_status", "Status IDM (misal: BERKEMBANG)", "text"],
      ["idm_target", "Target Status IDM (misal: MAJU)", "text"],
      ["is_current", "Jadikan Data Aktif Saat Ini", "checkbox"],
    ],
    columns: ["period", "male_count", "female_count", "idm_score", "idm_status", "is_current"]
  },
};

const state = { resource: "news", items: [], editing: null };
const nav = document.querySelector("#resourceNav");
const tableContainer = document.querySelector("#tableContainer");
const pageMessage = document.querySelector("#pageMessage");
const formDialog = document.querySelector("#formDialog");
const contentForm = document.querySelector("#contentForm");
const formFields = document.querySelector("#formFields");
const formMessage = document.querySelector("#formMessage");
const viewDialog = document.querySelector("#viewDialog");

async function request(path, options = {}) {
  const response = await fetch(path, options);
  const result = await response.json().catch(() => ({}));
  if (response.status === 401) {
    window.location.replace("/admin/login.html");
    throw new Error("Session berakhir.");
  }
  if (!response.ok) throw new Error(result.error || "Permintaan gagal.");
  return result;
}

function displayValue(value) {
  if (value === true) return "Ya";
  if (value === false) return "Tidak";
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string" && /^\d{4}-\d\d-\d\dT/.test(value)) return new Date(value).toLocaleString("id-ID");
  return String(value);
}

function button(label, action, id, danger = false) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = `button small${danger ? " danger" : " secondary"}`;
  element.textContent = label;
  element.dataset.action = action;
  element.dataset.id = id;
  return element;
}

function renderTable() {
  tableContainer.replaceChildren();
  if (!state.items.length) {
    tableContainer.className = "loading";
    tableContainer.textContent = "Belum ada data.";
    return;
  }
  tableContainer.className = "";
  const definition = resources[state.resource];
  const table = document.createElement("table");
  table.className = "data-table";
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  for (const column of definition.columns) {
    const cell = document.createElement("th"); cell.textContent = column.replaceAll("_", " "); headRow.append(cell);
  }
  const actionHead = document.createElement("th"); actionHead.textContent = "Tindakan"; headRow.append(actionHead); head.append(headRow);
  const body = document.createElement("tbody");
  for (const item of state.items) {
    const row = document.createElement("tr");
    for (const column of definition.columns) { const cell = document.createElement("td"); cell.textContent = displayValue(item[column]); row.append(cell); }
    const actions = document.createElement("td"); actions.className = "actions";
    actions.append(button("Lihat", "view", item.id), button("Edit", "edit", item.id), button("Hapus", "delete", item.id, true));
    row.append(actions); body.append(row);
  }
  table.append(head, body); tableContainer.append(table);
}

async function loadItems() {
  tableContainer.className = "loading"; tableContainer.textContent = "Memuat data…"; pageMessage.textContent = "";
  try { state.items = (await request(`/api/admin/${state.resource}`)).items; renderTable(); }
  catch (error) { pageMessage.textContent = error.message; }
}

function selectResource(resource) {
  state.resource = resource;
  const definition = resources[resource];
  document.querySelector("#resourceTitle").textContent = definition.title;
  document.querySelector("#resourceDescription").textContent = definition.description;
  nav.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item.dataset.resource === resource));
  loadItems();
}

function buildField([name, label, type, required, choices], value) {
  const container = document.createElement(type === "checkbox" ? "label" : "div");
  container.className = type === "checkbox" ? "check" : "field";
  let input;
  if (type === "textarea") input = document.createElement("textarea");
  else if (type === "select") {
    input = document.createElement("select");
    for (const [optionValue, optionLabel] of choices) { const option = document.createElement("option"); option.value = optionValue; option.textContent = optionLabel; input.append(option); }
  } else input = document.createElement("input");
  input.name = name; input.id = `field-${name}`;
  if (!["textarea", "select"].includes(type)) input.type = type;
  if (required && type !== "file") input.required = true;
  if (type === "number") { input.min = "0"; input.step = "any"; input.value = value ?? 0; }
  else if (type === "checkbox") input.checked = value ?? true;
  else if (type === "datetime-local" && value) input.value = new Date(value).toISOString().slice(0, 16);
  else if (type !== "file") input.value = value ?? "";
  const labelElement = document.createElement("label"); labelElement.htmlFor = input.id; labelElement.textContent = label;
  if (type === "checkbox") container.append(input, labelElement); else container.append(labelElement, input);
  if (type === "file" && value) { const note = document.createElement("small"); note.className = "muted"; note.textContent = "Kosongkan untuk mempertahankan gambar saat ini."; container.append(note); }
  return container;
}

function openForm(item = null) {
  state.editing = item;
  formMessage.textContent = ""; formFields.replaceChildren();
  document.querySelector("#formTitle").textContent = `${item ? "Edit" : "Tambah"} ${resources[state.resource].title}`;
  for (const field of resources[state.resource].fields) formFields.append(buildField(field, item?.[field[0]]));
  formDialog.showModal();
}

async function uploadSelectedFile(formData, definition) {
  const fileField = definition.fields.find((field) => field[2] === "file");
  if (!fileField) return null;
  const file = formData.get(fileField[0]);
  if (!(file instanceof File) || !file.size) return null;
  const upload = new FormData(); upload.set("file", file); upload.set("category", definition.category);
  return (await request("/api/admin/media", { method: "POST", body: upload })).key;
}

contentForm.addEventListener("submit", async (event) => {
  event.preventDefault(); formMessage.textContent = "";
  const saveButton = contentForm.querySelector('button[type="submit"]'); saveButton.disabled = true;
  let uploadedKey = null;
  try {
    const definition = resources[state.resource];
    const formData = new FormData(contentForm);
    const payload = {};
    for (const [name, , type] of definition.fields) {
      if (type === "file") payload[name] = state.editing?.[name] || null;
      else if (type === "checkbox") payload[name] = formData.has(name);
      else if (type === "number") payload[name] = Number(formData.get(name));
      else payload[name] = formData.get(name) || null;
    }
    uploadedKey = await uploadSelectedFile(formData, definition);
    const fileField = definition.fields.find((field) => field[2] === "file");
    if (uploadedKey && fileField) payload[fileField[0]] = uploadedKey;
    if (state.resource === "gallery" && payload.media_type === "youtube") payload.image_key = null;
    const path = `/api/admin/${state.resource}${state.editing ? `/${state.editing.id}` : ""}`;
    await request(path, { method: state.editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    formDialog.close(); await loadItems();
  } catch (error) {
    if (uploadedKey) await request(`/api/admin/media/${uploadedKey}`, { method: "DELETE" }).catch(() => {});
    formMessage.textContent = error.message;
  } finally { saveButton.disabled = false; }
});

function viewItem(item) {
  const list = document.createElement("dl"); list.className = "detail-list";
  for (const [key, value] of Object.entries(item)) {
    const term = document.createElement("dt"); term.textContent = key.replaceAll("_", " ");
    const detail = document.createElement("dd");
    if (key.endsWith("_key") && value) {
      const image = document.createElement("img");
      image.className = "preview-image";
      image.src = value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/") ? value : `/media/${value}`;
      image.alt = "";
      detail.append(image);
    }
    else detail.textContent = displayValue(value);
    list.append(term, detail);
  }
  document.querySelector("#viewContent").replaceChildren(list); viewDialog.showModal();
}

async function deleteItem(item) {
  if (!confirm(`Hapus “${item.title || item.name || item.period}”? Tindakan ini tidak dapat dibatalkan.`)) return;
  try { await request(`/api/admin/${state.resource}/${item.id}`, { method: "DELETE" }); await loadItems(); }
  catch (error) { pageMessage.textContent = error.message; }
}

tableContainer.addEventListener("click", (event) => {
  const action = event.target.closest("button[data-action]"); if (!action) return;
  const item = state.items.find((entry) => String(entry.id) === action.dataset.id); if (!item) return;
  if (action.dataset.action === "view") viewItem(item);
  if (action.dataset.action === "edit") openForm(item);
  if (action.dataset.action === "delete") deleteItem(item);
});

document.querySelectorAll("[data-close]").forEach((item) => item.addEventListener("click", () => formDialog.close()));
document.querySelector("[data-view-close]").addEventListener("click", () => viewDialog.close());
document.querySelector("#addButton").addEventListener("click", () => openForm());
document.querySelector("#logoutButton").addEventListener("click", async () => { await request("/api/auth/logout", { method: "POST" }); window.location.replace("/admin/login.html"); });

for (const [key, definition] of Object.entries(resources)) {
  const item = document.createElement("button"); item.type = "button"; item.dataset.resource = key; item.textContent = definition.title;
  item.addEventListener("click", () => selectResource(key)); nav.append(item);
}

try { const session = await request("/api/auth/session"); document.querySelector("#adminName").textContent = session.user.name; selectResource("news"); }
catch { /* request redirects */ }
