// ===================================================
// SLIDER — MESSAGE & TIMELINE
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slider-card");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoCycleTimeouts = [];

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      slide.setAttribute("aria-hidden", i !== index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  function startAutoCycle() {
    autoCycleTimeouts.push(setTimeout(() => showSlide(1), 5000));
    autoCycleTimeouts.push(setTimeout(() => showSlide(0), 10000));
  }

  function clearAutoCycle() {
    autoCycleTimeouts.forEach(timeout => clearTimeout(timeout));
    autoCycleTimeouts = [];
  }

  // Initial state
  showSlide(0);
  startAutoCycle();

  // Button controls
  prevBtn.addEventListener("click", () => {
    clearAutoCycle();
    prevSlide();
  });

  nextBtn.addEventListener("click", () => {
    clearAutoCycle();
    nextSlide();
  });
});