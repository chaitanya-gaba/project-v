var emo = (function() {
  var raf = window.requestAnimationFrame;
  var fps = 60;
  var frameDelta = 1000 / fps;

  var proto = {
    init: function(el) {
      this.el = el;
      this.width = parseInt(el.getAttribute('data-width'), 10);
      this.height = parseInt(el.getAttribute('data-height'), 10);
      this.src = el.getAttribute('data-src');
      this.frame = 0;

      this.el.style.width = this.width + 'px';
      this.el.style.height = this.height + 'px';
      this.el.style.backgroundImage = "url('" + this.src + "')";

      this._lastT = 0;
      this._animate = this._animate.bind(this);

      this._loadImage();
      this.start();
      return this;
    },

    start: function() {
      this._animating = true;
      raf(this._animate);
    },

    pause: function() {
      this._animating = false;
    },

    _animate: function(t) {
      if (!this._animating) return;
      if (this.totalFrames > 0 && t - this._lastT >= frameDelta) {
        this._update();
        this._render();
        this._lastT = t;
      }
      raf(this._animate);
    },

    _update: function() {
      this.frame = (this.frame + 1) % this.totalFrames;
    },

    _render: function() {
      var offset = this.frame * this.height;
      this.el.style.backgroundPosition = "0 " + (-offset) + "px";
    },

    _loadImage: function() {
      var self = this;
      var img = new Image();
      img.onload = function() {
        self.totalFrames = Math.floor(img.height / self.height);
      };
      img.onerror = function() {
        self.el.className += ' emo-error';
      };
      img.src = this.src;
    }
  };

  return function createEmo(el) {
    return Object.create(proto).init(el);
  };
})();

emo(document.querySelector('.emo'));

const textElement = document.querySelector('.label .text');
const message = "Give him a hug ❤";
let index = 0;

function typeWriter() {
  if (index < message.length) {
    textElement.textContent += message.charAt(index);
    index++;
    setTimeout(typeWriter, 150); // adjust speed here
  }
}

// Start the typewriter effect
typeWriter();