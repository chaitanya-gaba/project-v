const btn = document.getElementById('openBtn');
const card = document.getElementById('messageCard');
btn.addEventListener('click', () => {
  btn.style.display = 'none';
  card.classList.add('show');
});