# Sugcar Clinical-Editorial Cover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine slide 1 into a clinical-editorial hero with a visible, compact Siri proof module.

**Architecture:** Keep slide data and keyboard navigation unchanged. `src/main.js` will render semantic proof-module markup for the cover, while `styles.css` owns the responsive 8-point layout, Siri orb surface, and visual hierarchy. Tests validate that the intended assets and structural classes remain present.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner.

## Global Constraints

- Use Sugcar’s existing pale-blue, navy, and green tokens; do not add generic healthcare gradients or stock imagery.
- The official Siri asset is `assets/siri-logo.png` and must retain its proportions.
- The visible Siri phrase is exactly `“Hey Siri, check my blood sugar.”`.
- Preserve the slide stage, deep links, keyboard controls, reduced-motion behavior, and narrow-screen hiding of the arrow-key hint.
- Keep the product screenshot on slide 2, not on the cover.

---

### Task 1: Define the cover proof-module contract

**Files:**
- Modify: `tests/presentation.test.js:77-98`

**Interfaces:**
- Consumes: Cover markup returned by `visualFor(slide)` in `src/main.js`.
- Produces: A regression contract for `cover-proof`, `siri-orb`, and `assets/siri-logo.png`.

- [x] **Step 1: Write the failing test**

```js
assert.match(script, /class="cover-proof"/);
assert.match(script, /class="siri-orb"/);
assert.match(script, /assets\/siri-logo\.png/);
assert.match(css, /\.cover-proof\s*\{/);
assert.match(css, /\.siri-orb\s*\{/);
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test -- --test-name-pattern='cover uses a desktop-only editorial hero'`

Expected: FAIL because `cover-proof` and `siri-orb` do not exist in the cover markup and CSS.

### Task 2: Render the official Siri proof module

**Files:**
- Create: `assets/siri-logo.png`
- Modify: `src/main.js:53-59`

**Interfaces:**
- Consumes: `assets/siri-logo.png` (cropped, official Apple Siri orb).
- Produces: A `<section class="cover-proof">` with a `<span class="siri-orb">`, exact phrase, label, and decorative waveform.

- [x] **Step 1: Implement the minimum markup**

```js
return `<section class="cover-proof" aria-label="Sugcar’s Siri voice-first interaction">
  <span class="siri-orb"><img src="assets/siri-logo.png" alt="Siri" /></span>
  <span class="proof-copy"><b>VOICE-FIRST CHECK</b><p>“Hey Siri, check my blood sugar.”</p></span>
  <i class="cover-wave" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b></i>
</section>`;
```

- [x] **Step 2: Run the focused test to verify it passes**

Run: `npm test -- --test-name-pattern='cover uses a desktop-only editorial hero'`

Expected: PASS with one matching test and no failures.

### Task 3: Apply the clinical-editorial rhythm

**Files:**
- Modify: `styles.css:65-72,120-132`

**Interfaces:**
- Consumes: `.cover-proof`, `.siri-orb`, `.proof-copy`, and existing `.cover-wave` markup.
- Produces: A desktop lower-right proof module and a full-width mobile proof module.

- [x] **Step 1: Implement the minimal CSS**

```css
.cover-proof { width: min(100%, 22.5rem); padding: .875rem; position: absolute; right: 0; bottom: clamp(.25rem, 1.5vw, 1.5rem); display: grid; grid-template-columns: 2.5rem 1fr auto; gap: .75rem; align-items: center; border: 1px solid rgba(13, 33, 60, .13); border-radius: 1rem; background: rgba(255, 255, 255, .72); box-shadow: 0 .75rem 1.75rem rgba(26, 42, 60, .08); }
.siri-orb { width: 2.5rem; height: 2.5rem; display: grid; place-items: center; overflow: hidden; border: 1px solid rgba(13, 33, 60, .1); border-radius: .75rem; background: #fff; }
.siri-orb img { width: 100%; height: 100%; object-fit: cover; }
.proof-copy b { color: var(--range-good); font: 700 .68rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .12em; }
.proof-copy p { margin: .25rem 0 0; color: var(--navy); font-size: clamp(1rem, 1.45vw, 1.2rem); font-weight: 750; letter-spacing: -.02em; line-height: 1.2; }
@media (max-width: 760px) { .cover-proof { width: 100%; position: static; } }
```

- [x] **Step 2: Run the complete test suite**

Run: `npm test`

Expected: all tests pass.

### Task 4: Visually verify the cover

**Files:**
- Verify only: `index.html`, `src/main.js`, `styles.css`

**Interfaces:**
- Consumes: Local presentation server at `http://127.0.0.1:4173/#slide-1`.
- Produces: Evidence that the cover has visible Siri branding, reachable controls, and no desktop or mobile overflow.

- [x] **Step 1: Inspect desktop slide 1**

Use the in-app browser at 1280px wide. Confirm the headline, proof module, and controls are all visible without overlap or scrollbars.

- [x] **Step 2: Inspect narrow mobile slide 1**

Use the in-app browser at 375px wide. Confirm the proof module follows the body, the arrow-key hint is hidden, and the page has no horizontal overflow.

- [ ] **Step 3: Commit the implementation**

```bash
git add assets/siri-logo.png index.html src/main.js styles.css tests/presentation.test.js docs/superpowers/specs/2026-07-15-sugcar-clinical-editorial-cover-design.md docs/superpowers/plans/2026-07-15-sugcar-clinical-editorial-cover.md
git commit -m "style: refine Sugcar clinical editorial cover"
```
