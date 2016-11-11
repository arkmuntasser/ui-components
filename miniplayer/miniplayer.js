'use strict';

class Miniplayer {
  constructor() {
    this.miniplayer = document.querySelector('[data-miniplayer]');
    this.miniplayerWrapper = this.miniplayer.querySelector('[data-miniplayer-wrapper]');
    this.miniplayerInner = this.miniplayer.querySelector('[data-miniplayer-inner]');
    this.miniplayerShadow = this.miniplayer.querySelector('[data-miniplayer-shadow]');
    this.miniplayerImage = this.miniplayer.querySelector('[data-miniplayer-image]');
    this.miniplayerVideoTemplate = this.miniplayer.querySelector('[data-miniplayer-video-template]');

    this.locked = false;
    this.isMini = false;
    this.isPlaying = false;

    this.maybeActivateMiniplayer = this.maybeActivateMiniplayer.bind(this);
    this.activateMiniplayer = this.activateMiniplayer.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.update = this.update.bind(this);
    this.cleanup = this.cleanup.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', this.maybeActivateMiniplayer);
    this.miniplayer.addEventListener('transitionend', this.cleanup);
    this.miniplayerImage.addEventListener('click', this.playVideo);
  }

  playVideo() {
    var iframe = this.miniplayerVideoTemplate.innerHTML;
    var tempEl = document.createElement('div');
    tempEl.innerHTML = iframe;

    var iframeEl = tempEl;
    this.miniplayerInner.appendChild(iframeEl);

    this.isPlaying = true;
  }

  maybeActivateMiniplayer(evt) {
    if(this.locked) {
      return;
    }

    const scrollY = window.scrollY;

    if(this.isPlaying && this.isMini && scrollY < 300) {
      // deactivate miniplayer
      this.activateMiniplayer();
    } else if(this.isPlaying && !this.isMini && scrollY >= 300) {
      // activate miniplayer
      this.activateMiniplayer();
    }
  }

  activateMiniplayer() {
    this.locked = true;

    var first = this.miniplayerWrapper.getBoundingClientRect();

    this.miniplayer.classList.toggle('mini');
    var last = this.miniplayerWrapper.getBoundingClientRect();

    var invertWidth = first.width / last.width;
    var invertHeight = first.height / last.height;
    var invertTop = (first.top * invertHeight) - last.top;
    var invertLeft = (first.left * invertWidth) - last.left;

    this.miniplayerWrapper.style.transform = `translate(${invertLeft}px, ${invertTop}px) scale(${invertWidth}, ${invertHeight})`;
    this.miniplayerWrapper.style.willChange = 'transform';

    const update = this.update;
    requestAnimationFrame(function() {
      requestAnimationFrame(update)
    });
  }

  update() {
    this.miniplayer.classList.add('animate');
    this.miniplayerWrapper.style.transform = '';
    this.isMini = this.isMini ? false : true;
  }

  cleanup() {
    this.locked = false;
    this.miniplayer.classList.remove('animate');
    this.miniplayerWrapper.style.willChange = '';
  }
}

new Miniplayer();
