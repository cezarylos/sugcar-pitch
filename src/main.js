import { clampSlideIndex, slideHash, slides } from './deck.js';

const app = document.querySelector('#app');
const hashIndex = () => {
  const match = window.location.hash.match(/^#slide-(\d+)$/);
  return match ? clampSlideIndex(Number(match[1]) - 1, slides.length) : 0;
};
let activeIndex = hashIndex();

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
}[character]));

function visualFor(slide) {
  if (slide.layout === 'flow') {
    return `<div class="flow" aria-label="Data flow: Gluroo or Nightscout cloud to iPhone, then to Siri, Live Activity, and optional speech">
      <span>Gluroo /<br>Nightscout</span><i>→</i><span>iPhone</span><i>→</i><span>Siri<br><small>Live Activity · Speech</small></span>
    </div>`;
  }
  if (slide.layout === 'demo') {
    return `<div class="demo-frame">
      <div class="demo-top"><span class="dot"></span><span>iPhone · mock data</span></div>
      <div class="demo-placeholder"><strong>Mock interface capture</strong><span>Added from the iOS Simulator</span></div>
      <p class="demo-note">Video slot: driving-context Siri flow</p>
    </div>`;
  }
  if (slide.layout === 'safety') {
    return `<div class="guardrails"><span>Current signal</span><span>Stale / offline</span><span>Verify with BGM</span></div>`;
  }
  if (slide.layout === 'principles') {
    return `<div class="principles"><span>Direct connection</span><span>Keychain credentials</span><span>On-device voice</span></div>`;
  }
  return `<div class="reading-card" aria-label="Illustrative glucose reading"><div class="reading-meta">SUGCAR <span>NOW</span></div><div class="reading-value">108 <b>→</b></div><div class="reading-detail">mg/dL <span>In range</span></div><div class="reading-time">Updated 1 min ago</div></div>`;
}

function render() {
  const slide = slides[activeIndex];
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === slides.length - 1;
  app.innerHTML = `<section class="deck deck--${slide.layout}" id="slide" tabindex="-1" aria-roledescription="slide" aria-label="Slide ${activeIndex + 1} of ${slides.length}">
    <header class="topbar"><a href="#slide-1" class="brand" aria-label="Sugcar pitch home">Sug<span>car</span></a><span class="counter">${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</span></header>
    <div class="slide-content"><div class="copy"><p class="eyebrow">${escapeHtml(slide.eyebrow)}</p><h1>${escapeHtml(slide.title)}</h1><div class="body">${slide.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div></div><div class="visual">${visualFor(slide)}</div></div>
    <nav class="controls" aria-label="Presentation navigation"><button class="control" data-direction="previous" ${atStart ? 'disabled' : ''} aria-label="Previous slide">← <span>Back</span></button><div class="progress" aria-hidden="true"><i style="transform:scaleX(${(activeIndex + 1) / slides.length})"></i></div><button class="control control--next" data-direction="next" ${atEnd ? 'disabled' : ''} aria-label="Next slide"><span>Next</span> →</button></nav>
  </section>`;
  document.querySelectorAll('[data-direction]').forEach((button) => button.addEventListener('click', () => go(button.dataset.direction === 'next' ? 1 : -1)));
}

function go(delta) {
  const nextIndex = clampSlideIndex(activeIndex + delta, slides.length);
  if (nextIndex === activeIndex) return;
  activeIndex = nextIndex;
  window.location.hash = slideHash(activeIndex);
  render();
  document.querySelector('#slide').focus();
}

window.addEventListener('hashchange', () => { activeIndex = hashIndex(); render(); });
window.addEventListener('keydown', (event) => {
  if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) { event.preventDefault(); go(1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); go(-1); }
  if (event.key === 'Home') { event.preventDefault(); activeIndex = 0; window.location.hash = slideHash(activeIndex); render(); }
  if (event.key === 'End') { event.preventDefault(); activeIndex = slides.length - 1; window.location.hash = slideHash(activeIndex); render(); }
});

render();
