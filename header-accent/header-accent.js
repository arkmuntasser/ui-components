'use strict';

class HeaderAccent {
  constructor() {
    this.headerAccent = document.querySelector('[data-header-accent]');
    this.headerAccentImage = this.headerAccent.querySelector('[data-header-accent-image]');

    this.updateOpacity = this.updateOpacity.bind(this);

    this.imageIsTransparent = false;
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', this.updateOpacity);
  }

  updateOpacity(evt) {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = currentScrollPosition > this.lastScrollPosition ? true : false;

    const headerAccentHeight = window.innerWidth * .46875;
    const distanceTravelled = Math.min(currentScrollPosition, headerAccentHeight);
    const opacity = 1 - (distanceTravelled / headerAccentHeight);

    if((this.imageIsTransparent && scrollingDown && opacity === 1) || (!this.imageIsTransparent && !scrollingDown && opacity === 0)) {
      return;
    }

    this.imageIsTransparent = opacity === 1 ? true : false;

    this.headerAccentImage.style.opacity = opacity;
    this.lastScrollPosition = currentScrollPosition;
  }
}

new HeaderAccent();
