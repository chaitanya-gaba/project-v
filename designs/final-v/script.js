// ==============================
// PAGE ELEMENTS
// ==============================
const pages = {
  page1: document.getElementById("page1"),
  page2: document.getElementById("page2"),
  page3: document.getElementById("page3"),
  page4: document.getElementById("page4"),
  page5: document.getElementById("page5"),
  page6: document.getElementById("page6"),
};

const heart = document.getElementById("click-heart");
const clapperboard = document.getElementById("clapperboard");
const avatar = document.getElementById("taehyung-avatar");
const umbrella = document.getElementById("umbrella");
const secretMessage = document.getElementById("secret-message");
const memories = document.querySelectorAll(".memory");
const memoryMessage = document.getElementById("memory-message");

// ==============================
// PAGE SWITCH
// ==============================
function goToPage(currentPage, nextPage, delay = 0.5) {
  currentPage.classList.remove("active");
  setTimeout(() => nextPage.classList.add("active"), delay * 1000);
}

// ==============================
// PAGE 1
// ==============================
heart.addEventListener("click", () => {
  // Switch to Page 2
  goToPage(pages.page1, pages.page2, 0.3);

  // Start golden beams
  setTimeout(() => startGoldenBeams(), 400);

  // Reveal paragraph
  setTimeout(() => {
    const para = document.querySelector("#page2 .cinematic-text");
    para.classList.add("reveal");
  }, 700);

  // Play audio safely
  setTimeout(() => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.volume = 0.6; // soft romantic background
      audio.play().catch(err => {
        console.log("Audio play blocked by browser:", err);
      });
    }
  }, 600);
});

setTimeout(() => {
  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.play().catch(err => {
      console.log("Audio play blocked by browser:", err);
    });
  }
}, 600);

const audio = document.getElementById("bg-music");
if (audio) {
  audio.volume = 0;
  audio.play().catch(() => {});
  let vol = 0;
  const fade = setInterval(() => {
    vol += 0.02;
    audio.volume = Math.min(vol, 0.6);
    if (vol >= 0.6) clearInterval(fade);
  }, 100);
}

setTimeout(() => {
  const text = document.querySelector("#page2 .focus-in");
  text.style.animation = "none";
  text.offsetHeight; // force reflow
  text.style.animation = "focusReveal 2s ease forwards";
}, 600);

// ==============================
// PAGE 2 → PAGE 3
// ==============================
clapperboard.addEventListener("click", () => {
  goToPage(pages.page2, pages.page3);
  startCosmicOrbs();
});

console.log("Golden beams started");

function startGoldenBeams() {
  const canvas = document.createElement("canvas");
  canvas.classList.add("background-canvas");
  pages.page2.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(255,215,0,0.5)");
    gradient.addColorStop(0.5, "rgba(255,140,0,0.4)");
    gradient.addColorStop(1, "rgba(255,105,180,0.3)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);
  }

  animate();
}

// ==============================
// PAGE 3 - COSMIC ORBS
// ==============================
function startCosmicOrbs() {
  const canvas = document.createElement("canvas");
  canvas.classList.add("background-canvas");
  pages.page3.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const orbs = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 2 + Math.random() * 4,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  }));

  function animate() {
    ctx.fillStyle = "rgba(16,2,30,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    orbs.forEach(o => {
      o.x += o.dx;
      o.y += o.dy;

      if (o.x < 0 || o.x > canvas.width) o.dx *= -1;
      if (o.y < 0 || o.y > canvas.height) o.dy *= -1;

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,182,232,0.7)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==============================
// PAGE 3 → PAGE 4
// ==============================
avatar.addEventListener("click", () => {
  avatar.classList.add("swirl");

  avatar.addEventListener("animationend", () => {
    goToPage(pages.page3, pages.page4);
    startRain();
  }, { once: true });
});

avatar.addEventListener("click", () => {
  avatar.classList.add("swirl");

  avatar.addEventListener("animationend", () => {
    goToPage(pages.page3, pages.page4);
    startRain();

    // Fade in paragraph
    const para = document.querySelector("#page4 .cinematic-rain-text");
    para.classList.add("reveal"); // add a class to trigger CSS transition
  }, { once: true });
});

