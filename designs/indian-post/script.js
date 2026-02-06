const postCard = document.getElementById("postCard");
const hugEmoji = postCard.querySelector('.hug-emoji');

postCard.addEventListener("click", () => {
  postCard.classList.toggle("flipped");

  // Restart hugpop animation
  hugEmoji.style.animation = 'none';           // reset animation
  hugEmoji.offsetHeight;                        // trigger reflow
  hugEmoji.style.animation = 'hugpop 0.9s ease'; // re-apply animation
});