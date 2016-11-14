'use strict';

class CoverStory {
  constructor() {
    this.coverStory = document.querySelector('[data-cover-story]');
    this.coverStoryShadow = this.coverStory.querySelector('[data-cover-story-shadow]');

    this.toggleCoverStory = this.toggleCoverStory.bind(this);
    this.updateShadowOpacity = this.updateShadowOpacity.bind(this);

    this.active = true;
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.windowHeight = window.innerHeight;

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', this.toggleCoverStory);
    this.coverStory.addEventListener('scroll', this.updateShadowOpacity)
  }

  updateShadowOpacity(evt) {
    const currentScrollPosition = this.coverStory.pageYOffset || this.coverStory.scrollTop;
    this.coverStoryShadow.style.opacity = (this.windowHeight - currentScrollPosition) / this.windowHeight;
  }

  toggleCoverStory(evt) {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = currentScrollPosition > this.lastScrollPosition ? true : false;

    if(this.active && scrollingDown && currentScrollPosition > 0) {
      this.active = false;
      this.coverStory.classList.add('offscreen');
    } else if(!this.active && !scrollingDown && currentScrollPosition <= 0) {
      this.active = true;
      this.coverStory.classList.remove('offscreen');
    }

    this.lastScrollPosition = currentScrollPosition;
  }
}

new CoverStory();