// ==============================
// PAGE 4 - RAIN
// ==============================
function startRain() {
  const canvas = document.createElement("canvas");
  canvas.classList.add("background-canvas");
  pages.page4.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const drops = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: 10 + Math.random() * 20,
    speed: 4 + Math.random() * 4
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0,191,255,0.6)";
    ctx.lineWidth = 2;

    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len);
      ctx.stroke();

      d.y += d.speed;
      if (d.y > canvas.height) d.y = -d.len;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==============================
// PAGE 4 → PAGE 5
// ==============================
umbrella.addEventListener("click", () => {
  secretMessage.classList.remove("secret-message-hidden");
  secretMessage.classList.add("secret-message-visible");

  // Optional: add small pulse or glow animation
  secretMessage.style.animation = "pulseHighlight 2s infinite alternate";

  // Delay before moving to page 5
  setTimeout(() => {
    goToPage(pages.page4, pages.page5);
  }, 2500);
});

// ==============================
// PAGE 5 → PAGE 6
// ==============================
let memoriesClicked = 0;

// ==============================
// PAGE 5 → PAGE 6 (Simplified, no modal)
// ==============================
memories.forEach(memory => {
  memory.addEventListener("click", () => {
    memory.classList.add("viewed"); // mark as clicked

    // Optional: show a small message when any memory is clicked
    memoryMessage.style.display = "block";
    memoryMessage.innerText = `Yeh yaadein humari 💖`;
    memoryMessage.style.opacity = "0";
    memoryMessage.style.transform = "translateY(20px)";
    setTimeout(() => {
      memoryMessage.style.transition = "all 1s ease";
      memoryMessage.style.opacity = "1";
      memoryMessage.style.transform = "translateY(0)";
    }, 50);

    // If all memories clicked, move to page 6
    if (document.querySelectorAll(".memory.viewed").length === memories.length) {
      setTimeout(() => {
        goToPage(pages.page5, pages.page6);
        startCosmicPage6();
        enableHeartDrawing();
      }, 1200); // delay so message is readable
    }
  });
});

// ==============================
// PAGE 6 - COSMIC BACKGROUND
// ==============================
let page6Stars = [];
let page6Canvas, page6Ctx;
let formK = false;

function startCosmicPage6() {
  page6Canvas = document.createElement("canvas");
  page6Canvas.classList.add("background-canvas");
  pages.page6.appendChild(page6Canvas);
  page6Ctx = page6Canvas.getContext("2d");

  function resize() {
    page6Canvas.width = window.innerWidth;
    page6Canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Create floating stars
  page6Stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * page6Canvas.width,
    y: Math.random() * page6Canvas.height,
    r: Math.random() * 2,
    tx: 0,
    ty: 0,
    speed: 0.02 + Math.random() * 0.02
  }));

  animate();
}

function animate() {
  page6Ctx.fillStyle = "rgba(16,2,30,0.4)";
  page6Ctx.fillRect(0, 0, page6Canvas.width, page6Canvas.height);

  page6Ctx.fillStyle = formK ? "#ffd6ff" : "#fff";

  page6Stars.forEach(star => {

    if (formK) {
      star.x += (star.tx - star.x) * star.speed;
      star.y += (star.ty - star.y) * star.speed;
    } else {
      star.y += 0.2;
      if (star.y > page6Canvas.height) star.y = 0;
    }

    page6Ctx.beginPath();
    page6Ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    page6Ctx.fill();
  });

  requestAnimationFrame(animate);
}

// Contellation 'K'
function formConstellationK() {
  formK = true;

  const centerX = page6Canvas.width / 2;
  const centerY = page6Canvas.height / 2;

  const kPoints = [];
  const step = 10; // smaller step = denser K

  // Vertical line
  for (let i = -150; i <= 150; i += step) {
    kPoints.push({ x: centerX - 80, y: centerY + i });
  }

  // Upper diagonal
  for (let i = 0; i <= 150; i += step) {
    kPoints.push({ x: centerX - 80 + i, y: centerY - i });
  }

  // Lower diagonal
  for (let i = 0; i <= 150; i += step) {
    kPoints.push({ x: centerX - 80 + i, y: centerY + i });
  }

  // Assign target positions and random oscillation parameters
  page6Stars.forEach((star, index) => {
    const target = kPoints[index % kPoints.length];
    star.tx = target.x;
    star.ty = target.y;

    // Add slow vibration offsets
    star.vibrate = {
      ampX: 2 + Math.random() * 2, // amplitude in px
      ampY: 2 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2, // random starting phase
      speed: 0.002 + Math.random() * 0.003 // vibration speed
    };

    star.r = 2 + Math.random() * 3; // slightly bigger stars
  });
}

