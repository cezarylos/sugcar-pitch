import { clampSlideIndex, slideHash, slides } from './deck.js?v=20260716-21';

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
const copy = document.querySelector('.copy');
const slideContent = document.querySelector('.slide-content');
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
    return '';
  }
  if (slide.layout === 'problem') {
    return `<section class="voice-interaction" aria-label="Sugcar turns one Siri request into a spoken glucose update">
      <div class="voice-request-card">
        <span class="siri-orb"><img src="assets/siri-logo.png" alt="Siri" /></span>
        <div><p class="voice-step-label">VOICE REQUEST</p><p class="voice-command">“Hey Siri, check my blood sugar.”</p></div>
      </div>
      <div class="voice-wave-bridge" aria-hidden="true"><i class="cover-wave"><b></b><b></b><b></b><b></b><b></b></i></div>
      <div class="voice-response-card">
        <div class="voice-response-heading"><span class="voice-speaking-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg></span><p class="voice-step-label">AUDIO RESPONSE</p></div>
        <p class="voice-response-sentence">104 mg/dL · stable · in range · 1 minute ago</p>
      </div>
      <p class="voice-boundary">Informational only · Verify with BGM</p>
    </section>`;
  }
  if (slide.layout === 'flow') {
    return `<div class="flow-wrap" aria-label="Direct data flow from the user’s Gluroo or Nightscout source to Sugcar on iPhone, then Siri, Lock Screen, and optional speech">
      <div class="flow">
        <span>Your Gluroo /<br>Nightscout</span><i>→</i><span>Sugcar<br><small>on iPhone</small></span><i>→</i><span>Siri<br><small>Lock Screen · Speech</small></span>
      </div>
      <p class="flow-note"><b>No Sugcar cloud account</b> Your existing source stays in control.</p>
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
      <p class="voice-card-label">CONFIGURE THE RESPONSE</p>
      <div class="voice-options" aria-label="Each response detail is independently optional">
        <span>Reading</span><span>Unit</span><span>Trend</span><span>Range status</span><span>Age</span>
      </div>
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
    return `<section class="demo-video" aria-label="Sugcar app walkthrough video">
      <div class="video-actions" aria-label="App walkthrough controls">
        <p class="video-kicker">SEE IT IN USE</p>
        <p class="video-statement">Dashboard, personal settings, and a configurable voice response.</p>
        <button class="video-fullscreen" type="button" data-video-fullscreen aria-label="Play the Sugcar app walkthrough in fullscreen">
          <span class="video-play-symbol" aria-hidden="true">▶</span>
          <span class="video-play-copy"><strong>Watch app walkthrough</strong><small>Tap to play fullscreen</small></span>
        </button>
      </div>
      <div class="video-phone-shell">
        <div class="video-player media-player">
          <video data-demo-video playsinline preload="metadata" poster="assets/sugcar-app-walkthrough-poster.jpg?v=20260715-2">
            <source src="assets/sugcar-app-walkthrough.mp4?v=20260715-2" type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <button class="video-thumbnail-play" type="button" data-video-fullscreen aria-label="Play the Sugcar app walkthrough in fullscreen" aria-hidden="true" disabled><span aria-hidden="true">▶</span></button>
        </div>
      </div>
    </section>`;
  }
  if (slide.layout === 'demo-driving') {
    return `<section class="driving-video media-player" aria-label="Sugcar Siri interaction through CarPlay">
      <video data-demo-video playsinline preload="metadata" poster="assets/sugcar-driving-demo-poster.jpg?v=20260716-1">
        <source src="assets/sugcar-driving-demo.mp4?v=20260716-2" type="video/mp4" />
        Your browser does not support video playback.
      </video>
      <button class="video-thumbnail-play" type="button" data-video-fullscreen aria-label="Play the Sugcar CarPlay driving demo in fullscreen" aria-hidden="true" disabled><span aria-hidden="true">▶</span></button>
    </section>`;
  }
  if (slide.layout === 'closing') {
    return `<section class="closing-proof" aria-label="Sugcar’s personal project principle">
      <span class="closing-heart-wrap" aria-hidden="true"><svg class="closing-heart" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" /></svg></span>
      <p>${slide.body[1]}</p>
    </section>`;
  }
  return '';
}

function animateSlideContents(slide) {
  [copy, visual].forEach((element) => element.getAnimations().forEach((animation) => animation.cancel()));
  if (slide.layout === 'cover' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const keyframes = [
    { opacity: 0, transform: 'translateY(1rem)' },
    { opacity: 1, transform: 'translateY(0)' }
  ];
  const timing = { duration: 380, easing: 'cubic-bezier(.22, .8, .3, 1)', fill: 'both' };
  copy.animate(keyframes, timing);
  if (visual.children.length) visual.animate(keyframes, { ...timing, delay: 70 });
}

function resetSlideScroll() {
  slideContent.scrollTop = 0;
  window.scrollTo(0, 0);
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
  bindDemoVideo();
  counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  progress.style.transform = `scaleX(${(activeIndex + 1) / slides.length})`;
  previous.disabled = activeIndex === 0;
  next.disabled = activeIndex === slides.length - 1;
  resetSlideScroll();
  animateSlideContents(slide);
}

function navigate(index) {
  const targetIndex = clampSlideIndex(index, slides.length);
  if (targetIndex === activeIndex) return;
  activeIndex = targetIndex;
  window.location.hash = slideHash(activeIndex);
  render();
}

previous.addEventListener('click', () => navigate(activeIndex - 1));
next.addEventListener('click', () => navigate(activeIndex + 1));
window.addEventListener('hashchange', () => { activeIndex = hashIndex(); render(); });
window.addEventListener('keydown', (event) => {
  if (isDemoFullscreen()) return;
  if (['ArrowRight', ' ', 'PageDown'].includes(event.key)) { event.preventDefault(); navigate(activeIndex + 1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); navigate(activeIndex - 1); }
  if (event.key === 'Home') { event.preventDefault(); navigate(0); }
  if (event.key === 'End') { event.preventDefault(); navigate(slides.length - 1); }
});

function playDemoFullscreen(video, trigger) {
  video.controls = true;
  const enterFullscreen = video.requestFullscreen ?? video.webkitEnterFullscreen;
  const playInline = () => {
    if (trigger) trigger.hidden = true;
    video.play().catch(() => {});
  };
  if (!enterFullscreen) {
    playInline();
    return;
  }
  try {
    const result = enterFullscreen.call(video);
    if (result?.catch) result.catch(playInline);
    video.play().catch(() => {});
  } catch {
    playInline();
  }
}

app.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-video-fullscreen]');
  const thumbnail = event.target.closest('[data-demo-video]');
  if (!trigger && !thumbnail) return;
  const video = thumbnail ?? document.querySelector('[data-demo-video]');
  if (!video) return;
  if (thumbnail) event.preventDefault();
  playDemoFullscreen(video, trigger);
});

function pauseDemo() {
  const video = document.querySelector('[data-demo-video]');
  if (!video) return;
  video.pause();
  video.controls = false;
}

function isDemoFullscreen() {
  const video = document.querySelector('[data-demo-video]');
  if (!video) return false;
  return document.fullscreenElement === video || video.webkitPresentationMode === 'fullscreen' || Boolean(video.webkitDisplayingFullscreen);
}

function bindDemoVideo() {
  const video = visual.querySelector('[data-demo-video]');
  if (!video) return;
  const player = video.closest('.media-player');
  const videoActions = visual.querySelector('.video-actions');
  const thumbnailPlay = player?.querySelector('.video-thumbnail-play');
  const revealDemoPlay = () => {
    if (!player || !thumbnailPlay || player.classList.contains('is-ready')) return;
    player.classList.add('is-ready');
    videoActions?.classList.add('is-ready');
    thumbnailPlay.disabled = false;
    thumbnailPlay.removeAttribute('aria-hidden');
  };
  requestAnimationFrame(revealDemoPlay);
  const pauseOnFullscreenExit = () => {
    const isWebKitFullscreen = video.webkitPresentationMode === 'fullscreen' || video.webkitDisplayingFullscreen;
    if (!document.fullscreenElement && !isWebKitFullscreen) {
      video.pause();
      video.controls = false;
    }
  };
  video.addEventListener('fullscreenchange', pauseOnFullscreenExit);
  video.addEventListener('webkitendfullscreen', () => {
    video.pause();
    video.controls = false;
  });
  video.addEventListener('webkitpresentationmodechanged', pauseOnFullscreenExit);
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) pauseDemo();
});

render();
