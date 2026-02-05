// Countdown Timer
    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date("February 21, 2026 14:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if(distance < 0){
            countdownElement.innerHTML = "I'm back with you! ❤️";
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000*60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();