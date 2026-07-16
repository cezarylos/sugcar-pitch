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
    body: ['For people with diabetes, a glucose check is more than a number. It matters where the reading is heading and how recent it is. Checking that on a phone while driving means looking away from the road.'],
    layout: 'problem'
  },
  {
    eyebrow: 'Your source, not ours',
    title: 'No new health-data cloud.',
    body: ['SugCar reads the latest value from your existing Nightscout / Gluroo setup. It does not create a SugCar cloud account or another data silo.'],
    layout: 'flow'
  },
  {
    eyebrow: 'The details matter',
    title: 'Control what gets said out loud.',
    body: ['Make SugCar fit your routine: from units and personal range to voice, appearance, and Lock Screen.'],
    layout: 'gallery'
  },
  {
    eyebrow: 'Voice is the interaction',
    title: 'The answer carries context.',
    body: ['Start with the reading. Then choose the extra context Siri speaks: unit, trend, range status, and time since the update.'],
    layout: 'voice'
  },
  {
    eyebrow: 'Demo 1',
    title: 'Watch the app run.',
    body: ['A short walkthrough of the dashboard, settings, and\u00a0voice response.'],
    layout: 'demo-app'
  },
  {
    eyebrow: 'Demo 2',
    title: 'Then see it on the road.',
    body: ['With CarPlay connected, Siri speaks the latest glucose update through your car’s audio, hands-free and without reaching for your phone.'],
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
