import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('public branding uses one navy SugCar wordmark', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const deck = await readFile(new URL('../src/deck.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const publicCopy = [html, script, deck, readme].join('\n');

  assert.match(script, /<span class="brand-word">SugCar<\/span>/);
  assert.match(script, /<span>SugCar<\/span>/);
  assert.doesNotMatch(script, /Sug<span>car<\/span>/);
  assert.doesNotMatch(css, /\.brand-word span\s*\{/);
  assert.doesNotMatch(publicCopy, /Sugcar/);
});

test('presentation shell exposes accessible keyboard-first controls', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(html, /<main id="app"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /styles\.css\?v=/);
  assert.match(html, /src\/main\.js\?v=/);
  assert.match(script, /ArrowRight/);
  assert.match(script, /ArrowLeft/);
  assert.match(script, /isDemoFullscreen\(\)/);
  assert.match(script, /if \(isDemoFullscreen\(\)\) return;/);
  assert.match(script, /Use ← → arrow keys to navigate/);
  assert.match(script, /<nav class="controls"[\s\S]*?<div class="navigation-status">[\s\S]*?<p class="navigation-hint">Use ← → arrow keys to navigate<\/p>[\s\S]*?<\/nav>/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});

test('navigation keeps a stable stage instead of replacing and refocusing the page', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.doesNotMatch(script, /app\.innerHTML\s*=/);
  assert.doesNotMatch(script, /document\.querySelector\('#slide'\)\.focus\(\)/);
  assert.match(script, /const stage =/);
  assert.match(css, /\.deck\s*\{[^}]*(?:^|;\s*)height:\s*100dvh/s);
  assert.match(css, /\.deck\s*\{[^}]*--stage-min-height:\s*33rem/s);
  assert.match(css, /\.slide-content\s*\{[^}]*min-height:\s*var\(--stage-min-height\)/s);
  assert.match(css, /\.deck--cover\s+\.slide-content\s*\{[^}]*min-height:\s*var\(--stage-min-height\)/s);
});

test('mobile keeps navigation fixed while each slide scrolls above it', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.deck\s*\{[^}]*padding:[^}]*calc\(var\(--mobile-nav-height\)/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.slide-content\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.controls\s*\{[^}]*position:\s*fixed[^}]*bottom:\s*0[^}]*safe-area-inset-bottom/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.deck\s*\{[^}]*height:\s*100dvh/s);
  assert.match(script, /const slideContent = document\.querySelector\('\.slide-content'\);/);
  assert.match(script, /slideContent\.scrollTop = 0;/);
  assert.match(script, /window\.scrollTo\(0, 0\);/);
});

test('the mobile voice exchange is centered as one clear vertical sequence', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.voice-interaction\s*\{[^}]*justify-items:\s*center/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.voice-request-card,\s*\.voice-response-card\s*\{[^}]*justify-items:\s*center[^}]*text-align:\s*center/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.voice-wave-bridge\s*\{[^}]*justify-content:\s*center/s);
});

test('navigation ignores requests for the already active slide', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  assert.match(script, /function navigate\(index\)\s*\{\s*const targetIndex = clampSlideIndex\(index, slides\.length\);\s*if \(targetIndex === activeIndex\) return;/s);
});

