# Sugcar Safety-Moment Cover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Sugcar’s generic cover with a distinctive, personal safety-moment opening and remove the desktop keyboard cue from mobile screens.

**Architecture:** Keep the slide model unchanged except for concise cover copy. Add a `deck--cover`-scoped visual treatment so the opening can use a different composition without affecting the explanatory slides. Keep the existing dynamic stage, real dashboard screenshot, brand asset, and responsive height safeguards.

**Tech Stack:** Static HTML, CSS, and browser-native JavaScript; Node test runner.

## Global Constraints

- Use the existing Sugcar palette, brand icon, and dashboard screenshot.
- Keep the product framed as a personal iOS project; do not imply certification, new health-data storage, or safety guarantees.
- Preserve the full screenshot, keyboard navigation, reduced-motion support, and stable 1280×720 layout.
- Hide only the keyboard hint at `max-width: 760px`; do not address the deferred 765px slide-3/4 layout issue in this change.

---

### Task 1: Establish the safety-moment cover message

**Files:**
- Modify: `src/deck.js:2-7`
- Modify: `tests/deck.test.js:5-18`

**Interfaces:**
- Consumes: The cover slide object consumed by `render()` in `src/main.js`.
- Produces: Cover text with the headline `The moment you should not look at your phone.` and a personal voice-first supporting line.

- [ ] **Step 1: Write the failing test**

```js
test('cover leads with the personal safety moment', () => {
  const cover = slides[0];
  assert.equal(cover.title, 'The moment you should not look at your phone.');
  assert.match(cover.body.join(' '), /personal iOS project.*voice-first/i);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --test-name-pattern="cover leads with the personal safety moment"`

Expected: FAIL because the current cover title is `Sugcar`.

- [ ] **Step 3: Write minimal implementation**

```js
{
  eyebrow: 'A personal iOS project',
  title: 'The moment you should not look at your phone.',
  body: ['A safer, voice-first way to check glucose while driving.'],
  layout: 'cover'
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --test-name-pattern="cover leads with the personal safety moment"`

Expected: PASS.

### Task 2: Give the cover a distinct composition and remove the mobile keyboard hint

**Files:**
- Modify: `src/main.js:15-30, 49-58`
- Modify: `styles.css:32-45, 83-119`
- Modify: `tests/presentation.test.js:5-20, 77-97`

**Interfaces:**
- Consumes: `.deck--cover` assigned by `render()` and `.navigation-hint` inside `.navigation-status`.
- Produces: A prominent cover-specific eyebrow/title/phone composition and a keyboard hint hidden at `max-width: 760px`.

- [ ] **Step 1: Write the failing test**

```js
assert.match(css, /\.deck--cover\s+\.copy h1\s*\{[^}]*max-width:\s*11ch/s);
assert.match(css, /\.deck--cover\s+\.hero-shot\.phone-frame\s*\{[^}]*width:\s*min\(100%,\s*18rem\)/s);
assert.match(css, /@media \(max-width: 760px\)\s*\{[\s\S]*?\.navigation-hint\s*\{[^}]*display:\s*none/s);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --test-name-pattern="cover uses the real Sugcar icon"`

Expected: FAIL because no `.deck--cover` composition or mobile hint hiding rule exists.

- [ ] **Step 3: Write minimal implementation**

```css
.deck--cover .copy h1 { max-width: 11ch; }
.deck--cover .hero-shot.phone-frame { width: min(100%, 18rem); }

@media (max-width: 760px) {
  .navigation-hint { display: none; }
}
```

Keep the real dashboard `img` and brand asset in `visualFor()`; use existing classes rather than adding a second cover renderer.

- [ ] **Step 4: Run tests to verify the cover and mobile rule**

Run: `npm test`

Expected: all tests PASS.

### Task 3: Verify the local deck and commit

**Files:**
- Modify: `index.html` only if its cache query must be incremented after source or CSS changes.

**Interfaces:**
- Consumes: Local presentation at `http://127.0.0.1:4173/`.
- Produces: A cache-fresh local preview whose cover and controls fit in the standard viewport.

- [ ] **Step 1: Verify static files**

Run: `npm test && git diff --check`

Expected: 15 tests PASS and no whitespace errors.

- [ ] **Step 2: Inspect the local cover at 1280×720**

Check that the real screenshot remains intact, the title is fully readable, and neither the navigation controls nor the hint cause vertical or horizontal overflow.

- [ ] **Step 3: Commit**

```bash
git add index.html src/deck.js src/main.js styles.css tests/deck.test.js tests/presentation.test.js docs/superpowers/plans/2026-07-15-sugcar-safety-moment-cover.md
git commit -m "style: sharpen Sugcar cover story"
```
