# Sugcar safety-moment cover

## Intent

Make the opening slide distinct from the explanatory slides and immediately communicate the personal safety interaction that motivated Sugcar. The cover is for an interview audience evaluating product judgment and engineering initiative, not for a product launch.

## Approved direction

Use the selected **Safety moment** layout:

- A small, quiet maker label establishes the scope: a personal iOS project.
- The headline leads with the tension: **“The moment you should not look at your phone.”**
- The existing full Sugcar dashboard sits as the proof point, in a deliberately more prominent phone composition.
- A brief supporting line connects the visual to the project: a safer, voice-first glucose interaction.
- The Sugcar identity remains present but subordinate to the problem.

## Guardrails

- Keep the real dashboard screenshot and actual Sugcar brand asset.
- Do not imply medical-device certification, a new data cloud, or guaranteed outcomes.
- Preserve the full screenshot and a stable one-screen cover at standard desktop heights.
- Retain the existing accessible image description and keyboard navigation.

## Responsive follow-up

- Hide “Use ← → arrow keys to navigate” at touch-width breakpoints because the visible controls remain the appropriate mobile affordance.
- Defer the broader 765px layout fixes for slides 3 and 4 to the dedicated responsive pass, as requested.

## Verification

- Add regression tests for the new cover message, the cover-specific visual treatment, and the mobile-only removal of the keyboard hint.
- Recheck the cover and all slides at 1280×720; ensure no layout overflow or control displacement.