test('visual tokens follow SugCar’s actual light interface and range colors', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /--app-background:\s*#f0f4fc/);
  assert.match(css, /--card:\s*#ffffff/);
  assert.match(css, /--range-good:\s*#145714/);
  assert.match(css, /--range-low:\s*#751a1c/);
});

test('the product story uses supplied screens, a clear voice exchange, and two demo slides', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(script, /class="voice-interaction"/);
  assert.match(script, /class="voice-request-card"/);
  assert.match(script, /class="voice-response-card"/);
  assert.match(script, /class="voice-wave-bridge"/);
  assert.match(script, /assets\/siri-logo\.png/);
  assert.match(script, /VOICE REQUEST/);
  assert.match(script, /AUDIO RESPONSE/);
  assert.match(script, /104 mg\/dL · stable · in range · 1 minute ago/);
  assert.doesNotMatch(script, /104 mg\/dL · stable · in range · 1 minute ago\./);
  assert.match(script, /class="voice-response-sentence"/);
  assert.match(script, /class="voice-speaking-icon"/);
  assert.match(script, /<svg[^>]*viewBox="0 0 24 24"/);
  assert.match(script, /No SugCar cloud account/);
  assert.doesNotMatch(script, /class="problem-visual"/);
  assert.doesNotMatch(script, /class="problem-bridge"/);
  assert.match(css, /\.voice-interaction\s*\{[^}]*grid-template-columns:/s);
  assert.match(css, /\.voice-request-card\s*,\s*\.voice-response-card\s*\{/);
  assert.match(css, /\.voice-response-sentence\s*\{/);
  assert.match(css, /\.voice-speaking-icon\s*\{[^}]*background:\s*var\(--soft-green\)/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.voice-interaction\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(script, /assets\/sugcar-settings-core\.png/);
  assert.match(script, /assets\/sugcar-settings-voice\.png/);
  assert.match(script, /slide\.layout === 'demo-app'/);
  assert.equal((script.match(/<video data-demo-video/g) ?? []).length, 2);
  assert.match(script, /class="video-phone-shell"/);
  assert.match(script, /class="video-player media-player"/);
  assert.match(script, /class="video-phone-shell">\s*<div class="video-player media-player">/);
  assert.doesNotMatch(script, /class="video-player phone-frame"/);
  assert.match(script, /class="video-thumbnail-play"[^>]*data-video-fullscreen/);
  assert.doesNotMatch(script, /video\.addEventListener\('canplay'/);
  assert.match(script, /requestAnimationFrame\(revealDemoPlay\)/);
  assert.match(script, /class="video-actions"/);
  assert.match(script, /SEE IT IN USE/);
  assert.match(script, /Dashboard, personal settings, and a configurable voice response\./);
  assert.doesNotMatch(script, /IN THIS WALKTHROUGH/);
  assert.doesNotMatch(script, /data-video-play/);
  assert.match(script, /assets\/sugcar-app-walkthrough\.mp4/);
  assert.match(script, /assets\/sugcar-app-walkthrough-poster\.jpg/);
  assert.match(script, /assets\/sugcar-driving-demo\.mp4/);
  assert.match(script, /assets\/sugcar-driving-demo-poster\.jpg/);
  assert.doesNotMatch(script, /data-demo-video controls/);
  assert.equal((script.match(/class="video-thumbnail-play"/g) ?? []).length, 2);
  assert.match(script, /video\.controls = true/);
  assert.match(script, /video\.controls = false/);
  assert.match(script, /data-video-fullscreen/);
  assert.match(script, /Watch app walkthrough/);
  assert.match(script, /Tap to play fullscreen/);
  assert.match(script, /class="video-play-symbol"/);
  assert.match(script, /closest\('\[data-demo-video\]'\)/);
  assert.match(script, /playDemoFullscreen/);
  assert.match(script, /requestFullscreen/);
  assert.match(script, /trigger\.hidden = true/);
  assert.match(script, /fullscreenchange/);
  assert.match(script, /webkitendfullscreen/);
  assert.match(script, /webkitpresentationmodechanged/);
  assert.match(script, /bindDemoVideo/);
  assert.match(script, /\.pause\(\)/);
  assert.match(css, /\.demo-video\s*\{/);
  assert.match(css, /\.video-player\s*\{/);
  assert.match(css, /\.demo-video\s*\{[^}]*grid-template-columns:\s*minmax\(10\.5rem,\s*13\.5rem\)\s+minmax\(0,\s*1fr\)/s);
  assert.match(css, /\.demo-video\s*\{[^}]*gap:\s*clamp\(1\.25rem,\s*3\.5vw,\s*3\.75rem\)/s);
  assert.match(css, /\.video-actions\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.video-actions\s*\{[^}]*max-width:\s*13\.5rem/s);
  assert.match(css, /\.video-player\s*\{[^}]*justify-self:\s*end/s);
  assert.match(css, /\.video-actions\s*\{[^}]*border-top:\s*1px\s+solid\s+var\(--line\)/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*background:\s*var\(--range-good\)[^}]*color:\s*#fff/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*min-height:\s*4\.75rem/s);
  assert.doesNotMatch(css, /video-play-symbol::after|video-thumbnail-play::before/);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*position:\s*static/s);
  assert.match(css, /\.video-player video\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(css, /\.video-phone-shell\s*\{[^}]*width:\s*min\(100%,\s*17\.25rem\)[^}]*height:\s*auto[^}]*justify-self:\s*end[^}]*margin:\s*0[^}]*overflow:\s*visible/s);
  assert.doesNotMatch(css, /\.video-phone-shell\s+\.phone-island/);
  assert.match(css, /\.video-phone-shell\s+\.video-player\s*\{[^}]*width:\s*auto[^}]*height:\s*100%[^}]*aspect-ratio:\s*1180\s*\/\s*2556/s);
  assert.match(css, /\.video-thumbnail-play\s*\{[^}]*min-width:\s*4rem[^}]*min-height:\s*4rem[^}]*position:\s*absolute[^}]*z-index:\s*3/s);
  assert.match(css, /\.media-player\.is-ready\s+\.video-thumbnail-play\s*\{[^}]*animation:\s*video-play-entrance/s);
  assert.match(css, /\.video-play-symbol\s*\{[^}]*opacity:\s*0[^}]*transform:\s*scale\(\.72\)/s);
  assert.match(css, /\.video-actions\.is-ready\s+\.video-play-symbol\s*\{[^}]*animation:\s*video-play-entrance/s);
  assert.match(css, /@keyframes video-play-entrance/);
  assert.match(css, /\.driving-video\s*\{[^}]*width:\s*min\(100%,\s*48rem\)[^}]*aspect-ratio:\s*16\s*\/\s*9[^}]*border:\s*1px\s+solid\s+var\(--line\)[^}]*border-radius:\s*1\.25rem[^}]*overflow:\s*hidden/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.driving-video\s*\{[^}]*width:\s*100%/s);
  assert.doesNotMatch(css, /\.demo-video\s*\{[^}]*background:\s*var\(--navy\)/s);
  assert.match(css, /\.video-fullscreen\[hidden\]/);
  assert.match(script, /slide\.layout === 'demo-driving'/);
  assert.match(script, /slide\.layout === 'closing'/);
  assert.match(script, /class="closing-heart"/);
  assert.match(script, /class="closing-heart-wrap"/);
  assert.match(css, /\.closing-heart\s*\{/);
  assert.match(css, /\.closing-heart-wrap\s*\{[^}]*background:\s*var\(--soft-green\)/s);
  assert.match(css, /\.deck--closing\s+\.slide-content\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(16rem,\s*\.55fr\)/s);
  assert.doesNotMatch(css, /\.deck--closing\s+\.copy h1\s*\{[^}]*white-space:\s*pre-line/s);
  assert.match(css, /\.deck--closing\s+\.body p:first-child\s*\{[^}]*font-weight:\s*400/s);
  assert.match(css, /\.closing-proof\s*\{[^}]*min-height:\s*16rem/s);
  assert.match(script, /class="closing-contact"/);
  assert.match(script, /Curious about SugCar\?/);
  assert.match(script, /Want to try it, share feedback, or just ask a question\? I’d love to hear from you\./);
  assert.match(script, /Please don’t include personal health information\./);
  assert.match(script, /<span>Contact me<\/span>/);
  assert.match(script, /class="contact-icon"[^>]*aria-hidden="true"/);
  assert.match(script, /href="mailto:sugcar\.app@gmail\.com"/);
  assert.match(script, /target="_blank"/);
  assert.match(script, /rel="noopener noreferrer"/);
  assert.match(script, /aria-label="Contact SugCar by email at sugcar\.app@gmail\.com"/);
  assert.match(css, /\.closing-contact\s*\{[^}]*border-top:\s*1px\s+solid\s+var\(--line\)/s);
  assert.match(css, /\.closing-contact-link\s*\{[^}]*color:\s*#fff[^}]*background:\s*var\(--range-good\)/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.closing-contact\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(script, /slide\.layout === 'voice'/);
  assert.match(script, /class="voice-options"/);
  assert.match(script, /Range status/);
  assert.match(css, /\.voice-options\s*\{[^}]*flex-wrap:\s*wrap/s);
  assert.doesNotMatch(script, /voice-reading/);
  assert.match(script, /→<\/b> stable/);
  assert.match(script, /↗<\/b> rising slightly/);
  assert.match(script, /↑↑<\/b> rising rapidly/);
  assert.match(script, /↘<\/b> falling slightly/);
  assert.match(script, /↓↓<\/b> falling rapidly/);
  assert.match(css, /\.trend-words b\s*\{[^}]*color:\s*var\(--navy\)/s);
  assert.doesNotMatch(script, /rising quickly|falling quickly/);
  assert.match(script, /falling rapidly/);
  assert.doesNotMatch(script, /rising slightly<\/strong>, in range/);
  assert.match(script, /app walkthrough/i);
  assert.match(script, /aria-label="SugCar Siri interaction through CarPlay"/);
  assert.match(script, /aria-label="Play the SugCar CarPlay driving demo in fullscreen"/);
  assert.doesNotMatch(script, /Unit · trend · range · age — each optional/);
  assert.doesNotMatch(script, /add screenshot/i);
});

