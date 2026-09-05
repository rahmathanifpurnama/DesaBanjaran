import { HttpError } from "./http.js";

const text = (label, minimum, maximum, { optional = false } = {}) => (value) => {
  if (optional && (value === undefined || value === null || value === "")) return "";
  if (typeof value !== "string") throw new HttpError(400, `${label} wajib diisi.`);
  const normalized = value.trim();
  if (normalized.length < minimum || normalized.length > maximum) {
    throw new HttpError(400, `${label} harus terdiri dari ${minimum}–${maximum} karakter.`);
  }
  return normalized;
};

const integer = (label, minimum = 0) => (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < minimum) throw new HttpError(400, `${label} tidak valid.`);
  return parsed;
};

const boolean = (value) => value === true || value === "true" || value === 1;
const nullableKey = (value) => (typeof value === "string" && value.trim() ? value.trim() : null);

const url = (label, { youtube = false } = {}) => (value) => {
  const normalized = text(label, 8, 2000)(value);
  let parsed;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new HttpError(400, `${label} tidak valid.`);
  }
  if (parsed.protocol !== "https:") throw new HttpError(400, `${label} harus menggunakan HTTPS.`);
  if (youtube && !["youtube.com", "www.youtube.com", "youtu.be"].includes(parsed.hostname)) {
    throw new HttpError(400, "Video harus berasal dari YouTube.");
  }
  return parsed.toString();
};

const resources = {
  news: {
    table: "news",
    fields: {
      title: text("Judul", 3, 180),
      excerpt: text("Ringkasan", 0, 500, { optional: true }),
      body: text("Isi berita", 3, 20_000),
      image_key: nullableKey,
      is_published: boolean,
      is_featured: boolean,
      published_at: (value) => (value ? new Date(value).toISOString() : null),
    },
    order: "is_featured DESC, COALESCE(published_at, created_at) DESC, id DESC",
    mediaField: "image_key",
  },
  officials: {
    table: "officials",
    fields: {
      name: text("Nama", 2, 120),
      position: text("Jabatan", 2, 160),
      photo_key: nullableKey,
      sort_order: integer("Urutan"),
      is_active: boolean,
    },
    order: "sort_order ASC, id ASC",
    mediaField: "photo_key",
  },
  gallery: {
    table: "gallery",
    fields: {
      title: text("Judul", 2, 180),
      media_type: (value) => {
        if (!["image", "youtube"].includes(value)) throw new HttpError(400, "Jenis galeri tidak valid.");
        return value;
      },
      image_key: nullableKey,
      youtube_url: (value) => (value ? url("Tautan YouTube", { youtube: true })(value) : null),
      sort_order: integer("Urutan"),
      is_active: boolean,
    },
    order: "sort_order ASC, id DESC",
    mediaField: "image_key",
  },
  population: {
    table: "population",
    fields: {
      period: text("Periode", 4, 30),
      male_count: integer("Jumlah pria"),
      female_count: integer("Jumlah wanita"),
      idm_score: (value) => (value !== undefined && value !== null && value !== "" ? Number(value) : 0.6423),
      idm_minimum_score: (value) => (value !== undefined && value !== null && value !== "" ? Number(value) : 0.7072),
      idm_status: text("Status IDM", 2, 50, { optional: true }),
      idm_target: text("Target Status", 2, 50, { optional: true }),
      is_current: boolean,
    },
    order: "is_current DESC, period DESC, id DESC",
  },
  services: {
    table: "citizen_services",
    fields: {
      name: text("Nama layanan", 2, 160),
      destination_url: url("Tautan tujuan"),
      icon_key: nullableKey,
      sort_order: integer("Urutan"),
      is_active: boolean,
    },
    order: "sort_order ASC, id ASC",
    mediaField: "icon_key",
  },
  locations: {
    table: "village_locations",
    fields: {
      title: text("Judul lokasi", 2, 160),
      embed_url: url("Tautan sematan peta"),
      sort_order: integer("Urutan"),
      is_active: boolean,
    },
    order: "sort_order ASC, id ASC",
  },
};

function definitionFor(resource) {
  const definition = resources[resource];
  if (!definition) throw new HttpError(404, "Jenis konten tidak ditemukan.");
  return definition;
}

