    // ============================================
    // DEVICE DETECTION
    // ============================================

    const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // ============================================
    // CURSOR GLOW (Desktop Only)
    // ============================================

    if (!isTouchDevice) {
    const cursor = document.querySelector(".cursor-glow");

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out"
        });
    });
    } else {
    const cursor = document.querySelector(".cursor-glow");
    if (cursor) cursor.style.display = "none";
    }

    // ============================================
    // PARTICLE ENGINE (Reusable Factory)
    // ============================================

    function createParticleLayer({
    canvasId,
    count,
    sizeRange,
    speedRange,
    opacityRange
    }) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    class Particle {
        constructor() {
        this.reset();
        }

        reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = sizeRange[0] + Math.random() * sizeRange[1];
        this.speed = speedRange[0] + Math.random() * speedRange[1];
        this.opacity = opacityRange[0] + Math.random() * opacityRange[1];
        }

        update() {
        this.y -= this.speed;

        if (this.y < -this.radius) {
            this.y = canvas.height + this.radius;
            this.x = Math.random() * canvas.width;
        }
        }

        draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 204, ${this.opacity})`;
        ctx.fill();
        }
    }

    function init() {
        particles = [];
        const adjustedCount =
        window.innerWidth < 768 ? Math.floor(count * 0.6) : count;

        for (let i = 0; i < adjustedCount; i++) {
        particles.push(new Particle());
        }
    }

    init();
    window.addEventListener("resize", init);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
        p.update();
        p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
    }

    // Background (large, slow, subtle)
    createParticleLayer({
    canvasId: "bgParticles",
    count: 14,
    sizeRange: [60, 90],
    speedRange: [0.08, 0.18],
    opacityRange: [0.015, 0.035]
    });

    // Foreground (smaller, slightly more visible)
    createParticleLayer({
    canvasId: "fgParticles",
    count: 20,
    sizeRange: [18, 35],
    speedRange: [0.2, 0.35],
    opacityRange: [0.04, 0.08]
    });

    // ============================================
    // SUBTLE PARALLAX DRIFT (Desktop Only)
    // ============================================

    if (!isTouchDevice) {
    const bg = document.querySelector(".gradient-bg");

    window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(bg, {
        x: x,
        y: y,
        duration: 2,
        ease: "power2.out"
        });
    });
    }

    // ============================================
    // TEXT REVEAL CHOREOGRAPHY
    // ============================================

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(".line-1", {
    opacity: 1,
    filter: "blur(0px)",
    y: -12,
    duration: 2
    })
    .delay(1.5)
    .to(".line-2", {
    opacity: 1,
    filter: "blur(0px)",
    y: -12,
    duration: 2
    })
    .delay(2)
    .to(".line-3", {
    opacity: 1,
    filter: "blur(0px)",
    y: -12,
    duration: 2.5
    })
    // Emotional pause before warp
    .to({}, { duration: 3 })

    // 👇 THIS IS EXACTLY WHERE IT GOES
    .call(() => {
    startTimeTravel("../final-v/index.html");
    // startTimeTravel("https://username.github.io/repo-name/designs/target-design/index.html");
    });

    // ============================================
    // AMBIENT "BREATHING" LIGHT PULSE
    // ============================================

    // Subtle infinite glow (separate from timeline)
    gsap.to(".highlight", {
    textShadow: "0 0 60px rgba(255,214,232,0.85)",
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
    });

    gsap.to(".gradient-bg", {
    scale: 1.03,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    transformOrigin: "center center"
    });

    // ============================================
    // TIME-TRAVEL / STAR WARP EFFECT
    // ============================================

    let warpStarted = false;

    function startTimeTravel(nextURL) {
        if (warpStarted) return;
        warpStarted = true;
        const overlay = document.getElementById("time-travel-overlay");
        overlay.classList.add("active");

        const canvas = document.getElementById("warpCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        const starCount = 200;
        const stars = [];

        for (let i = 0; i < starCount; i++) {
            stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
            });
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        let speed = 2; // initial speed
        const acceleration = 0.05; // how fast it accelerates

        function animate() {
            ctx.fillStyle = "#10021e";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < starCount; i++) {
                let star = stars[i];
                star.z -= speed;
                if (star.z <= 0) star.z = canvas.width;

                const k = 128.0 / star.z;
                const x = (star.x - centerX) * k + centerX;
                const y = (star.y - centerY) * k + centerY;
                const px = (star.x - centerX) * (128.0 / (star.z + speed)) + centerX;
                const py = (star.y - centerY) * (128.0 / (star.z + speed)) + centerY;

                // Make sure the lineWidth is never too small
                const size = Math.max(1, (1 - star.z / canvas.width) * 3);

                ctx.strokeStyle = "#ffd6e8";
                ctx.lineWidth = size;

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            // Gradually increase speed, but cap it so stars don’t fly past instantly
            speed = Math.min(speed + acceleration, 40);

            requestAnimationFrame(animate);
        }

        animate();

        // Countdown
        let count = 7;
        const countEl = document.getElementById("count");
        const countdownInterval = setInterval(() => {
            count--;
            if (count <= 0) {
            clearInterval(countdownInterval);
            window.location.href = nextURL; // redirect to next design
            } else {
            countEl.textContent = count;
            gsap.fromTo(
                countEl,
                { scale: 0.8, opacity: 0.5 },
                { scale: 1.2, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
            }
        }, 1000);
    }