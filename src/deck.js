export const slides = [
  {
    eyebrow: 'A personal iOS project',
    title: 'For moments when your attention belongs elsewhere.',
    body: ['A personal iOS app for checking blood glucose by voice.'],
    layout: 'cover'
  },
  {
    eyebrow: 'The problem',
    title: 'One question. No screen hunt.',
    body: ['One voice request instead of looking for a number.'],
    layout: 'problem'
  },
  {
    eyebrow: 'Your source, not ours',
    title: 'No new health-data cloud.',
    body: ['Sugcar reads the latest value from your existing Nightscout / Gluroo setup. It does not create a Sugcar cloud account or another data silo.'],
    layout: 'flow'
  },
  {
    eyebrow: 'The details matter',
    title: 'Control what gets said out loud.',
    body: ['Set the app around your routine: units, personal range, voice, appearance, and Lock Screen.'],
    layout: 'gallery'
  },
  {
    eyebrow: 'Voice is the interaction',
    title: 'The answer carries context.',
    body: ['The reading stays central; choose which supporting context the spoken answer adds: unit, trend, range status, and age.'],
    layout: 'voice'
  },
  {
    eyebrow: 'Demo 1',
    title: 'Watch the app run.',
    body: ['A short walkthrough of the dashboard, settings, and voice response.'],
    layout: 'demo-app'
  },
  {
    eyebrow: 'Demo 2',
    title: 'Then see it on the road.',
    body: ['With CarPlay connected, Siri speaks the latest glucose update through your car’s audio—hands off, without reaching for your phone.'],
    layout: 'demo-driving'
  },
  {
    eyebrow: 'Why I made it',
    title: 'One important check. Less visual attention.',
    body: ['A voice-first check that keeps the user in control of what is shared and said aloud.', 'Diabetes asks a lot, every day. Thoughtful technology can make one moment lighter.'],
    layout: 'closing'
  }
];

export function clampSlideIndex(index, length) {
  return Math.max(0, Math.min(index, length - 1));
}

export function slideHash(index) {
  return `#slide-${index + 1}`;
}