test('the deck mirrors SugCar’s rounded system typography, full settings screens, and real Siri phrase', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const deck = await readFile(new URL('../src/deck.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(script, /“Hey Siri, check my blood sugar\.”/);
  assert.match(deck, /For moments when your attention belongs elsewhere\./);
  assert.doesNotMatch(deck, /I built it because checking glucose/);
  assert.match(deck, /One question\. No\u00a0screen hunt\./);
  assert.match(css, /ui-rounded/);
  assert.match(css, /\.phone-frame > img\s*\{[^}]*min-height:\s*0[^}]*object-fit:\s*fill/s);
  assert.doesNotMatch(script, /Current signal, at a glance/);
});

test('cover keeps an editorial hero while slide 2 makes the Siri exchange explicit', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const deck = await readFile(new URL('../src/deck.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(script, /assets\/sugcar-brand-icon\.png/);
  assert.doesNotMatch(script, /class="cover-proof"/);
  assert.match(script, /class="siri-orb"/);
  assert.match(script, /assets\/siri-logo\.png/);
  assert.match(script, /class="voice-interaction"/);
  assert.match(script, /class="voice-wave-bridge"/);
  assert.doesNotMatch(script, /class="problem-shot phone-frame"/);
  assert.equal((script.match(/product-shot phone-frame/g) ?? []).length, 2);
  assert.match(deck, /For moments when your attention belongs elsewhere\./);
  assert.match(css, /\.deck--cover\s+\.slide-content\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /\.deck--cover\s+\.copy h1\s*\{[^}]*max-width:\s*12ch/s);
  assert.match(css, /\.deck\s*\{[^}]*--title-body-gap:\s*clamp\(1\.25rem,\s*2vw,\s*1\.75rem\)/s);
  assert.match(css, /\.body\s*\{[^}]*margin-top:\s*var\(--title-body-gap\)/s);
  assert.doesNotMatch(css, /\.deck--cover\s+\.copy h1\s*\{[^}]*margin-bottom:/s);
  assert.match(css, /\.deck--cover\s+\.cover-identity\s*\{[^}]*display:\s*none/s);
  assert.match(css, /\.siri-orb\s*\{/);
  assert.match(css, /\.deck--cover\s+\[data-title\]\s*\{[^}]*animation:\s*cover-copy-in/s);
  assert.match(css, /\.deck--cover\s+\[data-body\]\s*\{[^}]*animation:\s*cover-copy-in/s);
  assert.match(css, /@keyframes cover-copy-in/);
  assert.match(script, /function animateSlideContents\(slide\)/);
  assert.match(script, /const copy = document\.querySelector\('\.copy'\);/);
  assert.match(script, /if \(slide\.layout === 'cover' \|\| window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches\) return;/);
  assert.match(script, /copy\.animate\(/);
  assert.match(script, /visual\.animate\(/);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.navigation-hint\s*\{[^}]*display:\s*none/s);
});

test('mobile cover copy stays as prominent as the rest of the deck and the Siri wave stands alone', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.deck--cover\s+\.copy h1\s*\{[^}]*font-size:\s*clamp\(2\.8rem,\s*13vw,\s*4\.5rem\)/s);
  assert.doesNotMatch(script, /<div class="voice-wave-bridge"[^>]*>[\s\S]*?<span>→<\/span>/);
});

test('the landscape driving-demo frame fits within a portrait mobile viewport', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.driving-video\s*\{[^}]*width:\s*100%[^}]*max-width:\s*100%[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
  assert.match(css, /\[data-demo-video\]:fullscreen,\s*\[data-demo-video\]:-webkit-full-screen\s*\{[^}]*width:\s*100vw[^}]*height:\s*100vh[^}]*object-fit:\s*contain[^}]*background:\s*#000/s);
});