function validate(definition, input, partial = false) {
  const output = {};
  for (const [field, validator] of Object.entries(definition.fields)) {
    if (partial && !(field in input)) continue;
    if (!partial && !(field in input)) {
      if (["excerpt", "image_key", "photo_key", "youtube_url", "icon_key", "published_at"].includes(field)) continue;
      throw new HttpError(400, `${field} wajib diisi.`);
    }
    output[field] = validator(input[field]);
  }
  if (!Object.keys(output).length) throw new HttpError(400, "Tidak ada perubahan yang dikirim.");
  return output;
}

function slugify(title) {
  const base = title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120) || "berita";
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

function placeholders(values, offset = 1) {
  return values.map((_, index) => `$${index + offset}`).join(", ");
}

export function createPublishingModule(database, media) {
  return {
    async list(resource) {
      const definition = definitionFor(resource);
      return database.query(`SELECT * FROM ${definition.table} ORDER BY ${definition.order}`);
    },

    async create(resource, input) {
      const definition = definitionFor(resource);
      const values = validate(definition, input);
      if (resource === "news") values.slug = slugify(values.title);
      if (resource === "population" && values.is_current) {
        await database.query("UPDATE population SET is_current = FALSE WHERE is_current = TRUE");
      }
      const columns = Object.keys(values);
      const result = await database.query(
        `INSERT INTO ${definition.table} (${columns.join(", ")}) VALUES (${placeholders(columns)}) RETURNING *`,
        columns.map((column) => values[column]),
      );
      return result[0];
    },

    async update(resource, id, input) {
      const definition = definitionFor(resource);
      const values = validate(definition, input, true);
      let previousMediaKey = null;
      if (definition.mediaField && definition.mediaField in values) {
        const current = await database.query(`SELECT ${definition.mediaField} FROM ${definition.table} WHERE id = $1`, [id]);
        previousMediaKey = current[0]?.[definition.mediaField] || null;
      }
      if (resource === "population" && values.is_current) {
        await database.query("UPDATE population SET is_current = FALSE WHERE is_current = TRUE AND id <> $1", [id]);
      }
      const columns = Object.keys(values);
      const assignments = columns.map((column, index) => `${column} = $${index + 1}`);
      assignments.push("updated_at = NOW()");
      const result = await database.query(
        `UPDATE ${definition.table} SET ${assignments.join(", ")} WHERE id = $${columns.length + 1} RETURNING *`,
        [...columns.map((column) => values[column]), id],
      );
      if (!result[0]) throw new HttpError(404, "Konten tidak ditemukan.");
      if (previousMediaKey && previousMediaKey !== result[0][definition.mediaField]) await media.remove(previousMediaKey);
      return result[0];
    },

    async remove(resource, id) {
      const definition = definitionFor(resource);
      const result = await database.query(`DELETE FROM ${definition.table} WHERE id = $1 RETURNING *`, [id]);
      if (!result[0]) throw new HttpError(404, "Konten tidak ditemukan.");
      if (definition.mediaField && result[0][definition.mediaField]) await media.remove(result[0][definition.mediaField]);
      return result[0];
    },

    async publicContent() {
      const [news, officials, gallery, population, services, locations] = await Promise.all([
        database.query("SELECT * FROM news WHERE is_published = TRUE ORDER BY is_featured DESC, COALESCE(published_at, created_at) DESC LIMIT 30"),
        database.query("SELECT * FROM officials WHERE is_active = TRUE ORDER BY sort_order, id"),
        database.query("SELECT * FROM gallery WHERE is_active = TRUE ORDER BY sort_order, id DESC"),
        database.query("SELECT *, male_count + female_count AS total_count FROM population WHERE is_current = TRUE LIMIT 1"),
        database.query("SELECT * FROM citizen_services WHERE is_active = TRUE ORDER BY sort_order, id"),
        database.query("SELECT * FROM village_locations WHERE is_active = TRUE ORDER BY sort_order, id"),
      ]);
      return { news, officials, gallery, population: population[0] || null, services, locations };
    },

    async publicNews(id) {
      const result = await database.query("SELECT * FROM news WHERE id = $1 AND is_published = TRUE LIMIT 1", [id]);
      if (!result[0]) throw new HttpError(404, "Berita tidak ditemukan.");
      return result[0];
    },
  };
}
