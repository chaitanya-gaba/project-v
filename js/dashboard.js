// ===================================================
// SAFETY CHECKS (FAIL LOUD, NOT SILENT)
// ===================================================

if (!window.DESIGN_PROJECTS || !Array.isArray(window.DESIGN_PROJECTS)) {
  console.error("DESIGN_PROJECTS is missing or invalid");
}

if (!window.DESIGN_BASE_PATH) {
  console.error("DESIGN_BASE_PATH is missing");
}

// ===================================================
// STATIC CONTENT DATA (LOCAL TO DASHBOARD)
// ===================================================

const thoughts = [
  "Love is composed of a single soul inhabiting two bodies. 💕",
  "Every moment with you feels like a dream. 🌸",
  "Romance is the art of making someone feel extraordinary. 💌"
];

const messages = [
  "Hey love, remember our first adventure? 💖",
  "You make my days brighter every day. 🌹"
];

const timeline = [
  "2026-01-01 — First meeting 💕",
  "2026-02-05 — Project-V created ❤️"
];

// ===================================================
// DATE → THEME MAP
// ===================================================

const DATE_THEME_MAP = {
  "02-07": "rose-day",
  "02-08": "propose-day",
  "02-09": "chocolate-day",
  "02-10": "teddy-day",
  "02-11": "promise-day",
  "02-12": "hug-day",
  "02-13": "kiss-day",
  "02-14": "valentine-day"
};

const THEME_STORAGE_KEY = "pv-theme";
const THEME_OVERRIDE_KEY = "pv-theme-override";

// ===================================================
// APPLY DATE-BASED THEME
// ===================================================

function applyDateThemeIfAllowed() {
  const isOverridden = localStorage.getItem(THEME_OVERRIDE_KEY);

  if (isOverridden === "true") return;

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const key = `${month}-${day}`;
  const theme = DATE_THEME_MAP[key];

  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// ===================================================
// USER THEME SELECTION
// ===================================================

function initThemeControls() {
  const buttons = document.querySelectorAll(".theme-option");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      if (!theme) return;

      document.documentElement.classList.add("theme-transition");
      document.documentElement.setAttribute("data-theme", theme);

      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(THEME_OVERRIDE_KEY, "true");

      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 300);
    });
  });
}

// ===================================================
// INITIAL THEME RESOLUTION
// ===================================================

(function initThemeSystem() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const isOverridden = localStorage.getItem(THEME_OVERRIDE_KEY);

  if (savedTheme && isOverridden === "true") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    applyDateThemeIfAllowed();
  }

  initThemeControls();
})();

// ===================================================
// OPTIONAL: RESET TO AUTO THEME (FUTURE USE)
// ===================================================
// You can later add a button that calls this:
//
// localStorage.removeItem(THEME_OVERRIDE_KEY);
// localStorage.removeItem(THEME_STORAGE_KEY);
// location.reload();

// ===================================================
// HELPER — DAILY KEY
// ===================================================

function getTodayKey(prefix) {
  const today = new Date().toISOString().split("T")[0];
  return `${prefix}-${today}`;
}

// ===================================================
// THOUGHT OF THE DAY (DATE + THEME AWARE)
// ===================================================

(function initThoughtOfDay() {
  const thoughtEl = document.querySelector("#thought-of-day p");
  if (!thoughtEl) return;

  const today = new Date();
  const key =
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  const theme = window.DATE_THEME_MAP?.[key];
  const themeThought = window.THEME_EMOTIONS?.[theme]?.thought;

  if (themeThought) {
    thoughtEl.textContent = themeThought;
    return;
  }

  // fallback (random, daily-stable)
  const storageKey = `default-thought-${today.toDateString()}`;
  let saved = localStorage.getItem(storageKey);

  if (!saved) {
    const pool = window.DEFAULT_THOUGHTS;
    saved = pool[Math.floor(Math.random() * pool.length)];
    localStorage.setItem(storageKey, saved);
  }

  thoughtEl.textContent = saved;
})();

// ===================================================
// ROW 2 — TOP 3 DESIGNS (AUTO FROM DATA)
// ===================================================

// ===================================================
// SPOTLIGHT — SINGLE FEATURED DESIGN
// ===================================================

