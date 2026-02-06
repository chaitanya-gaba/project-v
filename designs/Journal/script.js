function openBox() {
    const box = document.getElementById('bubuDuduBox');
    box.classList.add('flipped');
    
    // Optionally remove the onclick listener after the first tap
    // event.target.onclick = null;
}