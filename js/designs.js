// ===================================================
// DESIGNS MODULE
// Handles:
// - Safety validation
// - Spotlight
// - Top 3 preview list
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // SAFETY CHECKS
  // =============================
  if (!window.DESIGN_PROJECTS || !Array.isArray(window.DESIGN_PROJECTS)) {
    console.error("DESIGN_PROJECTS is missing or invalid");
    return;
  }

  if (!window.DESIGN_BASE_PATH) {
    console.error("DESIGN_BASE_PATH is missing");
    return;
  }

  // =============================
  // SPOTLIGHT
  // =============================
  function initSpotlight() {
    const spotlightCard = document.querySelector(".spotlight");
    if (!spotlightCard || !window.SPOTLIGHT_DESIGN) return;

    const { name, folder, description } = window.SPOTLIGHT_DESIGN;

    spotlightCard.innerHTML = `
      <h2>Spotlight</h2>
      <h3>${name}</h3>
      <p>${description || "A carefully chosen design."}</p>
    `;

    spotlightCard.addEventListener("click", () => {
      window.open(
        `${window.DESIGN_BASE_PATH}${folder}/index.html`,
        "_blank"
      );
    });
  }

  // =============================
  // TOP 3 DESIGNS
  // =============================
  function initTopDesigns() {
    const container = document.querySelector(".design-links");
    if (!container) return;

    container.innerHTML = "";

    window.DESIGN_PROJECTS
      .slice(0, 3)
      .forEach(project => {
        const link = document.createElement("a");
        link.href = `${window.DESIGN_BASE_PATH}${project.folder}/index.html`;
        link.textContent = project.name;
        link.target = "_blank";
        container.appendChild(link);
      });
  }

  // Initialize
  initSpotlight();
  initTopDesigns();

});