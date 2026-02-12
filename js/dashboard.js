// ===================================================
// DASHBOARD ORCHESTRATOR
// Responsible ONLY for bootstrapping page-level wiring
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  // Mount Timeline (if module available)
  const timelineSlot = document.getElementById("timeline-slot");

  if (timelineSlot && window.mountTimeline) {
    window.mountTimeline(timelineSlot);
  }

});