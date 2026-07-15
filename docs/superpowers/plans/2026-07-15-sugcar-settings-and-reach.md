# Sugcar Settings and Reachability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Refine the paired settings phones, add a phone-away/night-time use case, and strengthen cover branding without crowding the deck.

**Architecture:** Keep narrative data in \`src/deck.js\`; add an \`away\` branch to \`src/main.js\`; scope compact device geometry in \`styles.css\` so the two settings frames do not inherit the hero screen radius.

**Tech Stack:** Static HTML, vanilla JavaScript ES modules, CSS, Node built-in test runner.

## Global Constraints

- Preserve the supplied Sugcar screenshots and brand icon.
- Preserve keyboard navigation, responsiveness, and reduced-motion support.
- Preserve the real Siri phrase and do not claim native CarPlay UI.
- Phone-away body copy: “Ask for a quick reading when the phone is across the room—especially at night, without reaching for or waking the device.”
- Settings phones use a centred compact pair with matching vertical bounds.

---

### Task 1: Add phone-away narrative data

**Files:**
- Modify: \`tests/deck.test.js\`
- Modify: \`src/deck.js\`

**Interfaces:**
- Consumes: exported \`slides\` array.
- Produces: eight slides, with an \`away\` entry between \`problem\` and \`flow\`.

- [ ] **Step 1: Write the failing test**

Replace the opening deck test with:

~~~js
test('deck has a concise eight-slide maker narrative', () => {
  assert.equal(slides.length, 8);
  assert.deepEqual(slides.slice(1, 4).map((slide) => slide.layout), ['problem', 'away', 'flow']);
  assert.equal(slides.at(-1).layout, 'demo-driving');
});

test('phone-away copy describes a nighttime voice check', () => {
  const away = slides.find((slide) => slide.layout === 'away');
  assert.ok(away);
  assert.equal(away.title, 'When the phone is out of reach.');
  assert.match(away.body.join(' '), /across the room.*especially at night/i);
  assert.match(away.body.join(' '), /without reaching for or waking the device/i);
});
~~~

- [ ] **Step 2: Run test to verify it fails**

Run: \`npm test -- tests/deck.test.js\`

Expected: FAIL because the deck has seven slides and no \`away\` entry.

- [ ] **Step 3: Write minimal implementation**

Insert this object after the \`problem\` slide in \`src/deck.js\`:

~~~js
{
  eyebrow: 'Beyond the car',
  title: 'When the phone is out of reach.',
  body: ['Ask for a quick reading when the phone is across the room—especially at night, without reaching for or waking the device.'],
  layout: 'away'
},
~~~

- [ ] **Step 4: Run test to verify it passes**

Run: \`npm test -- tests/deck.test.js\`

Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add tests/deck.test.js src/deck.js
git commit -m "feat: add phone-away Sugcar story"
~~~

### Task 2: Render cover identity and the phone-away visual

**Files:**
- Modify: \`tests/presentation.test.js\`
- Modify: \`src/main.js\`

**Interfaces:**
- Consumes: \`slide.layout === 'away'\` and \`assets/sugcar-brand-icon.png\`.
- Produces: a cover identity block and a dark voice-check card.

- [ ] **Step 1: Write the failing test**

Append:

~~~js
test('cover identity and phone-away slide use the real Sugcar asset and Siri interaction', async () => {
  const script = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');

  assert.match(script, /class="cover-identity"/);
  assert.match(script, /assets\/sugcar-brand-icon\.png/);
  assert.match(script, /slide\.layout === 'away'/);
  assert.match(script, /class="away-card"/);
  assert.match(script, /Hey Siri, check my blood sugar\./);
});
~~~

- [ ] **Step 2: Run test to verify it fails**

Run: \`npm test -- tests/presentation.test.js\`

Expected: FAIL because neither visual exists.

- [ ] **Step 3: Write minimal implementation**

Inside the existing static \`.copy\` container in \`src/main.js\`, before the eyebrow, add:

~~~html
<div class="cover-identity" data-cover-identity hidden>
  <img src="assets/sugcar-brand-icon.png" alt="" />
  <span>Sugcar</span>
</div>
~~~

Query the element as \`coverIdentity\`, then set \`coverIdentity.hidden = slide.layout !== 'cover';\` inside \`render()\`.

Add a branch after the existing \`problem\` branch:

~~~js
if (slide.layout === 'away') {
  return '<section class="away-card" aria-label="A nighttime Sugcar voice check"><span>WHEN THE PHONE IS AWAY</span><strong>“Hey Siri, check my blood sugar.”</strong><small>A quiet answer, without reaching for the screen.</small></section>';
}
~~~

- [ ] **Step 4: Run test to verify it passes**

Run: \`npm test -- tests/presentation.test.js\`

Expected: PASS.

- [ ] **Step 5: Commit**

~~~bash
git add tests/presentation.test.js src/main.js
git commit -m "feat: render phone-away Sugcar slide"
~~~

### Task 3: Refine settings device geometry and styling

**Files:**
- Modify: \`tests/presentation.test.js\`
- Modify: \`styles.css\`
- Modify: \`index.html\`

**Interfaces:**
- Consumes: \`.screen-pair\`, \`.product-shot.phone-frame\`, \`.cover-identity\`, and \`.away-card\`.
- Produces: compact centred settings phones, a small-frame screen radius, cover and away styles, and stylesheet cache version \`20260715-10\`.

- [ ] **Step 1: Write the failing test**

Append:

~~~js
test('settings frames use a compact flex pair and smaller screen radii than the hero frame', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(css, /\.screen-pair\s*\{[^}]*display:\s*flex[^}]*justify-content:\s*center/s);
  assert.match(css, /\.screen-pair\s*\{[^}]*gap:\s*clamp\(\.75rem,\s*1\.3vw,\s*1rem\)/s);
  assert.match(css, /\.product-shot\.phone-frame\s*>\s*img\s*\{[^}]*border-radius:\s*2\.05rem/s);
  assert.match(css, /\.cover-identity\s*\{/);
  assert.match(css, /\.away-card\s*\{/);
});
~~~

- [ ] **Step 2: Run test to verify it fails**

Run: \`npm test -- tests/presentation.test.js\`

Expected: FAIL because \`.screen-pair\` is a two-column grid and no new rules exist.

- [ ] **Step 3: Write minimal implementation**

Replace the screen-pair rule with:

~~~css
.screen-pair { min-height: 31rem; display: flex; align-items: center; justify-content: center; gap: clamp(.75rem, 1.3vw, 1rem); }
~~~

Add:

~~~css
.product-shot.phone-frame { flex: 0 0 auto; }
.product-shot.phone-frame > img { border-radius: 2.05rem; }
.cover-identity { display: inline-flex; align-items: center; gap: .55rem; margin-bottom: 1rem; color: var(--navy); font-size: .95rem; font-weight: 800; letter-spacing: -.02em; }
.cover-identity img { width: 2.15rem; height: 2.15rem; border-radius: .58rem; box-shadow: 0 .3rem .8rem rgba(13, 33, 60, .16); }
.away-card { min-height: 19rem; padding: clamp(1.5rem, 4vw, 2.7rem); display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem; color: #fff; background: var(--navy); border-radius: 1.5rem; box-shadow: 0 1rem 2.4rem rgba(13, 33, 60, .18); }
.away-card span { color: #b9e5ba; font: 700 .68rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .12em; }
.away-card strong { max-width: 14ch; font-size: clamp(1.8rem, 4vw, 3.4rem); letter-spacing: -.04em; line-height: 1.06; }
.away-card small { color: #d4deea; font-size: 1rem; line-height: 1.45; }
~~~

Change the CSS query string in \`index.html\` to \`styles.css?v=20260715-10\`.

- [ ] **Step 4: Run checks to verify they pass**

Run: \`npm test && git diff --check\`

Expected: all tests PASS and no whitespace errors.

- [ ] **Step 5: Inspect in the local browser**

Open \`http://127.0.0.1:4173/#slide-5\` and confirm the settings phones share top/bottom coordinates and have only the compact gap. Open \`#slide-1\` and \`#slide-3\` to confirm the cover identity and away card are legible.

- [ ] **Step 6: Commit**

~~~bash
git add tests/presentation.test.js styles.css index.html
git commit -m "style: refine Sugcar device composition"
~~~

