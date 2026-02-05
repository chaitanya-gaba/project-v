const audio = document.getElementById('bg-audio');
const audioContainer = document.getElementById('audio-container');
const typewriter = document.getElementById('typewriter');
const textEl = document.getElementById("text");

// Split message: normal text + highlighted word inserted all at once
const messageParts = [
  "I 🫰 (You)🫵 So ",
  '<span class="highlight">Fucking</span>',
  " Much, Meri Jaan...🤗"
];
const speed = 80;

// Typewriter function for array of parts
function typeWriterArray(parts, partIndex = 0, charIndex = 0) {
    if (partIndex >= parts.length) return;

    const currentPart = parts[partIndex];

    if (currentPart.startsWith('<span')) {
        // Insert full span at once
        textEl.innerHTML += currentPart;

        // Trigger animation
        const highlight = textEl.querySelector('.highlight');
        if (highlight) {
            highlight.style.animation = 'none';
            void highlight.offsetWidth;
            highlight.style.animation = 'heartbeat 1.3s ease-in-out infinite';
        }

        // Move to next part
        setTimeout(() => typeWriterArray(parts, partIndex + 1, 0), speed);
    } else {
        // Insert one character at a time
        textEl.innerHTML += currentPart[charIndex];
        charIndex++;
        if (charIndex < currentPart.length) {
            setTimeout(() => typeWriterArray(parts, partIndex, charIndex), speed);
        } else {
            // Move to next part
            setTimeout(() => typeWriterArray(parts, partIndex + 1, 0), speed);
        }
    }
}

// Helper for audio pill transform
function getTranslateYForBottom(bottomOffset = 50) {
    const viewportHeight = window.innerHeight;
    const containerHeight = audioContainer.offsetHeight;
    return viewportHeight - bottomOffset - containerHeight / 2 - viewportHeight / 2;
}

// Audio play event
audio.addEventListener('play', () => {
    const transitionTime = 51; 
    const typewriterStartTime = 53;
    const finalTranslateY = getTranslateYForBottom(50);

    const interval = setInterval(() => {
        const elapsed = audio.currentTime;

        if (elapsed >= transitionTime && !audioContainer.classList.contains('bottom')) {
            audioContainer.style.transform = `translate(-50%, ${finalTranslateY}px)`;
            audioContainer.classList.add('bottom');
        }

        if (elapsed >= typewriterStartTime && !typewriter.classList.contains('show')) {
            typewriter.classList.add('show');
            typeWriterArray(messageParts);
            clearInterval(interval);
        }
    }, 200);
});

// Recalculate on resize
window.addEventListener('resize', () => {
    if (audioContainer.classList.contains('bottom')) {
        const finalTranslateY = getTranslateYForBottom(50);
        audioContainer.style.transform = `translate(-50%, ${finalTranslateY}px)`;
    }
});