    // JavaScript to toggle text box visibility and show random one-liner text
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');

    // Define the 5 text options
    const messages = [
      "You're paw-some!",
      "Panda hugs for you!",
      "Stay pawsitive, friend!",
      "Life is better with pandas!",
      "I'm just here to spread smiles!"
    ];

    // Function to show random message when panda is clicked
    function showText() {
      // Show the dialogue box
      dialogueBox.style.display = 'block';

      // Get a random message from the array and update the dialogue box text
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      dialogueText.textContent = randomMessage;
    }