import test from 'node:test';
import assert from 'node:assert/strict';
import { slides, clampSlideIndex, slideHash } from '../src/deck.js';

test('deck has a concise eight-slide maker narrative', () => {
  assert.equal(slides.length, 8);
  assert.equal(slides[0].title, 'Sugcar');
  assert.deepEqual(slides.slice(1, 4).map((slide) => slide.layout), ['problem', 'away', 'flow']);
  assert.equal(slides.at(-1).layout, 'demo-driving');
  assert.match(slides.flatMap((slide) => slide.body).join(' '), /Nightscout \/ Gluroo/);
  assert.ok(slides.every((slide) => slide.body.length <= 2));
});

test('phone-away copy describes a nighttime voice check', () => {
  const away = slides.find((slide) => slide.layout === 'away');
  assert.ok(away);
  assert.equal(away.title, 'When the phone is out of reach.');
  assert.match(away.body.join(' '), /across the room.*especially at night/i);
  assert.match(away.body.join(' '), /without reaching for or waking the device/i);
});

test('navigation clamps indices and supplies stable slide hashes', () => {
  assert.equal(clampSlideIndex(-4, 7), 0);
  assert.equal(clampSlideIndex(50, 7), 6);
  assert.equal(slideHash(3), '#slide-4');
});

test('the safety language avoids overclaiming', () => {
  const copy = slides.flatMap((slide) => [slide.title, ...slide.body]).join(' ');
  assert.doesNotMatch(copy, /medical device|real-time guarantee|native CarPlay UI/i);
  assert.match(copy, /No new health-data cloud/i);
  assert.doesNotMatch(copy, /Secondary visualization|Verify with BGM/i);
});

test('voice feedback uses the app’s actual trend vocabulary and adds context', () => {
  const voiceSlide = slides.find((slide) => slide.layout === 'voice');
  assert.ok(voiceSlide);
  assert.match(voiceSlide.body.join(' '), /movement, and its age/i);
  assert.doesNotMatch(voiceSlide.body.join(' '), /secondary visualization/i);
});

test('the two demo slides keep the app walkthrough and driving moment distinct', () => {
  assert.deepEqual(slides.slice(-2).map((slide) => slide.layout), ['demo-app', 'demo-driving']);
});
