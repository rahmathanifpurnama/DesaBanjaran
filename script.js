let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.querySelector(".carousel-slide");
  const totalSlides = document.querySelectorAll(".carousel-slide img").length;

  // Hitung slide baru
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

  // Geser container ke posisi yang tepat
  slides.style.transform = "translateX(" + -currentSlide * 100 + "%)";

  totalSlides.forEach((slide) => {
    totalSlides.classList.remove("active");
  });

  // 2) Tambahkan .active ke slide yang baru
  totalSlides[currentSlide].classList.add("active");
}

const track = document.getElementById("layananTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const items = document.querySelectorAll(".layanan-item");

let currentIndex = 0;
const totalItems = items.length;

function updateCarousel() {
  track.style.transform = "translateX(" + -currentIndex * 100 + "%)";
}

// Tombol Prev
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
  updateCarousel();
});

// Tombol Next
nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
  updateCarousel();
});

// Auto-slide setiap 5 detik
setInterval(() => {
  currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
  updateCarousel();
}, 5000);

function updatePaginationInfo() {
  // Ambil semua tombol halaman
  const pages = document.querySelectorAll(".pagination-page");
  // Hitung total halaman
  const totalPages = pages.length;

  // Cari halaman aktif (yang punya class 'active')
  let activeIndex = 0;
  pages.forEach((page, index) => {
    if (page.classList.contains("active")) {
      activeIndex = index; // index halaman aktif
    }
  });

  // Karena index mulai dari 0, tambahkan 1 agar halaman lebih manusiawi
  const currentPage = activeIndex + 1;

  // Update teks di paragraf .pagination-info
  const info = document.querySelector(".pagination-info");
  info.textContent = `Halaman ${currentPage} dari ${totalPages}`;
}

document.addEventListener("DOMContentLoaded", () => {
  updatePaginationInfo();

  // Event listener untuk tombol halaman
  const pageButtons = document.querySelectorAll(".pagination-page");
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      pageButtons.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      updatePaginationInfo();
    });
  });

  // Event listener untuk tombol Prev
  const prevBtn = document.querySelector(".pagination-btn.prev");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const pages = Array.from(document.querySelectorAll(".pagination-page"));
      let activeIndex = pages.findIndex((page) =>
        page.classList.contains("active")
      );
      activeIndex = activeIndex === 0 ? pages.length - 1 : activeIndex - 1;
      pages.forEach((p) => p.classList.remove("active"));
      pages[activeIndex].classList.add("active");
      updatePaginationInfo();
    });
  }

  // Event listener untuk tombol Next
  const nextBtn = document.querySelector(".pagination-btn.next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const pages = Array.from(document.querySelectorAll(".pagination-page"));
      let activeIndex = pages.findIndex((page) =>
        page.classList.contains("active")
      );
      activeIndex = activeIndex === pages.length - 1 ? 0 : activeIndex + 1;
      pages.forEach((p) => p.classList.remove("active"));
      pages[activeIndex].classList.add("active");
      updatePaginationInfo();
    });
  }

  // Event listener untuk tombol Last
  const lastBtn = document.querySelector(".pagination-btn.last");
  if (lastBtn) {
    lastBtn.addEventListener("click", () => {
      const pages = document.querySelectorAll(".pagination-page");
      pages.forEach((p) => p.classList.remove("active"));
      pages[pages.length - 1].classList.add("active");
      updatePaginationInfo();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".desa-container");
  const cardTrack = document.querySelector(".desa-track");
  const prevButton = document.querySelector(".desa-btn.prev");
  const nextButton = document.querySelector(".desa-btn.next");
  const cardItems = document.querySelectorAll(".desa-card");

  let currentCardIndex = 0;

  function updateTrackPosition() {
    const containerWidth = container.offsetWidth;
    const cardWidth = cardItems[0].offsetWidth;
    const gap = 20; // Gap antara card
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));
    const maxIndex = cardItems.length - cardsPerView;

    // Pastikan currentCardIndex dalam batas yang valid
    if (currentCardIndex < 0) currentCardIndex = 0;
    if (currentCardIndex > maxIndex) currentCardIndex = maxIndex;

    // Hitung total width dari semua card yang tersisa
    const remainingCards = cardItems.length - currentCardIndex;
    const visibleWidth = containerWidth - 40; // Kurangi padding container

    // Jika sisa card kurang dari yang bisa ditampilkan, sesuaikan posisi
    if (remainingCards * (cardWidth + gap) < visibleWidth) {
      const adjustment = visibleWidth - remainingCards * (cardWidth + gap);
      cardTrack.style.transform = `translateX(${
        -currentCardIndex * (cardWidth + gap) + adjustment
      }px)`;
    } else {
      cardTrack.style.transform = `translateX(${
        -currentCardIndex * (cardWidth + gap)
      }px)`;
    }

    cardTrack.style.transition = "transform 0.3s ease-out";
  }

  nextButton.addEventListener("click", () => {
    const containerWidth = container.offsetWidth;
    const cardWidth = cardItems[0].offsetWidth;
    const gap = 20;
    const cardsPerView = Math.floor(containerWidth / (cardWidth + gap));
    const maxIndex = cardItems.length - cardsPerView;

    if (currentCardIndex < maxIndex) {
      currentCardIndex++;
      updateTrackPosition();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      updateTrackPosition();
    }
  });

  // Update saat halaman dimuat dan diresize
  updateTrackPosition();
  window.addEventListener("resize", updateTrackPosition);
});

// Prayer times data
const prayerTimes = [
  { name: "Shubuh", time: "04:47" },
  { name: "Terbit", time: "06:06" },
  { name: "Dzuhur", time: "12:13" },
  { name: "Ashr", time: "15:20" },
  { name: "Maghrib", time: "18:20" },
  { name: "Isya", time: "19:30" },
];

// Function to render prayer times
function renderPrayerTimes() {
  const prayerGrid = document.getElementById("prayerGrid");
  const prayerFooter = document.getElementById("prayerFooter");

  // Render prayer times
  prayerTimes.forEach((prayer) => {
    const prayerItem = document.createElement("div");
    prayerItem.classList.add("prayer-item");
    prayerItem.innerHTML = `
          <div class="prayer-name">${prayer.name}</div>
          <div class="prayer-time">${prayer.time}</div>
      `;
    prayerGrid.appendChild(prayerItem);
  });

  // Render date
  const currentDate = new Date();
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("id-ID", options);

  prayerFooter.innerHTML = `
      <span>${formattedDate}</span>
  `;
}

// Call render function when page loads
document.addEventListener("DOMContentLoaded", renderPrayerTimes);
