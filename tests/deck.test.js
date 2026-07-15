import test from 'node:test';
import assert from 'node:assert/strict';
import { slides, clampSlideIndex, slideHash } from '../src/deck.js';

test('deck has a concise eight-slide maker narrative', () => {
  assert.equal(slides.length, 8);
  assert.equal(slides[0].title, 'For moments when your attention belongs elsewhere.');
  assert.deepEqual(slides.slice(1, 3).map((slide) => slide.layout), ['problem', 'flow']);
  assert.equal(slides.at(-1).layout, 'closing');
  assert.match(slides.flatMap((slide) => slide.body).join(' '), /Nightscout \/ Gluroo/);
  assert.match(slides.flatMap((slide) => slide.body).join(' '), /does not create a Sugcar cloud account/i);
  assert.ok(slides.every((slide) => slide.body.length <= 2));
});

test('the phone-away idea is out of the active deck for now', () => {
  assert.equal(slides.some((slide) => slide.layout === 'away'), false);
});

test('cover leads with the personal safety moment', () => {
  const cover = slides[0];
  assert.equal(cover.title, 'For moments when your attention belongs elsewhere.');
  assert.equal(cover.body.join(' '), 'A personal iOS app for checking blood glucose by voice.');
  assert.doesNotMatch(cover.body.join(' '), /—|glance-based/i);
  assert.doesNotMatch(cover.body.join(' '), /safer/i);
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
  assert.equal(voiceSlide.title, 'The answer carries context.');
  assert.match(voiceSlide.body.join(' '), /reading stays central/i);
  assert.match(voiceSlide.body.join(' '), /unit, trend, range status, and age/i);
  assert.doesNotMatch(voiceSlide.body.join(' '), /secondary visualization/i);
});

test('settings and spoken-response slides describe distinct moments', () => {
  const settingsSlide = slides.find((slide) => slide.layout === 'gallery');
  const voiceSlide = slides.find((slide) => slide.layout === 'voice');
  assert.match(settingsSlide.body.join(' '), /routine.*units.*range.*voice.*appearance.*Lock Screen/i);
  assert.match(voiceSlide.body.join(' '), /spoken answer/i);
});

test('the two demo slides keep the app walkthrough and driving moment distinct', () => {
  assert.deepEqual(slides.slice(-3, -1).map((slide) => slide.layout), ['demo-app', 'demo-driving']);
  assert.match(slides.at(-2).body.join(' '), /With CarPlay connected, Siri speaks the latest glucose update/i);
});

test('the closing returns to the personal reason for the project', () => {
  const closing = slides.at(-1);
  assert.equal(closing.title, 'One important check. Less visual attention.');
  assert.match(closing.body.join(' '), /voice-first.*user in control/i);
  assert.match(closing.body.join(' '), /Diabetes asks a lot, every day\. Thoughtful technology can make one moment lighter\./);
});
