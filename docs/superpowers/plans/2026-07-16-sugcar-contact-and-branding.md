# SugCar Contact and Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a privacy-conscious Contact me action to the iOS About section and normalize the pitch’s public product name and wordmark to navy `SugCar`.

**Architecture:** Treat the pitch and iOS app as separate workstreams and commits. The pitch changes public-facing strings and one wordmark style; the iOS app adds one computed mail URL and one native `Link` row to the existing About section.

**Tech Stack:** HTML/CSS/JavaScript with Node.js tests; SwiftUI, Foundation `URLComponents`, Swift source regression script, and Xcode simulator build.

## Global Constraints

- Public product name: `SugCar`.
- Pitch wordmark: one navy color; green remains a functional accent only.
- Contact recipient: `sugcar.app@gmail.com`.
- Contact subject: `SugCar feedback`.
- Do not collect, attach, transmit, or request readings, credentials, logs, or other health data.
- Preserve lowercase technical identifiers, URLs, schemes, filenames, bundle identifiers, and package names.

---

### Task 1: Normalize pitch branding

**Files:**
- Modify: `tests/presentation.test.js`
- Modify: `tests/deck.test.js`
- Modify: `src/main.js`
- Modify: `src/deck.js`
- Modify: `styles.css`
- Modify: `index.html`
- Modify: `README.md`

**Interfaces:**
- Consumes: existing `.brand-word`, `.cover-identity`, `var(--navy)`, slide data, and presentation metadata.
- Produces: public-facing `SugCar` copy and a single-color navy wordmark.

- [ ] **Step 1: Write failing public-brand tests**

Add assertions that the header renders `<span class="brand-word">SugCar</span>`, the pitch source and metadata contain `SugCar`, no `.brand-word span` color split remains, and no public prose contains `Sugcar`.

- [ ] **Step 2: Run the pitch tests and confirm failure**

Run: `node --test tests/presentation.test.js tests/deck.test.js`

Expected: FAIL because the current header contains `Sug<span>car</span>` and public copy still contains `Sugcar`.

- [ ] **Step 3: Apply the minimal branding changes**

Update visible product copy and accessibility text from `Sugcar` to `SugCar`. Replace the split wordmark markup with plain `SugCar`, remove `.brand-word span { color: var(--range-good); }`, and update public README and HTML metadata. Keep lowercase asset paths, email addresses, URLs, package names, and technical identifiers unchanged.

- [ ] **Step 4: Verify and commit the pitch change**

Run: `npm test`

Expected: 26 tests pass, 0 fail.

Inspect the pitch at desktop and 390×844 mobile widths, then commit:

```bash
git add README.md index.html src/main.js src/deck.js styles.css tests/deck.test.js tests/presentation.test.js
git commit -m "Normalize SugCar pitch branding"
```

---

### Task 2: Add the iOS About contact row

**Files:**
- Create: `/Users/cezarylos/PROJECTS/sugcar-private/Tests/SettingsContactSourceTests.swift`
- Modify: `/Users/cezarylos/PROJECTS/sugcar-private/SugCar/ContentView.swift`

**Interfaces:**
- Consumes: `SettingsView`, `AppBrand.iconColor(for:)`, SwiftUI `Form`, and the existing About section.
- Produces: `contactEmailURL: URL?` and a native `Link` row labeled `Contact me`.

- [ ] **Step 1: Write the failing source regression script**

Create a Swift script that reads `SugCar/ContentView.swift` and fails unless it finds the recipient, subject, `envelope.fill`, `Contact me`, privacy footer, accessibility label, and accessibility hint.

- [ ] **Step 2: Run the script and confirm failure**

Run: `swift Tests/SettingsContactSourceTests.swift`

Expected: FAIL because the contact URL and row are absent.

- [ ] **Step 3: Add the native mail link**

Add a private computed property using `URLComponents`:

```swift
private var contactEmailURL: URL? {
    var components = URLComponents()
    components.scheme = "mailto"
    components.path = "sugcar.app@gmail.com"
    components.queryItems = [URLQueryItem(name: "subject", value: "SugCar feedback")]
    return components.url
}
```

In the About section, add a `Link` with `envelope.fill`, `Contact me`, the existing external-action indicator, `AppBrand.iconColor(for:)`, `.accessibilityLabel("Contact SugCar by email")`, and `.accessibilityHint("Opens your mail app with a SugCar feedback subject.")`. Add the approved privacy-conscious footer.

- [ ] **Step 4: Verify source behavior and build**

Run: `swift Tests/SettingsContactSourceTests.swift`

Expected: PASS.

Run:

```bash
xcodebuild -project SugCar.xcodeproj -scheme SugCar -configuration Debug -destination 'generic/platform=iOS Simulator' -derivedDataPath /tmp/SugCarDerivedData CODE_SIGNING_ALLOWED=NO build
```

Expected: `** BUILD SUCCEEDED **`.

- [ ] **Step 5: Inspect and commit the iOS change**

Inspect the Settings preview or simulator in light and dark appearances, ensuring the row wraps under large Dynamic Type without truncating. Commit:

```bash
git add SugCar/ContentView.swift Tests/SettingsContactSourceTests.swift
git commit -m "Add SugCar contact link to About"
```

---

### Task 3: Final cross-project verification

**Files:**
- Verify only; no planned modifications.

**Interfaces:**
- Consumes: the completed pitch and iOS commits.
- Produces: final evidence that both repositories satisfy the approved design.

- [ ] **Step 1: Run both verification suites fresh**

Run `npm test` in `sugcar-pitch`, run `swift Tests/SettingsContactSourceTests.swift` in `sugcar-private`, and rerun the Xcode simulator build.

- [ ] **Step 2: Confirm repository state**

Verify each repository contains only its intended commits and pre-existing untracked files remain untouched. Do not push either repository without explicit instruction.
