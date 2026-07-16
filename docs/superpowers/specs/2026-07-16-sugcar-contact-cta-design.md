# Sugcar final-slide contact CTA design

## Goal

Give public viewers a clear way to ask questions or express interest in testing Sugcar without turning the closing slide into a marketing screen.

## Scope

- Add the contact CTA only to the final slide.
- Use `sugcar.app@gmail.com` as the destination.
- Do not add a form, backend, tracking event, or persistent footer.

## Content

The CTA contains:

- Heading: “Questions or interested in testing Sugcar?”
- A compact green “Email me” link using `mailto:sugcar.app@gmail.com`.
- Supporting note: “Please don’t include personal health information.”

The link should expose the email address accessibly so visitors can identify the destination before opening their mail application.

## Layout and visual hierarchy

- Place the CTA inside the existing closing card, below the heart and closing statement.
- Separate it from the emotional closing statement with a quiet divider and modest top padding.
- Keep the heading and privacy note in the existing muted typographic system.
- Use Sugcar green for the action, with sufficient contrast and a visible keyboard focus state.
- Keep the CTA visually secondary to the slide title and closing statement.

On narrow screens, stack the CTA copy and action vertically. On desktop and tablet, use a compact horizontal row when space allows.

## Interaction and accessibility

- Use a semantic anchor with a `mailto:` URL, not a JavaScript click handler.
- Provide a descriptive accessible label that includes the email address.
- Preserve the deck’s existing keyboard navigation and reduced-motion behavior.
- The CTA does not animate independently; it enters with the existing slide animation.

## Verification

- Add tests confirming the final slide renders the CTA copy, privacy note, and correct `mailto:` URL.
- Verify the final slide at desktop, iPad portrait, standard mobile, and iPhone SE widths.
- Confirm the CTA does not overlap the fixed mobile navigation and the final slide remains vertically scrollable when necessary.
- Run the full existing test suite.
- Start the local preview and open the final slide for review.
