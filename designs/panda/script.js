document.addEventListener("mousemove", function(e){
    // ===== EYES =====
    document.querySelectorAll(".eye-ball").forEach(eye=>{
        const rect = eye.parentElement.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top + rect.height/2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        eye.style.transform = `translate(${Math.cos(angle)*6}px, ${Math.sin(angle)*6}px)`;
    });

    // ===== HANDS =====
    const leftHand = document.querySelector(".hand.left");
    const rightHand = document.querySelector(".hand.right");
    const bodyRect = document.querySelector(".body").getBoundingClientRect();
    const centerX = bodyRect.left + bodyRect.width/2;
    const centerY = bodyRect.top + bodyRect.height/2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;

    leftHand.style.transform = `rotate(${angleDeg * 0.3}deg)`;
    rightHand.style.transform = `rotate(${angleDeg * 0.3}deg)`;
});