test('closing copy and mobile spacing use the same calm secondary-text rhythm', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /\.deck--closing\s+\.body p:first-child\s*\{[^}]*color:\s*var\(--muted\)[^}]*font-weight:\s*400/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.slide-content\s*\{[^}]*gap:\s*1\.5rem/s);
  assert.match(css, /\.body\s*\{[^}]*margin-top:\s*var\(--title-body-gap\)/s);
  assert.doesNotMatch(css, /\.deck--closing\s+\.body\s*\{[^}]*margin-top:/s);
  assert.doesNotMatch(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.body\s*\{[^}]*margin-top:/s);
  assert.doesNotMatch(css, /@media \(max-width: 1100px\)[\s\S]*?\.body\s*\{[^}]*margin-top:/s);
});

test('tablet layouts keep a stable frame and use compact portrait compositions', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(min-width: 761px\) and \(max-width: 1180px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.deck\s*\{[^}]*padding:\s*2rem\s+clamp\(2\.5rem,\s*5vw,\s*3\.75rem\)\s+1\.5rem[^}]*gap:\s*1\.5rem/s);
  assert.doesNotMatch(css, /@media \(max-height: 820px\)[\s\S]*?\.deck--gallery\s*\{[^}]*(?:padding-top|padding-bottom|gap):/s);
  assert.match(css, /@media \(max-width: 1100px\) and \(min-width: 761px\) and \(orientation: portrait\)\s*\{[\s\S]*?\.deck:not\(\.deck--cover\) \.slide-content\s*\{[^}]*grid-template-rows:\s*auto\s+auto[^}]*align-content:\s*center[^}]*gap:\s*clamp\(2rem,\s*4vh,\s*3\.25rem\)/s);
  assert.match(css, /@media \(max-width: 1100px\) and \(min-width: 761px\) and \(orientation: portrait\)\s*\{[\s\S]*?\.deck:not\(\.deck--cover\) \.visual\s*\{[^}]*align-self:\s*center/s);
  assert.match(css, /@media \(min-width: 900px\) and \(max-width: 1100px\) and \(orientation: portrait\)\s*\{[\s\S]*?\.deck:not\(\.deck--cover\) \.slide-content\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.88fr\)\s+minmax\(20rem,\s*1\.12fr\)[^}]*grid-template-rows:\s*1fr/s);
});

