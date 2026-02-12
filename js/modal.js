// ===================================================
// MODAL — ALL DESIGNS
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("designs-modal");
  const openBtn = document.querySelector(".open-designs-btn");
  const closeBtn = modal?.querySelector(".close-modal");
  const list = modal?.querySelector(".modal-design-list");

  if (!modal || !openBtn || !closeBtn || !list) return;

  // Populate modal with all designs
  if (window.DESIGN_PROJECTS && window.DESIGN_BASE_PATH) {
    list.innerHTML = "";

    window.DESIGN_PROJECTS.forEach(project => {
      const link = document.createElement("a");
      link.href = `${window.DESIGN_BASE_PATH}${project.folder}/index.html`;
      link.textContent = project.name;
      link.target = "_blank";
      list.appendChild(link);
    });
  }

  // Open modal
  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  });

  // Close modal (X button)
  closeBtn.addEventListener("click", () => {
    closeModal();
  });

  // Close on overlay click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
});