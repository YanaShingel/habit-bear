export type Celebration = { id: number; phrase: string }

export const PHRASES: readonly string[] = [
  'Great job, dude. The bar was low, but still.',
  'Look at you, being a functional adult.',
  'One habit down. Netflix can wait. Probably.',
  'Wow. Consistency. Who even are you?',
  'The bear is mildly impressed. That\'s rare.',
  'Another day, another checkbox. Living the dream.',
  'You did the thing! Again! Suspiciously reliable.',
  'Streak intact. Your future self says thanks, reluctantly.',
  'Honestly? Didn\'t think you\'d show up today. Respect.',
]

export function pickPhrase(): string {
  return PHRASES[Math.floor(Math.random() * PHRASES.length)] ?? ''
}
