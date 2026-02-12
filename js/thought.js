// ===================================================
// THOUGHT OF THE DAY MODULE
// Theme-aware + Daily-stable fallback
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  const thoughtEl = document.querySelector("#thought-of-day p");
  if (!thoughtEl) return;

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;

  // =============================
  // THEME-SPECIFIC THOUGHT
  // =============================
  const theme = window.DATE_THEME_MAP?.[key];
  const themeThought = window.THEME_EMOTIONS?.[theme]?.thought;

  if (themeThought) {
    thoughtEl.textContent = themeThought;
    return;
  }

  // =============================
  // DAILY-STABLE FALLBACK
  // =============================
  const storageKey = `default-thought-${today.toDateString()}`;
  let saved = localStorage.getItem(storageKey);

  if (!saved && window.DEFAULT_THOUGHTS?.length) {
    const pool = window.DEFAULT_THOUGHTS;
    saved = pool[Math.floor(Math.random() * pool.length)];
    localStorage.setItem(storageKey, saved);
  }

  if (saved) {
    thoughtEl.textContent = saved;
  }

});