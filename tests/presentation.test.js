import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

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
  assert.match(script, /isWalkthroughFullscreen\(\)/);
  assert.match(script, /if \(isWalkthroughFullscreen\(\)\) return;/);
  assert.match(script, /Use ← → arrow keys to navigate/);
  assert.match(script, /<nav class="controls"[\s\S]*?<div class="navigation-status">[\s\S]*?<p class="navigation-hint">Use ← → arrow keys to navigate<\/p>[\s\S]*?<\/nav>/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});

test('navigation keeps a stable stage instead of replacing and refocusing the page', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  assert.doesNotMatch(script, /app\.innerHTML\s*=/);
  assert.doesNotMatch(script, /document\.querySelector\('#slide'\)\.focus\(\)/);
  assert.match(script, /const stage =/);
});

test('visual tokens follow Sugcar’s actual light interface and range colors', async () => {
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
  assert.match(script, /No Sugcar cloud account/);
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
  assert.match(script, /data-app-walkthrough/);
  assert.match(script, /class="video-player"/);
  assert.match(script, /class="video-actions"/);
  assert.match(script, /THE PRODUCT, UNFILTERED/);
  assert.match(script, /A working SwiftUI app with a real Siri intent\./);
  assert.match(script, /Live data and user-controlled voice response\./);
  assert.doesNotMatch(script, /IN THIS WALKTHROUGH/);
  assert.doesNotMatch(script, /data-video-play/);
  assert.match(script, /assets\/sugcar-app-walkthrough\.mp4/);
  assert.match(script, /assets\/sugcar-app-walkthrough-poster\.jpg/);
  assert.match(script, /data-video-fullscreen/);
  assert.match(script, /Watch app walkthrough/);
  assert.match(script, /Tap to play fullscreen/);
  assert.match(script, /class="video-play-symbol"/);
  assert.match(script, /closest\('\[data-app-walkthrough\]'\)/);
  assert.match(script, /playWalkthroughFullscreen/);
  assert.match(script, /requestFullscreen/);
  assert.match(script, /trigger\.hidden = true/);
  assert.match(script, /fullscreenchange/);
  assert.match(script, /webkitendfullscreen/);
  assert.match(script, /webkitpresentationmodechanged/);
  assert.match(script, /bindWalkthroughVideo/);
  assert.match(script, /\.pause\(\)/);
  assert.match(css, /\.demo-video\s*\{/);
  assert.match(css, /\.video-player\s*\{/);
  assert.match(css, /\.demo-video\s*\{[^}]*grid-template-columns:\s*minmax\(10\.5rem,\s*13\.5rem\)\s+minmax\(0,\s*1fr\)/s);
  assert.match(css, /\.demo-video\s*\{[^}]*gap:\s*clamp\(1\.25rem,\s*3\.5vw,\s*3\.75rem\)/s);
  assert.match(css, /\.video-actions\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.video-actions\s*\{[^}]*max-width:\s*13\.5rem/s);
  assert.match(css, /\.video-player\s*\{[^}]*justify-self:\s*end/s);
  assert.match(css, /\.video-player\s*\{[^}]*height:\s*min\(60vh,\s*34rem\)/s);
  assert.match(css, /\.video-actions\s*\{[^}]*border-top:\s*1px\s+solid\s+var\(--line\)/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*background:\s*var\(--range-good\)[^}]*color:\s*#fff/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*min-height:\s*4\.75rem/s);
  assert.match(css, /@keyframes video-play-pulse/);
  assert.match(css, /prefers-reduced-motion: reduce[^}]*video-play-symbol::after/s);
  assert.match(css, /\.video-fullscreen\s*\{[^}]*position:\s*static/s);
  assert.match(css, /\.video-player video\s*\{[^}]*object-fit:\s*contain/s);
  assert.doesNotMatch(css, /\.demo-video\s*\{[^}]*background:\s*var\(--navy\)/s);
  assert.match(css, /\.video-fullscreen\[hidden\]/);
  assert.match(script, /slide\.layout === 'demo-driving'/);
  assert.match(script, /slide\.layout === 'closing'/);
  assert.match(script, /class="closing-heart"/);
  assert.match(script, /class="closing-heart-wrap"/);
  assert.match(css, /\.closing-heart\s*\{/);
  assert.match(css, /\.closing-heart-wrap\s*\{[^}]*background:\s*var\(--soft-green\)/s);
  assert.match(css, /\.deck--closing\s+\.slide-content\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(16rem,\s*\.55fr\)/s);
  assert.match(css, /\.closing-proof\s*\{[^}]*min-height:\s*16rem/s);
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
  assert.match(script, /Siri, through the car’s audio\./);
  assert.match(script, /No separate in-car interface\./);
  assert.doesNotMatch(script, /Unit · trend · range · age — each optional/);
  assert.doesNotMatch(script, /add screenshot/i);
});

test('the deck mirrors Sugcar’s rounded system typography, full settings screens, and real Siri phrase', async () => {
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
  assert.match(css, /\.deck--cover\s+\.copy h1\s*\{[^}]*margin-bottom:\s*clamp\(2\.5rem,\s*4\.2vw,\s*4rem\)/s);
  assert.match(css, /\.deck--cover\s+\.cover-identity\s*\{[^}]*display:\s*none/s);
  assert.match(css, /\.siri-orb\s*\{/);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.navigation-hint\s*\{[^}]*display:\s*none/s);
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
  assert.match(css, /@media \(max-height: 820px\) and \(min-width: 761px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.slide-content\s*\{[^}]*min-height:\s*29rem/s);
  assert.match(css, /@media \(max-height: 820px\) and \(min-width: 761px\) and \(orientation: landscape\)\s*\{[\s\S]*?\.product-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*14\.75rem\)/s);
});
