import { calculatePrayerTimes, formatPrayerTime, jakartaDateParts } from "./prayer-times.js";

class Rotator {
  constructor({ root, viewport, track, previous, next, interval = 5000 }) {
    this.root = root;
    this.viewport = viewport || root;
    this.track = track;
    this.previous = previous;
    this.next = next;
    this.interval = interval;
    this.index = 0;
    this.timer = null;
    this.onPrevious = () => this.move(-1);
    this.onNext = () => this.move(1);
    this.onResize = () => this.render();
    previous?.addEventListener("click", this.onPrevious);
    next?.addEventListener("click", this.onNext);
    window.addEventListener("resize", this.onResize);
    root.addEventListener("mouseenter", () => this.stop());
    root.addEventListener("mouseleave", () => this.start());
    root.addEventListener("focusin", () => this.stop());
    root.addEventListener("focusout", () => this.start());
    this.render();
    this.start();
  }

  items() {
    return [...this.track.children];
  }

  maximumIndex() {
    const items = this.items();
    if (!items.length) return 0;
    const firstWidth = items[0].getBoundingClientRect().width || 1;
    const gap = Number.parseFloat(getComputedStyle(this.track).gap) || 0;
    const visible = Math.max(1, Math.floor((this.viewport.clientWidth + gap) / (firstWidth + gap)));
    return Math.max(0, items.length - visible);
  }

  move(direction) {
    const maximum = this.maximumIndex();
    this.index =
      direction > 0
        ? this.index >= maximum
          ? 0
          : this.index + 1
        : this.index <= 0
        ? maximum
        : this.index - 1;
    this.render();
    this.start();
  }

  render() {
    const items = this.items();
    if (!items.length) return;
    this.index = Math.min(this.index, this.maximumIndex());
    const offset = items[this.index].offsetLeft - items[0].offsetLeft;
    this.track.style.transform = `translateX(${-offset}px)`;
  }

  start() {
    this.stop();
    if (this.maximumIndex() > 0) this.timer = setInterval(() => this.move(1), this.interval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

function initializeRotators() {
  const definitions = [
    {
      root: document.querySelector(".carousel"),
      track: document.querySelector(".carousel-slide"),
      previous: document.querySelector(".carousel-button.prev"),
      next: document.querySelector(".carousel-button.next"),
    },
    {
      root: document.querySelector(".layanan-container"),
      track: document.querySelector(".layanan-track"),
      previous: document.querySelector(".layanan-prev-btn"),
      next: document.querySelector(".layanan-next-btn"),
    },
    {
      root: document.querySelector(".desa-container"),
      viewport: document.querySelector(".desa-wrapper"),
      track: document.querySelector(".desa-track"),
      previous: document.querySelector(".desa-btn.prev"),
      next: document.querySelector(".desa-btn.next"),
    },
  ];
  for (const definition of definitions) {
    if (definition.root && definition.track) new Rotator(definition);
  }
}

const PRAYER_NAMES = [
  ["fajr", "Subuh"],
  ["sunrise", "Terbit"],
  ["dhuhr", "Dzuhur"],
  ["asr", "Ashar"],
  ["maghrib", "Maghrib"],
  ["isha", "Isya"],
];

function renderPrayerTimes() {
  const grid = document.querySelector("#prayerGrid");
  if (!grid) return;
  const date = jakartaDateParts();
  const times = calculatePrayerTimes(date, -5.62087, 105.11417, 7);
  grid.replaceChildren(
    ...PRAYER_NAMES.map(([key, label]) => {
      const item = document.createElement("div");
      item.className = "prayer-item";
      const name = document.createElement("div");
      name.className = "prayer-name";
      name.textContent = label;
      const time = document.createElement("div");
      time.className = "prayer-time";
      time.textContent = formatPrayerTime(times[key]);
      item.append(name, time);
      return item;
    })
  );
}

function startRealtimeClock() {
  const footer = document.querySelector("#prayerFooter");
  if (!footer) return;

  function update() {
    const now = new Date();
    const timeFormatted = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(now);
    const dateFormatted = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(now);
    footer.innerHTML = `<strong>${timeFormatted} WIB</strong> &bull; <span>${dateFormatted}</span>`;
  }

  update();
  setInterval(update, 1000);
}

renderPrayerTimes();
startRealtimeClock();
setInterval(renderPrayerTimes, 60 * 60 * 1000);

await (window.contentReady || Promise.resolve());
initializeRotators();
