# Browser acceptance testing

Dev server: `npm run dev` → http://localhost:5173 (assume it is already running; ask before starting a second one).

## Timing: use in-page scripts, not separate tool calls

Two UI windows are shorter than the round-trip between MCP tool calls, so clicking in one call and asserting in the next **will miss them**:

- Bear celebration: auto-closes after 5 s (fade-out 200 ms).
- Delete confirmation: «Удалить» → «Точно?» resets after 3 s.

Do the trigger, the wait and the assertion/screenshot inside **one** `browser_run_code_unsafe` snippet, e.g.:

```js
async (page) => {
  await page.locator('ul li input[type="checkbox"]').first().check()
  await page.getByRole('button', { name: 'Закрыть' }).waitFor({ state: 'visible' })
  await page.waitForTimeout(600) // let celebrate-in (450ms) finish
  await page.screenshot({ path: '/absolute/path/docs/after.png' })
}
```

For timed state transitions, sample inside the page (poll text/aria at 0 ms / 100 ms / after the window) instead of `wait_for` between tool calls.

## Conventions

- Check the console (errors **and** warnings) after every step.
- Screenshots that document a change go to `docs/*.png` — they are committed (`!docs/*.png` in .gitignore); throwaway shots go to the session scratchpad.
- State lives in localStorage key `habit-bear:v1`; restore what you mutate (re-add the habit) after destructive checks.
