// ===================================================
// MESSAGE MODULE
// Theme-aware + rotating fallback
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  const msgEl = document.getElementById("message-text");
  if (!msgEl) return;

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const key = `${month}-${day}`;

  // =============================
  // THEME-SPECIFIC MESSAGE
  // =============================
  const theme = window.DATE_THEME_MAP?.[key];
  const themeMessage = window.THEME_EMOTIONS?.[theme]?.message;

  if (themeMessage) {
    msgEl.textContent = themeMessage;
    return;
  }

  // =============================
  // ROTATING FALLBACK MESSAGE
  // =============================
  if (window.DEFAULT_MESSAGES?.length) {
    const pool = window.DEFAULT_MESSAGES;
    const index = today.getDate() % pool.length;
    msgEl.textContent = pool[index];
  }

});