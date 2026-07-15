import { clampSlideIndex, slideHash, slides } from './deck.js?v=20260715-5';

const app = document.querySelector('#app');
const hashIndex = () => {
  const match = window.location.hash.match(/^#slide-(\d+)$/);
  return match ? clampSlideIndex(Number(match[1]) - 1, slides.length) : 0;
};
let activeIndex = hashIndex();

app.insertAdjacentHTML('beforeend', `
  <section class="deck" id="slide" aria-roledescription="slide">
    <header class="topbar">
      <a href="#slide-1" class="brand" aria-label="Sugcar pitch home"><img src="assets/sugcar-brand-icon.png" alt="" /><span class="brand-word">Sug<span>car</span></span></a>
      <span class="counter" data-counter></span>
    </header>
    <div class="slide-content">
      <div class="copy">
        <div class="cover-identity" data-cover-identity hidden><img src="assets/sugcar-brand-icon.png" alt="" /><span>Sugcar</span></div>
        <p class="eyebrow" data-eyebrow></p>
        <h1 data-title></h1>
        <div class="body" data-body></div>
      </div>
      <div class="visual" data-visual></div>
    </div>
    <nav class="controls" aria-label="Presentation navigation">
      <button class="control" data-previous aria-label="Previous slide">← <span>Back</span></button>
      <div class="navigation-status">
        <div class="progress" aria-hidden="true"><i data-progress></i></div>
        <p class="navigation-hint">Use ← → arrow keys to navigate</p>
      </div>
      <button class="control control--next" data-next aria-label="Next slide"><span>Next</span> →</button>
    </nav>
  </section>`);

const stage = document.querySelector('#slide');
const eyebrow = document.querySelector('[data-eyebrow]');
const title = document.querySelector('[data-title]');
const body = document.querySelector('[data-body]');
const visual = document.querySelector('[data-visual]');
const counter = document.querySelector('[data-counter]');
const previous = document.querySelector('[data-previous]');
const next = document.querySelector('[data-next]');
const progress = document.querySelector('[data-progress]');
const coverIdentity = document.querySelector('[data-cover-identity]');
const phoneChrome = () => `
  <i class="phone-island" aria-hidden="true"></i>
  <i class="phone-side phone-side--action" aria-hidden="true"></i>
  <i class="phone-side phone-side--volume-up" aria-hidden="true"></i>
  <i class="phone-side phone-side--volume-down" aria-hidden="true"></i>
  <i class="phone-side phone-side--power" aria-hidden="true"></i>`;

function visualFor(slide) {
  if (slide.layout === 'cover') {
    return `<figure class="hero-shot phone-frame">
      ${phoneChrome()}
      <img src="assets/sugcar-dashboard.png" alt="Sugcar dashboard showing a current glucose reading of 76 milligrams per decilitre, stable trend, read aloud control, and in-range status." />
    </figure>`;
  }
  if (slide.layout === 'problem') {
    return `<div class="question-card" aria-label="A simplified Siri request">
      <span class="question-label">WHILE DRIVING</span>
      <p>“Hey Siri, check my blood sugar.”</p>
      <span class="question-answer">76 mg/dL&nbsp;&nbsp;→&nbsp;&nbsp;<b>In range</b></span>
    </div>`;
  }
  if (slide.layout === 'flow') {
    return `<div class="flow" aria-label="Direct data flow from the user’s Gluroo or Nightscout source to Sugcar on iPhone, then Siri, Lock Screen, and optional speech">
      <span>Your Gluroo /<br>Nightscout</span><i>→</i><span>Sugcar<br><small>on iPhone</small></span><i>→</i><span>Siri<br><small>Lock Screen · Speech</small></span>
    </div>`;
  }
  if (slide.layout === 'gallery') {
    return `<div class="screen-pair" aria-label="Sugcar settings screens">
      <figure class="product-shot phone-frame product-shot--core">${phoneChrome()}<img src="assets/sugcar-settings-core.png" alt="Full Sugcar settings screen with appearance, glucose units and range, voice selection, and Lock Screen options." /></figure>
      <figure class="product-shot phone-frame product-shot--voice">${phoneChrome()}<img src="assets/sugcar-settings-voice.png" alt="Full Sugcar advanced voice settings screen with controls for unit, trend, range status, and time." /></figure>
    </div>`;
  }
  if (slide.layout === 'voice') {
    return `<section class="voice-card" aria-label="Examples of Sugcar’s configurable Siri feedback">
      <p class="voice-card-label">WHAT SIRI CAN SAY</p>
      <p class="voice-value">104 <small>mg/dL</small></p>
      <div class="trend-words" aria-label="Supported trend descriptions">
        <span><b>→</b> stable</span>
        <span><b>↗</b> rising slightly</span>
        <span><b>↑↑</b> rising rapidly</span>
        <span><b>↘</b> falling slightly</span>
        <span><b>↓↓</b> falling rapidly</span>
      </div>
    </section>`;
  }
  if (slide.layout === 'demo-app') {
    return `<section class="demo-stage" aria-label="Reserved placeholder for the Sugcar app walkthrough video">
      <p class="demo-kicker">APP WALKTHROUGH</p>
      <strong>Dashboard → settings → voice</strong>
      <small>Replace with your app walkthrough video</small>
    </section>`;
  }
  if (slide.layout === 'demo-driving') {
    return `<section class="demo-stage" aria-label="Reserved placeholder for the Sugcar Siri and CarPlay driving video">
      <p class="demo-kicker">DRIVING DEMO</p>
      <strong>Siri + CarPlay</strong>
      <small>Replace with your driving-context video</small>
    </section>`;
  }
  return '';
}

function render() {
  const slide = slides[activeIndex];
  coverIdentity.hidden = slide.layout !== 'cover';
  stage.className = `deck deck--${slide.layout}`;
  stage.setAttribute('aria-label', `Slide ${activeIndex + 1} of ${slides.length}`);
  eyebrow.textContent = slide.eyebrow;
  title.textContent = slide.title;
  body.replaceChildren(...slide.body.map((paragraph) => {
    const element = document.createElement('p');
    element.textContent = paragraph;
    return element;
  }));
  visual.innerHTML = visualFor(slide);
  counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  progress.style.transform = `scaleX(${(activeIndex + 1) / slides.length})`;
  previous.disabled = activeIndex === 0;
  next.disabled = activeIndex === slides.length - 1;
}

function navigate(index) {
  activeIndex = clampSlideIndex(index, slides.length);
  window.location.hash = slideHash(activeIndex);
  render();
}

previous.addEventListener('click', () => navigate(activeIndex - 1));
next.addEventListener('click', () => navigate(activeIndex + 1));
window.addEventListener('hashchange', () => { activeIndex = hashIndex(); render(); });
window.addEventListener('keydown', (event) => {
  if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) { event.preventDefault(); navigate(activeIndex + 1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); navigate(activeIndex - 1); }
  if (event.key === 'Home') { event.preventDefault(); navigate(0); }
  if (event.key === 'End') { event.preventDefault(); navigate(slides.length - 1); }
});

render();
