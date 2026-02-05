const wrapper = document.getElementById('envWrapper');
const roseContainer = document.getElementById('roseContainer');

wrapper.addEventListener('click', () => {
    const isOpening = !wrapper.classList.contains('open');
    wrapper.classList.toggle('open');

    if (isOpening) {
        createRoses();
    }
});

function createRoses() {
    for (let i = 0; i < 30; i++) {
        const rose = document.createElement('div');
        rose.className = 'rose';
        const icons = ['🌹', '❤️', '🌸', '✨'];
        rose.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        const x = (Math.random() - 0.5) * 100 + 'vw';
        const y = (Math.random() - 1.2) * 100 + 'vh';
        
        rose.style.setProperty('--x', x);
        rose.style.setProperty('--y', y);
        
        // Spawn roses from the opening of the envelope
        rose.style.left = '50%';
        rose.style.top = '20%';

        roseContainer.appendChild(rose);
        setTimeout(() => rose.remove(), 2000);
    }
}