(function initSpotlight() {
  const spotlightCard = document.querySelector(".spotlight");
  if (!spotlightCard || !window.SPOTLIGHT_DESIGN) return;

  const { name, folder, description } = window.SPOTLIGHT_DESIGN;

  spotlightCard.innerHTML = `
    <h2>Spotlight</h2>
    <h3>${name}</h3>
    <p>${description || "A carefully chosen design."}</p>
  `;

  spotlightCard.style.cursor = "pointer";

  spotlightCard.addEventListener("click", () => {
    window.open(
      `${window.DESIGN_BASE_PATH}${folder}/index.html`,
      "_blank"
    );
  });
})();

(function initTopDesigns() {
  const container = document.querySelector(".design-links");
  if (!container) return;

  container.innerHTML = "";

  window.DESIGN_PROJECTS.slice(0, 3).forEach(project => {
    const link = document.createElement("a");
    link.href = `${window.DESIGN_BASE_PATH}${project.folder}/index.html`;
    link.textContent = project.name;
    link.target = "_blank";
    container.appendChild(link);
  });
})();

// ===================================================
// MODAL — ALL DESIGNS
// ===================================================

(function initDesignModal() {
  const modal = document.getElementById("designs-modal");
  const list = modal?.querySelector(".modal-design-list");
  const openBtn = document.querySelector(".open-designs-btn");
  const closeBtn = modal?.querySelector(".close-modal");

  if (!modal || !list || !openBtn || !closeBtn) return;

  list.innerHTML = "";

  window.DESIGN_PROJECTS.forEach(project => {
    const link = document.createElement("a");
    link.href = `${window.DESIGN_BASE_PATH}${project.folder}/index.html`;
    link.textContent = project.name;
    link.target = "_blank";
    list.appendChild(link);
  });

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
})();

// ===================================================
// ROW 3 — MESSAGE & TIMELINE CONTENT
// ===================================================

// ===================================================
// MESSAGE (DATE + THEME AWARE)
// ===================================================

(function initMessage() {
  const msgEl = document.getElementById("message-text");
  if (!msgEl) return;

  const today = new Date();
  const key =
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  const theme = window.DATE_THEME_MAP?.[key];
  const themeMessage = window.THEME_EMOTIONS?.[theme]?.message;

  if (themeMessage) {
    msgEl.textContent = themeMessage;
    return;
  }

  // fallback (rotating but calm)
  const pool = window.DEFAULT_MESSAGES;
  const index = today.getDate() % pool.length;
  msgEl.textContent = pool[index];
})();

(function initTimeline() {
  const timelineEl = document.getElementById("timeline-text");
  if (!timelineEl) return;

  timelineEl.innerHTML = timeline.join("<br>");
})();

// ===================================================
// ROW 3 — SLIDER (ONE VISIBLE, AUTO HEIGHT)
// ===================================================

(function initSlider() {
  const slides = document.querySelectorAll(".slider-card");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      slide.setAttribute("aria-hidden", i !== index);
    });
    currentIndex = index;
  }

  // Initial state
  showSlide(0);

  prevBtn.addEventListener("click", () => {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  });

  nextBtn.addEventListener("click", () => {
    showSlide((currentIndex + 1) % slides.length);
  });

  // One-time auto cycle
  setTimeout(() => showSlide(1), 5000);
  setTimeout(() => showSlide(0), 10000);
})();

// ===================================================
// THEMES (PERSISTENT)
// ===================================================

(function initThemes() {
  const buttons = document.querySelectorAll(".theme-option");
  if (!buttons.length) return;

  const savedTheme = localStorage.getItem("pv-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      if (!theme) return;

      document.documentElement.classList.add("theme-transition");
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("pv-theme", theme);

      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 300);
    });
  });
})();

// ===================================================
// LAUNCH COUNTDOWN GATE
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  const launchDate = new Date("2026-02-07T00:00:00").getTime();
  const overlay = document.getElementById("launch-overlay");

  if (!overlay) return;

  document.body.classList.add("launch-locked");

  function updateCountdown() {
    const now = Date.now();
    const diff = launchDate - now;

    if (diff <= 0) {
      document.body.classList.remove("launch-locked");
      overlay.remove();
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
});