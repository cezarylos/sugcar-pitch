# Sugcar contact copy refresh

## Goal

Make the final-slide contact invitation feel relaxed, welcoming, and direct without losing the privacy reminder appropriate to a health-related project.

## Approved copy

- Heading: **Curious about Sugcar?**
- Invitation: **Want to try it, share feedback, or just ask a question? I’d love to hear from you.**
- Action: **Contact me**
- Privacy note: **Please don’t include personal health information.**

## Presentation

Keep the existing compact final-slide contact layout. Add a small envelope icon inside the green action button, before the label. The icon should use the same white foreground as the label, align optically with the text, and remain decorative so the accessible name stays concise.

## Accessibility and behavior

- Keep the email link pointed to `mailto:sugcar.app@gmail.com`.
- Keep `target="_blank"` and `rel="noopener noreferrer"`.
- Use the accessible label `Contact Sugcar by email at sugcar.app@gmail.com`.
- Mark the envelope icon as hidden from assistive technology.
- Preserve the existing keyboard focus and responsive behavior.

## Verification

Update the presentation tests to cover the new copy, button label, accessible label, and decorative icon. Run the complete test suite and inspect the final slide in the local preview.