test('phone frames fit the stage and settings screens share one vertical baseline', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /\.phone-frame\s*\{[^}]*border-radius:\s*16%\s*\/\s*7\.7%/s);
  assert.match(css, /\.phone-frame > img\s*\{[^}]*border-radius:\s*14\.6%\s*\/\s*6\.8%/s);
  assert.match(css, /\.product-shot\.phone-frame\s*\{[^}]*border-radius:\s*16%\s*\/\s*7\.7%/s);
  assert.match(css, /@media \(max-width: 1100px\) and \(min-width: 761px\) and \(orientation: portrait\)/);
  assert.match(css, /@media \(max-height: 820px\) and \(min-width: 761px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.deck--problem\s*\{[^}]*gap:\s*1\.5rem/s);
  assert.doesNotMatch(css, /\.product-shot--voice\s*\{[^}]*transform\s*:/s);
});

test('cover identity remains while the phone-away slide stays out of the active deck', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  assert.match(script, /class="cover-identity"/);
  assert.match(script, /assets\/sugcar-brand-icon\.png/);
  assert.doesNotMatch(script, /slide\.layout === 'away'/);
  assert.doesNotMatch(script, /class="away-card"/);
});

test('settings frames use the recovered desktop space and stack on narrow mobile screens', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /\.screen-pair\s*\{[^}]*display:\s*flex[^}]*justify-content:\s*center/s);
  assert.match(css, /\.screen-pair\s*\{[^}]*min-height:\s*36rem/s);
  assert.match(css, /\.product-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*17\.25rem\)/s);
  assert.doesNotMatch(css, /\.product-shot\.phone-frame\s*>\s*img\s*\{/s);
  assert.match(css, /\.cover-identity\s*\{/);
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.screen-pair\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.video-phone-shell\s*\{[^}]*width:\s*min\(100%,\s*14\.5rem\)/s);
  assert.match(css, /@media \(max-width: 1100px\) and \(min-width: 761px\) and \(orientation: portrait\)\s*\{[\s\S]*?\.video-phone-shell\s*\{[^}]*width:\s*min\(100%,\s*13\.75rem\)/s);
  assert.match(css, /@media \(max-height: 820px\) and \(min-width: 761px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.deck\s*\{[^}]*--stage-min-height:\s*29rem/s);
  assert.match(css, /@media \(max-height: 820px\) and \(min-width: 761px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.product-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*14\.75rem\)/s);
  assert.match(css, /@media \(max-height: 820px\) and \(min-width: 761px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.video-phone-shell\s*\{[^}]*width:\s*min\(100%,\s*14\.75rem\)/s);
});
