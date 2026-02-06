let mainTl = new TimelineMax();
let words = document.querySelectorAll('#bottle path');
let hearts = document.querySelectorAll('#hearts path');
let labels = document.querySelectorAll('#labels path');
let container = document.querySelector('.container');

mainTl
.set('#love-fireworks', {autoAlpha: 1})
.set(labels, {scale: 0, autoAlpha: 0})
.set(hearts, {scale: 0, autoAlpha: 0, transformOrigin: '0% 50%'})
.staggerTo(words, 0, { autoAlpha: 0, cycle: {y: [-Math.random() * container.offsetHeight], x: [-Math.random() * container.offsetWidth, Math.random() * container.offsetWidth / 2]} },0,0)
.staggerTo(words, 2.75, { autoAlpha: 1, x: 0, y: 0, ease: Bounce.easeOut}, 0.1, 'letters')
//.staggerFromTo('.label', 3, { scale: 0, autoAlpha: 0 },{scale: 1, autoAlpha: 0}, 0.5, 5)
.staggerTo(hearts, 1, { autoAlpha: 1 , scale: 1, ease: Back.easeOut.config(1.7)}, 0.1, 8);