# Sugcar Contact Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the final-slide contact invitation with warmer copy and a clear email action containing a decorative envelope icon.

**Architecture:** Keep the existing final-slide contact component and responsive layout. Change only its copy, accessible label, and button contents; extend the existing presentation test to lock down the approved wording and icon semantics.

**Tech Stack:** Static HTML strings in JavaScript, CSS, inline SVG, Node.js test runner.

## Global Constraints

- Keep `mailto:sugcar.app@gmail.com`, `target="_blank"`, and `rel="noopener noreferrer"` unchanged.
- Use the exact approved heading, invitation, action, and privacy copy from the design spec.
- The envelope icon is decorative and must use `aria-hidden="true"`.
- Preserve existing responsive layout and keyboard behavior.

---

### Task 1: Refresh the final-slide contact invitation

**Files:**
- Modify: `tests/presentation.test.js:170-179`
- Modify: `src/main.js:136-142`
- Modify: `styles.css:105-110`

**Interfaces:**
- Consumes: the existing `closing-contact`, `closing-contact-copy`, and `closing-contact-link` classes.
- Produces: updated final-slide contact markup with a decorative `.contact-icon` SVG.

- [ ] **Step 1: Update the test first**

Replace the existing contact-copy assertions with:

```js
assert.match(script, /Curious about Sugcar\?/);
assert.match(script, /Want to try it, share feedback, or just ask a question\? I’d love to hear from you\./);
assert.match(script, /Please don’t include personal health information\./);
assert.match(script, /<span>Contact me<\/span>/);
assert.match(script, /class="contact-icon"[^>]*aria-hidden="true"/);
assert.match(script, /aria-label="Contact Sugcar by email at sugcar\.app@gmail\.com"/);
```

- [ ] **Step 2: Run the test and verify the old copy fails**

Run: `node --test tests/presentation.test.js`

Expected: FAIL because `Curious about Sugcar?` is not yet present.

- [ ] **Step 3: Implement the approved copy and icon**

Update the component to render:

```html
<p class="closing-contact-title">Curious about Sugcar?</p>
<p class="closing-contact-invite">Want to try it, share feedback, or just ask a question? I’d love to hear from you.</p>
<p class="closing-contact-note">Please don’t include personal health information.</p>
<a class="closing-contact-link" href="mailto:sugcar.app@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Contact Sugcar by email at sugcar.app@gmail.com"><svg class="contact-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg><span>Contact me</span></a>
```

Add compact invitation and icon styling:

```css
.closing-proof .closing-contact-invite { color: var(--muted); font-size: .8rem; font-weight: 500; line-height: 1.4; }
.closing-contact-link { gap: .45rem; }
.contact-icon { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
```

- [ ] **Step 4: Run focused and full verification**

Run: `node --test tests/presentation.test.js`

Expected: all presentation tests pass.

Run: `npm test`

Expected: 26 tests pass, 0 fail.

- [ ] **Step 5: Inspect the local final slide and commit**

Open `http://localhost:4174/#slide-8`, confirm the invitation remains compact at desktop and mobile widths, then commit:

```bash
git add src/main.js styles.css tests/presentation.test.js docs/superpowers/plans/2026-07-16-sugcar-contact-copy.md
git commit -m "Refine final slide contact invitation"
```
