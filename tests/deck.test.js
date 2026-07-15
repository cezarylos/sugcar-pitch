import test from 'node:test';
import assert from 'node:assert/strict';
import { slides, clampSlideIndex, slideHash } from '../src/deck.js';

test('deck has an honest nine-slide maker narrative', () => {
  assert.equal(slides.length, 9);
  assert.match(slides[0].title, /personal/i);
  assert.match(slides[6].body.join(' '), /Keychain/);
});

test('navigation clamps indices and supplies stable slide hashes', () => {
  assert.equal(clampSlideIndex(-4, 9), 0);
  assert.equal(clampSlideIndex(50, 9), 8);
  assert.equal(slideHash(3), '#slide-4');
});

test('the safety language avoids overclaiming', () => {
  const copy = slides.flatMap((slide) => [slide.title, ...slide.body]).join(' ');
  assert.doesNotMatch(copy, /medical device|real-time guarantee|native CarPlay UI/i);
  assert.match(copy, /secondary visualization/i);
  assert.match(copy, /verify.*BGM/i);
});
