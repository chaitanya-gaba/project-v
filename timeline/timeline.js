console.log("timeline.js loaded");

function mountTimeline(wrapper) {
  console.log("mountTimeline called", wrapper);
  wrapper.className = "timeline";

  // ================= HELPERS =================
  function createNode(leftPercent, topPx, item, isInfinity = false, isExpanded = false) {
    const node = document.createElement("div");
    node.className = `timeline-node${isInfinity ? " infinity" : ""}`;
    node.style.left = `${leftPercent}%`;
    node.style.top = `${topPx}px`;

    if (isInfinity) {
      node.innerHTML = `<div class="emoji">∞</div>`;
    } else {
      node.innerHTML = `
        <div class="emoji">${item.emoji}</div>
        <div class="content">
          <div class="date">${item.date}</div>
          <div class="text">${item.text}</div>
        </div>
      `;
    }

    return node;
  }

  // ================= COLLAPSED TIMELINE =================
  const collapsedTimeline = document.createElement("div");
  collapsedTimeline.className = "timeline collapsed";

  const collapsedRow = document.createElement("div");
  collapsedRow.className = "timeline-row";

  const collapsedSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  collapsedSVG.setAttribute("viewBox", "0 0 1000 120");
  collapsedSVG.setAttribute("preserveAspectRatio", "none");
  collapsedSVG.classList.add("thread-svg");

  const collapsedPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  collapsedPath.classList.add("thread-path");
  collapsedPath.setAttribute("d", "M50 60 L950 60");
  collapsedSVG.appendChild(collapsedPath);

  collapsedRow.appendChild(collapsedSVG);
  const pathY = 60; // path vertical position
  const nodeOffset = 10; // half the approximate node height, so node centers on path

  collapsedRow.appendChild(createNode(5, pathY - nodeOffset, TIMELINE_DATA[0]));
  collapsedRow.appendChild(createNode(50, pathY - nodeOffset, TIMELINE_DATA[TIMELINE_DATA.length - 1]));
  collapsedRow.appendChild(createNode(95, pathY - nodeOffset, null, true));

  collapsedTimeline.appendChild(collapsedRow);
  wrapper.appendChild(collapsedTimeline);

  // ================= EXPANDED TIMELINE =================
  const expandedTimeline = document.createElement("div");
  expandedTimeline.className = "timeline expanded";
  expandedTimeline.style.display = "none";
  expandedTimeline.style.position = "relative";

  const rowHeight = 120;
  const nodeMarginTop = 36;

  let pathD = "";
  let coordinates = [];
  let y = nodeMarginTop;
  let rowRight = true; // alternate rows
  let i = 0;

  // ----------------- helper to inset nodes -----------------
  function randomInset(x, min=50, max=950) {
    const offset = Math.floor(Math.random() * 40) - 20; // ±20px
    return Math.max(min, Math.min(max, x + offset));
  }

  // ----------------- build zig-zag -----------------
  while (i < TIMELINE_DATA.length) {
    const rowCount = Math.random() < 0.5 ? 1 : 2;
    const rowItems = TIMELINE_DATA.slice(i, i + rowCount);
    i += rowItems.length;

    let xPositions = [];
    if (rowCount === 1) {
      const baseX = rowRight ? 800 : 200;
      xPositions = [randomInset(baseX)];
    } else {
      let first = 200, second = 800;
      if (!rowRight) [first, second] = [second, first];
      xPositions = [randomInset(first), randomInset(second)];
    }

    // horizontal path through the same positions
    if (rowCount === 1) {
      const x = xPositions[0];
      if (pathD === "") pathD = `M${x} ${y}`;
      else pathD += ` L${x} ${y}`;
      coordinates.push({ x, y, item: rowItems[0] });
    } else {
      const xStart = xPositions[0];
      const xEnd = xPositions[1];
      if (pathD === "") pathD = `M${xStart} ${y}`;
      else pathD += ` L${xStart} ${y}`;
      pathD += ` L${xEnd} ${y}`;
      rowItems.forEach((item, idx) => {
        coordinates.push({ x: xPositions[idx], y, item });
      });
    }

    // vertical drop
    if (i < TIMELINE_DATA.length) {
      const lastX = xPositions[xPositions.length - 1];
      const nextY = y + rowHeight;
      pathD += ` L${lastX} ${nextY}`;
      y += rowHeight;
      rowRight = !rowRight; // flip for zig-zag
    }
  }

  // ----------------- infinity node -----------------
  y += rowHeight / 1;
  const infinityX = randomInset(rowRight ? 800 : 200);
  pathD += ` L${infinityX} ${y}`;
  coordinates.push({ x: infinityX, y, item: null, infinity: true });

  const totalHeight = y + 60;
  expandedTimeline.style.height = `${totalHeight}px`;

  // ----------------- create SVG -----------------
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 1000 ${totalHeight}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.classList.add("thread-svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.classList.add("thread-path");
  path.setAttribute("d", pathD);
  svg.appendChild(path);
  expandedTimeline.appendChild(svg);

  // ----------------- add nodes -----------------
  coordinates.forEach(coord => {
    const leftPercent = (coord.x / 1000) * 100;
    const node = createNode(leftPercent, coord.y, coord.item, coord.infinity, true);
    expandedTimeline.appendChild(node);
  });

  wrapper.appendChild(expandedTimeline);

  // ================= BUTTON =================
  const btn = document.createElement("button");
  btn.className = "expand-btn";
  btn.textContent = "Expand journey";

  let isExpanded = false;
  btn.onclick = () => {
    isExpanded = !isExpanded;
    collapsedTimeline.style.display = isExpanded ? "none" : "block";
    expandedTimeline.style.display = isExpanded ? "block" : "none";
    btn.textContent = isExpanded ? "Collapse journey" : "Expand journey";
  };
  wrapper.after(btn);
}

// expose globally
window.mountTimeline = mountTimeline;