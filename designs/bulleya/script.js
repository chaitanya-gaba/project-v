    // Pages
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');

    // Page 1 → Page 2
    const heart = document.getElementById('click-heart');
    heart.addEventListener('click', () => {
      page1.style.display = 'none';
      page2.style.display = 'flex';
    });

    // Page 2: poster hover → quote
    const posterQuote = document.getElementById('poster-quote');
    document.querySelectorAll('.srk-poster').forEach(poster => {
      poster.addEventListener('mouseenter', () => {
        posterQuote.textContent = poster.dataset.quote;
        posterQuote.style.display = 'block';
      });
      poster.addEventListener('mouseleave', () => {
        posterQuote.style.display = 'none';
      });
    });

    // Page 2: clapperboard click → Page 3
    const clapperboard = document.getElementById('clapperboard');
    clapperboard.addEventListener('click', () => {
      page2.style.display = 'none';
      page3.style.display = 'flex';
    });

    // Page 3: floating stars
    const avatar = document.getElementById('taehyung-avatar');

    function createStar() {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.left = Math.random() * window.innerWidth + 'px';
      star.style.animationDuration = 2 + Math.random() * 3 + 's';
      page3.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 5000);
    }
    setInterval(createStar, 300);

    // Page 3: avatar click → dance → Page 4
    avatar.addEventListener('click', () => {
      avatar.classList.add('dance');
      avatar.style.pointerEvents = 'none';

      avatar.addEventListener('animationend', () => {
        avatar.classList.remove('dance');
        page3.style.display = 'none';
        page4.style.display = 'flex';
      }, { once: true });
    });

    const umbrella = document.getElementById('umbrella');
const secretMessage = document.getElementById('secret-message');

// Function to create rain
function createRain() {
  const drop = document.createElement('div');
  drop.classList.add('raindrop');
  drop.style.left = Math.random() * window.innerWidth + 'px';
  drop.style.animationDuration = 0.5 + Math.random() * 1.5 + 's';
  page4.appendChild(drop);

  setTimeout(() => drop.remove(), 2000);
}

// Continuously create raindrops
setInterval(createRain, 50);

// Umbrella click → show secret message → move to Page 5
umbrella.addEventListener('click', () => {
  secretMessage.style.display = 'block';
  
  // After 2 seconds, go to Page 5
  setTimeout(() => {
    page4.style.display = 'none';
    page5.style.display = 'flex'; // page5 to be created next
  }, 2000);
});

const memories = document.querySelectorAll('.memory');
const memoryMessage = document.getElementById('memory-message');

let memoriesClicked = 0;

memories.forEach(memory => {
  memory.addEventListener('click', () => {
    memoryMessage.textContent = memory.dataset.message;
    memoryMessage.style.display = 'block';
    memory.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
      memory.style.transform = 'scale(1)';
      memoryMessage.style.display = 'none';
    }, 1500);

    memoriesClicked++;

    // After all memories clicked → move to Page 6
    if (memoriesClicked === memories.length) {
      setTimeout(() => {
        page5.style.display = 'none';
        page6.style.display = 'flex'; // Page 6 to be created
      }, 1500);
    }
  });
});

// Click anywhere → fireworks + highlight paragraph
page6.addEventListener('click', (e) => {
  // Highlight paragraph
  const para = document.getElementById('love-paragraph');
  para.style.transform = 'scale(1.2)';
  para.style.color = '#ffd700'; // gold highlight

  // Create fireworks
  for (let i = 0; i < 20; i++) {
    createFirework(e.clientX, e.clientY);
  }
});

// Firework function
function createFirework(x, y) {
  const fire = document.createElement('div');
  fire.style.position = 'absolute';
  fire.style.width = '5px';
  fire.style.height = '5px';
  fire.style.background = Math.random() > 0.5 ? 'pink' : 'gold';
  fire.style.borderRadius = '50%';
  fire.style.left = x + 'px';
  fire.style.top = y + 'px';
  fire.style.opacity = 1;
  page6.appendChild(fire);

  const angle = Math.random() * 2 * Math.PI;
  const distance = 50 + Math.random() * 50;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  fire.animate([
    { transform: 'translate(0,0)', opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
  ], { duration: 1000, easing: 'ease-out' });

  setTimeout(() => fire.remove(), 1000);
}