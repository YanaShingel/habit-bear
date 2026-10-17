# Habit Bear

Tiny habit tracker. When a habit is checked, a bear pops up with an encouraging phrase.

## Scope (do not exceed)
- Habits: add, delete, toggle "done today", streak counter
- Persistence: localStorage only, no backend
- Bear celebration on check: inline SVG + CSS animation, random phrase from a list
- Out of scope: auth, routing, state libraries, UI kits, tests (unless asked)

## Stack
React 19, TypeScript (strict), Vite, Tailwind v4 (CSS-first config, no tailwind.config.js), Oxlint.
Package manager: npm. Never use yarn/pnpm. Registry is set in `.npmrc` — don't change it.

## Commands
- `npm run dev` / `npm run build` / `npm run lint`
- Verify before finishing any task: `npx tsc --noEmit && npm run lint`

## Rules
- Functional components, named exports, one component per file in `src/components/`
- No `any`, no `@ts-ignore`. Fix types, don't suppress them
- Styling: Tailwind utilities only. No inline styles, no CSS modules
- State: `useState`/`useReducer` + one custom hook `useHabits` owning persistence
- No new dependencies without asking
- Keep diffs small and scoped to the task. Don't refactor unrelated code
- Commit after each completed task; message in conventional-commits format
- Communicate with the user in Russian; code, comments and commit messages stay in English

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (via the `gh` CLI). See `docs/agents/issue-tracker.md`.

### Browser acceptance

Checking the app in a real browser (Playwright MCP): see `docs/agents/acceptance.md` — UI timer windows are shorter than tool-call round-trips.

### Domain docs

Single-context: `GLOSSARY.md` at the repo root, ADRs in `docs/adr/`. See `docs/agents/domain.md`.
