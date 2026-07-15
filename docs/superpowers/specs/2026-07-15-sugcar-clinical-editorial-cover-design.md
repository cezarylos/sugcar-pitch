# Sugcar Clinical-Editorial Cover Design

## Goal

Refine slide 1 into a confident, personal health-tech cover that makes the voice-first safety moment immediately understandable, while reserving the actual product screenshot for slide 2.

## Direction

Use the approved clinical-editorial approach: one large safety headline, generous app-derived light-blue space, and one deliberately composed Siri proof module in the lower-right corner. The module contains the official Siri orb, the `VOICE-FIRST CHECK` label, the exact user phrase, and the existing small waveform.

## Layout rules

- Desktop uses an 8-point rhythm: 64–80px outer gutters, 48px topbar placement, 24px from headline to body, and a 320–360px lower-right proof module.
- The headline remains dominant; the proof module is secondary and must not overlap it.
- The proof module uses a contained surface with a subtle app-derived border, rounded corners, and restrained elevation. The Siri orb lives in a 40px square surface so it remains visible at presentation scale.
- Do not introduce generic healthcare gradients, stock imagery, medical claims, additional CTAs, or an app screenshot on the cover.
- Preserve the real Sugcar green, navy, and pale-blue palette, keyboard navigation, visible control bar, and reduced-motion behavior.

## Responsive behavior

- On narrow screens, the cover remains a single readable column: headline, supporting sentence, then proof module.
- Mobile keeps 24px gutters, has no horizontal overflow, and does not expose the desktop-only arrow-key hint.

## Verification

- Add a presentation test that asserts the cover contains a Siri proof module, official Siri PNG asset, and dedicated orb surface.
- Run the full Node test suite.
- Inspect slide 1 at desktop and narrow mobile widths, checking that the proof module is visible, controls remain reachable, and neither axis overflows.
