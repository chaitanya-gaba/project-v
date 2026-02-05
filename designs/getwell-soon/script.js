document.addEventListener("DOMContentLoaded", function(){

    const layers = document.querySelectorAll('.card .layer');
    const nextBtn = document.querySelector('.next-btn');
    const panda = document.querySelector('.panda');
    const heading = document.querySelector('.card h1');
    const footer = document.querySelector('.footer');
    const subtitleEl = document.getElementById('subtitle');

    let current = 0;

    const subtitles = [
        "Are you ready, my heroine? Let me steal your smile one message at a time 😉",
        "This one’s just for your giggle 😏",
        "Do you feel the SRK vibes yet? 🥰",
        "Almost at the final scene… hold my love tight 🌷",
        "Today isn't about strength — it's about being held."
    ];

    function showLayer(index){
        layers.forEach((l,i)=>{
            l.classList.remove('active');
        });
        layers[index].classList.add('active');
    }

    nextBtn.addEventListener('click', function(){

        if(current < layers.length -1){
            // Move to next layer
            current++;
            showLayer(current);

            // Update subtitle
            subtitleEl.textContent = subtitles[current];

            // Change button text on last layer
            if(current === layers.length -1) nextBtn.textContent = "Missing Me??🥺";

        } else {
            // Last slide clicked: heading, footer, flying kiss every click
            subtitleEl.textContent = "Or kina chahte ho...itne mein bohot mehnat lagi hai";
            heading.textContent = "I'm Missing You Too...बहुत ज्यादा🤗";
            footer.style.display = "block";

            // Create a new flying kiss for each click
            const flyingKiss = document.createElement("div");
            flyingKiss.className = "flying-kiss";
            flyingKiss.textContent = "💋";
            document.body.appendChild(flyingKiss);

            const rectBtn = nextBtn.getBoundingClientRect();
            const rectPanda = panda.getBoundingClientRect();

            flyingKiss.style.display = "block";
            flyingKiss.style.left = rectBtn.left + rectBtn.width / 2 - 15 + "px";
            flyingKiss.style.top = rectBtn.top + rectBtn.height / 2 - 15 + "px";

            flyingKiss.animate([
                { transform: `translate(0,0) scale(1)` },
                { transform: `translate(${rectPanda.left - rectBtn.left}px, ${rectPanda.top - rectBtn.top}px) scale(1.5)` }
            ], {
                duration: 1200,
                easing: "ease-in-out",
                fill: "forwards"
            });

            setTimeout(() => {
                flyingKiss.remove();
            }, 1300);
        }

    });

    // ================= PANDA EYES =================
    function trackEyes(e){
        const eyes = document.querySelectorAll(".eye-ball");
        const ev = e.touches ? e.touches[0] : e;
        eyes.forEach(eye=>{
            const socket = eye.parentElement.getBoundingClientRect();
            const cx = socket.left + socket.width/2;
            const cy = socket.top + socket.height/2;
            let dx = ev.clientX - cx;
            let dy = ev.clientY - cy;
            const max = 6;
            const angle = Math.atan2(dy, dx);
            eye.style.transform = `translate(${Math.cos(angle)*max}px, ${Math.sin(angle)*max}px)`;
        });
    }

    document.addEventListener("mousemove", trackEyes);
    document.addEventListener("touchmove", trackEyes);

});