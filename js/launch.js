// ===================================================
// LAUNCH MODULE
// Countdown Gate System
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.getElementById("launch-overlay");
  if (!overlay) return;

  const launchDate = new Date("2026-02-07T00:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  document.body.classList.add("launch-locked");

  function updateCountdown() {
    const now = Date.now();
    const diff = launchDate - now;

    // If launch reached
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

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

});