const hugButton = document.getElementById('hugButton');

hugButton.addEventListener('click', () => {
    // Number of hugs per click
    const hugCount = 5;

    for (let i = 0; i < hugCount; i++) {
        const hugEmoji = document.createElement('div');
        hugEmoji.classList.add('floating-hug');
        hugEmoji.textContent = '🤗';
        
        // Randomize size between 50px and 90px
        const size = Math.floor(Math.random() * 40) + 50;
        hugEmoji.style.fontSize = size + 'px';
        
        // Random horizontal position
        hugEmoji.style.left = Math.random() * 90 + 'vw';
        
        // Random animation duration between 3s and 6s
        const duration = (Math.random() * 3) + 3;
        hugEmoji.style.animationDuration = duration + 's';
        
        document.body.appendChild(hugEmoji);
        
        // Remove after animation completes
        setTimeout(() => hugEmoji.remove(), duration * 1000);
    }
});