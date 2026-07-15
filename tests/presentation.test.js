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

test('the product story uses supplied screens, a clear voice readout, and two demo slides', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  assert.match(script, /assets\/sugcar-dashboard\.png/);
  assert.match(script, /assets\/sugcar-settings-core\.png/);
  assert.match(script, /assets\/sugcar-settings-voice\.png/);
  assert.match(script, /slide\.layout === 'demo-app'/);
  assert.match(script, /slide\.layout === 'demo-driving'/);
  assert.match(script, /slide\.layout === 'voice'/);
  assert.doesNotMatch(script, /voice-reading/);
  assert.match(script, /→<\/b> stable/);
  assert.match(script, /↗<\/b> rising slightly/);
  assert.match(script, /↑↑<\/b> rising rapidly/);
  assert.match(script, /↘<\/b> falling slightly/);
  assert.match(script, /↓↓<\/b> falling rapidly/);
  assert.doesNotMatch(script, /rising quickly|falling quickly/);
  assert.match(script, /falling rapidly/);
  assert.doesNotMatch(script, /rising slightly<\/strong>, in range/);
  assert.match(script, /app walkthrough/i);
  assert.match(script, /Siri \+ CarPlay/);
  assert.doesNotMatch(script, /Unit · trend · range · age — each optional/);
  assert.doesNotMatch(script, /add screenshot/i);
});

test('the deck mirrors Sugcar’s rounded system typography, full settings screens, and real Siri phrase', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const deck = await readFile(new URL('../src/deck.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(script, /“Hey Siri, check my blood sugar\.”/);
  assert.match(deck, /The moment you should not look at your phone\./);
  assert.doesNotMatch(deck, /I built it because checking glucose/);
  assert.match(deck, /One question\. No\u00a0screen hunt\./);
  assert.match(css, /ui-rounded/);
  assert.match(css, /\.phone-frame > img\s*\{[^}]*min-height:\s*0[^}]*object-fit:\s*fill/s);
  assert.doesNotMatch(script, /Current signal, at a glance/);
});

test('cover uses the real Sugcar icon and an uncropped iPhone-style device frame', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
  const deck = await readFile(new URL('../src/deck.js', import.meta.url), 'utf8');
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(script, /assets\/sugcar-brand-icon\.png/);
  assert.match(script, /phone-frame/);
  assert.match(script, /phone-island/);
  assert.equal((script.match(/product-shot phone-frame/g) ?? []).length, 2);
  assert.match(deck, /The moment you should not look at your phone\./);
  assert.match(css, /--phone-frame:/);
  assert.match(css, /\.hero-shot\.phone-frame/);
  assert.match(css, /aspect-ratio:\s*70\.6\s*\/\s*146\.6/);
  assert.match(css, /aspect-ratio:\s*393\s*\/\s*852/);
  assert.match(css, /\.deck--cover\s+\.copy h1\s*\{[^}]*max-width:\s*10ch/s);
  assert.match(css, /\.deck--cover\s+\.cover-identity\s*\{[^}]*display:\s*none/s);
  assert.match(css, /\.deck--cover\s+\.hero-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*18rem\)/s);
  assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.navigation-hint\s*\{[^}]*display:\s*none/s);
});

test('phone frames fit the stage and settings screens share one vertical baseline', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /\.hero-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*15\.75rem\)/s);
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
  assert.match(css, /\.product-shot\.phone-frame\s*>\s*img\s*\{[^}]*border-radius:\s*2\.05rem/s);
  assert.match(css, /\.cover-identity\s*\{/);
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.screen-pair\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(css, /@media \(max-height: 760px\) and \(min-width: 761px\)\s*\{[\s\S]*?\.slide-content\s*\{[^}]*min-height:\s*29rem/s);
  assert.match(css, /@media \(max-height: 760px\) and \(min-width: 761px\)\s*\{[\s\S]*?\.hero-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*14\.75rem\)/s);
});
