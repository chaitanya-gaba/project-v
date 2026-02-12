// ===================================================
// THEME SYSTEM
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

// Apply date-based theme if user hasn't overridden
function applyDateThemeIfAllowed() {
  const isOverridden = localStorage.getItem(THEME_OVERRIDE_KEY);
  if (isOverridden === "true") return;

  const today = new Date();
  const key =
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  const theme = DATE_THEME_MAP[key];
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

// Manual theme selection
function initThemeControls() {
  const buttons = document.querySelectorAll(".theme-option");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      if (!theme) return;

      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(THEME_OVERRIDE_KEY, "true");
    });
  });
}

// Dropdown hover logic
function initThemeDropdown() {
  const themeDropdown = document.querySelector(".user-dropdown");
  if (!themeDropdown) return;

  let dropdownTimeout;

  themeDropdown.addEventListener("mouseenter", () => {
    clearTimeout(dropdownTimeout);
    themeDropdown.classList.add("open");
  });

  themeDropdown.addEventListener("mouseleave", () => {
    dropdownTimeout = setTimeout(() => {
      themeDropdown.classList.remove("open");
    }, 120);
  });
}

// Initialize theme system
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const isOverridden = localStorage.getItem(THEME_OVERRIDE_KEY);

  if (savedTheme && isOverridden === "true") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    applyDateThemeIfAllowed();
  }

  initThemeControls();
  initThemeDropdown();
});