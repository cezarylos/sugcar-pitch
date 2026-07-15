export const slides = [
  {
    eyebrow: 'A personal project',
    title: 'Sugcar — a personal tool I built for myself.',
    body: [
      'A personal glucose companion, shaped around one awkward everyday moment: driving.',
      'This is not a launch story. It is a maker story about seeing a real problem and building carefully around it.'
    ],
    layout: 'cover'
  },
  {
    eyebrow: 'The moment',
    title: 'Driving made a simple check feel unnecessarily complicated.',
    body: [
      'When I wanted to know my current glucose reading, I did not want to unlock my phone, navigate through screens, and interpret data while on the road.',
      'The question was simple: can the latest signal be available in a safer, lower-friction way?'
    ],
    layout: 'problem'
  },
  {
    eyebrow: 'The idea',
    title: 'Ask. Hear the latest reading. Keep moving.',
    body: [
      'Sugcar is a secondary visualization utility for the latest glucose value, trend, range status, and freshness.',
      'The interaction is deliberately small: voice first, glanceable when needed, and without pretending to make decisions for the user.'
    ],
    layout: 'idea'
  },
  {
    eyebrow: 'How it works',
    title: 'The data stays with the user’s existing setup.',
    body: [
      'Gluroo / Nightscout cloud → direct iPhone connection → Sugcar surfaces the current reading through Siri, Live Activities, Dynamic Island, and optional on-device speech.',
      'The Siri shortcut runs in the background, so it can respond in a CarPlay context without opening the app.'
    ],
    layout: 'flow'
  },
  {
    eyebrow: 'The real flow',
    title: 'Built for the moment I actually needed it.',
    body: [
      'Use the controls below to see the real mock-data interface captured from the iOS Simulator.',
      'I will add a short driving-context video here before the interview.'
    ],
    layout: 'demo'
  },
  {
    eyebrow: 'Careful by design',
    title: 'A health interface has to be clear about its limits.',
    body: [
      'Range status is configurable. Offline and stale states are explicit. The app tells the user to verify with a BGM before making decisions.',
      'It does not give dosing, diagnostic, or treatment guidance. Restraint is part of the product.'
    ],
    layout: 'safety'
  },
  {
    eyebrow: 'Privacy & accessibility',
    title: 'Useful health software should be quiet about data and loud about clarity.',
    body: [
      'Sugcar has no backend, analytics SDK, or third-party tracking. It connects directly to the user’s Nightscout source; credentials are protected in iOS Keychain.',
      'Local state supports the on-device experience. Large type, clear status, voice output, and low-distraction interactions make the core signal easier to access.'
    ],
    layout: 'principles'
  },
  {
    eyebrow: 'What I learned',
    title: 'In health, the “what if it fails?” screen matters as much as the happy path.',
    body: [
      'The interesting work was not only fetching a number. It was deciding what not to claim, what to make configurable, and what the app should say when it cannot be trusted.',
      'That is the product discipline I find meaningful in health.'
    ],
    layout: 'learning'
  },
  {
    eyebrow: 'That is Sugcar',
    title: 'A small private project, still evolving.',
    body: [
      'I built it because I had a personal problem worth solving carefully.',
      'Happy to show the real flow — and talk about what this taught me about building trusted health experiences.'
    ],
    layout: 'close'
  }
];

export function clampSlideIndex(index, length) {
  return Math.max(0, Math.min(index, length - 1));
}

export function slideHash(index) {
  return `#slide-${index + 1}`;
}