function animate() {
  page6Ctx.fillStyle = "rgba(16,2,30,0.4)";
  page6Ctx.fillRect(0, 0, page6Canvas.width, page6Canvas.height);

  page6Ctx.fillStyle = formK ? "#ffd6ff" : "#fff";

  page6Stars.forEach(star => {
    if (formK) {
      // Move star toward its target
      star.x += (star.tx - star.x) * star.speed;
      star.y += (star.ty - star.y) * star.speed;

      // Add slow jiggling effect
      const jiggle = 1.2; // max 1.2px offset
      star.x += (Math.random() - 0.5) * jiggle;
      star.y += (Math.random() - 0.5) * jiggle;

    } else {
      // Regular falling animation
      star.y += 0.2;
      if (star.y > page6Canvas.height) star.y = 0;
    }

    page6Ctx.beginPath();
    page6Ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    page6Ctx.fill();
  });

  requestAnimationFrame(animate);
}

// ==============================
// PAGE 6 - HEART DRAW CHALLENGE
// ==============================
function enableHeartDrawing() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "3";
  pages.page6.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  let drawing = false;
  let points = [];
  let heartCompleted = false;

  canvas.addEventListener("mousedown", () => {
    drawing = true;
    points = [];
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;

    if (!heartCompleted) {
      checkHeart();
    } else {
      checkYes();
    }
  });

  canvas.addEventListener("mousemove", e => {
    if (!drawing) return;

    points.push({ x: e.clientX, y: e.clientY });

    ctx.strokeStyle = "#ff69b4";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    if (points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  });

  function checkHeart() {
    // If not enough points, just return
    if (points.length < 20) { // much lower threshold
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const start = points[0];
    const end = points[points.length - 1];
    const distance = Math.hypot(start.x - end.x, start.y - end.y);

    // Relax the distance requirement
    if (distance < 150) { // bigger tolerance
      heartCompleted = true;
      pages.page6.classList.add("revealed");

      // Optional: fade out the drawn line slowly
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 500);
    } else {
      // If not complete, just clear to encourage retry
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function checkYes() {
    if (points.length < 40) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const secondMessage = document.getElementById("second-message");

    secondMessage.innerHTML = `
      <br>Sach yeh hai, K…<br>
      tum pehle din se meri thi.
      Lekin, Ab official bhi kar de…sobko bata kar!<br>
    `;

    secondMessage.style.opacity = "1";
    secondMessage.style.transform = "translateY(0)";

    setTimeout(() => {
      formConstellationK();
    }, 1500);

    setTimeout(() => {
      const finalText = document.createElement("div");
      finalText.innerText = "प्रेम ❤️";
      finalText.style.position = "absolute";
      finalText.style.bottom = "5%";
      finalText.style.left = "50%";
      finalText.style.transform = "translateX(-50%)";
      finalText.style.fontSize = "2em";
      finalText.style.opacity = "0";
      finalText.style.transition = "opacity 2s ease";

      pages.page6.appendChild(finalText);

      setTimeout(() => finalText.style.opacity = "1", 200);
    }, 2500);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.pointerEvents = "none";
  }
}

function startHeartParticles() {
  const canvas = document.createElement("canvas");
  canvas.classList.add("background-canvas");
  pages.page1.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const hearts = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    size: 6 + Math.random() * 6,
    speed: 0.4 + Math.random() * 0.6
  }));

  function drawHeart(x, y, size) {
    ctx.fillStyle = "rgba(255,105,180,0.5)";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size);
    ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach(h => {
      h.y -= h.speed;
      if (h.y < -20) h.y = canvas.height + 20;
      drawHeart(h.x, h.y, h.size);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==============================
// INITIAL PAGE
// ==============================
pages.page1.classList.add("active");

startHeartParticles();