const pages = document.querySelectorAll(".page");
let current = 0;

function nextPage() {
if (current < pages.length - 1) {
    pages[current].classList.add("flipped");
    current++;
}
}

function prevPage() {
if (current > 0) {
    current--;
    pages[current].classList.remove("flipped");
}
}