# SugCar iOS contact and pitch branding design

## Goal

Give SugCar users a clear, privacy-conscious way to contact the maker from the iOS app, while making the public pitch use the product name and wordmark consistently.

## Scope

This design contains two independently testable workstreams:

1. Add a native contact action to the iOS app’s existing About section.
2. Normalize visible pitch branding to `SugCar` and render the wordmark in one navy color.

No networking, account system, feedback form, analytics, or new navigation destination is added.

## iOS contact action

### Placement

Add the contact action to the existing `About` section in `SettingsView`, alongside Version and Legal & Privacy. It remains secondary to glucose, voice, and Lock Screen configuration.

### Interaction

Use a native SwiftUI `Link` row. Tapping it opens the user’s configured mail application with:

- Recipient: `sugcar.app@gmail.com`
- Subject: `SugCar feedback`

The app does not collect, transmit, or store the message itself.

### Row presentation

- SF Symbol: `envelope.fill`
- Label: `Contact me`
- External-action indicator matching the existing Legal & Privacy row
- Existing `AppBrand.iconColor(for:)` styling
- Native Form row sizing, pressed feedback, Dynamic Type, light mode, and dark mode behavior

### Supporting copy

Add an About-section footer:

> Questions, feedback, or interested in testing SugCar? I’d love to hear from you. Please don’t include personal health information.

### Accessibility

- Accessible label: `Contact SugCar by email`
- Accessible hint: `Opens your mail app with a SugCar feedback subject.`
- Preserve a minimum 44-point native touch target.
- Do not rely on the icon or color alone to communicate the action.

### Failure behavior

Use the platform `Link` behavior. If the device has no application configured for email links, iOS handles the unavailable destination; SugCar does not add a custom composer or error state.

## Pitch branding normalization

### Visible name

Use `SugCar` everywhere the product name is visible or announced in the pitch, including:

- Slide copy
- Wordmarks
- Page title and description
- Accessibility labels and image alternatives
- README prose
- Tests that assert public-facing copy

### Wordmark color

Render the complete `SugCar` wordmark in the existing navy text color. Remove the nested green `Car` treatment. Green remains available for functional accents, status, and calls to action.

### Technical exclusions

Do not rename lowercase technical identifiers whose spelling is functional or conventional:

- `sugcar.app@gmail.com`
- URLs and URL schemes
- Asset filenames
- Package and repository names
- CSS classes
- JavaScript identifiers
- Bundle identifiers, app groups, notification names, and keychain services

## Verification

### iOS

- Add a source-level test or equivalent regression check for the email recipient, percent-encoded subject, visible label, accessibility label, hint, and privacy footer.
- Build the iOS target for an available simulator.
- Inspect the About section in light and dark mode, with a large Dynamic Type size if simulator automation supports it.

### Pitch

- Add a regression assertion that no public-facing `Sugcar` spelling remains in the relevant source, metadata, README, or accessibility copy.
- Assert the wordmark is a single `SugCar` text node and no green nested span remains.
- Run the full presentation test suite.
- Inspect desktop and mobile pitch layouts after the wordmark change.

## Out of scope

- In-app message composition
- Sending email without explicit user action
- Attaching logs, readings, credentials, or device data
- Asking for personal health information
- Renaming technical identifiers or asset paths
- Redesigning the broader Settings screen or presentation deck
