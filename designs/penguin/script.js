// Change background color to love yellow when penguin is hovered
    const penguin = document.querySelector('.pinguin');
    const hoverText = document.querySelector('.hover-text');

    penguin.addEventListener('mouseenter', function() {
      document.body.style.backgroundColor = 'rgba(250, 204, 21, 0.7)'; // Love Yellow
      hoverText.style.visibility = 'visible'; // Show the text
    });

    penguin.addEventListener('mouseleave', function() {
      document.body.style.backgroundColor = ''; // Reset background
      hoverText.style.visibility = 'hidden'; // Hide the text
    });