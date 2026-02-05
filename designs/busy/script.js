window.addEventListener('load', () => {
const audio = document.getElementById('bgmusic');
audio.play().catch(err => {
  console.log("Autoplay blocked:", err);
});
});