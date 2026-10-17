# Habit Bear — Design

## Mood
Warm, slightly ironic, hand-drawn feel. A cozy notebook, not a SaaS dashboard.
The bear is a sarcastic but kind friend. Nothing corporate, no gradients, no glassmorphism.

## Palette (define as Tailwind @theme tokens)
- paper (bg): #FBF6EE
- ink (text): #2B2420
- muted (secondary text, borders): #9C8E80
- honey (accent, streak badge, primary button): #E9A23B
- moss (done state / checkbox checked): #6B8F5E
- bear fur: #8B5E3C, bear snout: #E8C9A6

## Typography
- Headings: a rounded or humanist sans (e.g. "Nunito"), bold
- Body: same family, regular. Base 16px, generous line-height (1.6)
- Bear phrase: italic, slightly larger than body

## Shape & depth
- Radius: 16px cards, 999px pills/badges, 10px inputs & buttons
- Borders over shadows; one soft shadow only on the bear card
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32

## Components
- Habit row: card on paper, checkbox custom-styled (honey border → moss fill when checked)
- Streak badge: honey pill, "🔥 N"
- Delete: ghost button, turns honey on "Точно?"
- Bear card: paper, soft shadow, bear SVG left, phrase right, "×" top-right
- Empty state: muted text + small bear outline

## Motion
- Keep existing celebrate-in/out; checkbox check gets a 150ms scale pop
- Respect prefers-reduced-motion everywhere

## Don'ts
- No inline styles, no new dependencies, no UI kits
- No dark mode yet
- Don't change behavior or markup semantics — this is a visual pass only