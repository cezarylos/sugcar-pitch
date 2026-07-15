export const slides = [
  {
    eyebrow: 'A personal iOS project',
    title: 'The moment you should not look at your phone.',
    body: ['A personal iOS project for a safer, voice-first glucose check.'],
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
    body: ['Sugcar reads the latest value directly from your existing Nightscout / Gluroo setup—without adding another data silo.'],
    layout: 'flow'
  },
  {
    eyebrow: 'The details matter',
    title: 'Control what gets said out loud.',
    body: ['Range, units, voice, and Lock Screen visibility are personal.'],
    layout: 'gallery'
  },
  {
    eyebrow: 'Voice is the interaction',
    title: 'The answer carries context.',
    body: ['The reading, its movement, and its age give you more than a number.'],
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
    body: ['Siri answers in the driving context without opening the app.'],
    layout: 'demo-driving'
  }
];

export function clampSlideIndex(index, length) {
  return Math.max(0, Math.min(index, length - 1));
}

export function slideHash(index) {
  return `#slide-${index + 1}`;
}
