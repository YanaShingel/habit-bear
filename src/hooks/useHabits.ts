import { useCallback, useEffect, useReducer } from 'react'

export type Habit = {
  id: string
  name: string
  // Local ISO dates 'YYYY-MM-DD', no duplicates
  completedDates: string[]
}

export type HabitView = Habit & { streak: number; doneToday: boolean }

type Action =
  | { type: 'add'; id: string; name: string }
  | { type: 'toggle'; id: string; date: string }
  | { type: 'delete'; id: string }

// Local-timezone date: toISOString() would give UTC and shift the day
export const toISO = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// The only impure helpers: they read the clock
export const now = (): Date => new Date()

export const todayISO = (): string => toISO(now())

// Pure: local date n days before `from`
export const daysAgoISO = (from: Date, n: number): string =>
  toISO(new Date(from.getFullYear(), from.getMonth(), from.getDate() - n))

// Pure: consecutive days ending `today` (or the day before if `today` is not done)
export function computeStreak(completedDates: string[], today: Date): number {
  const dates = new Set(completedDates)
  let offset: number
  if (dates.has(daysAgoISO(today, 0))) offset = 0
  else if (dates.has(daysAgoISO(today, 1))) offset = 1
  else return 0

  let streak = 0
  while (dates.has(daysAgoISO(today, offset))) {
    streak++
    offset++
  }
  return streak
}

const STORAGE_KEY = 'habit-bear:v1'

function parseHabit(value: unknown): Habit | null {
  if (typeof value !== 'object' || value === null) return null
  const { id, name, completedDates } = value as Record<string, unknown>
  if (typeof id !== 'string' || typeof name !== 'string') return null
  if (!Array.isArray(completedDates)) return null
  const dates = new Set(
    completedDates.filter((d): d is string => typeof d === 'string'),
  )
  return { id, name, completedDates: [...dates] }
}

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((item) => {
      const habit = parseHabit(item)
      return habit ? [habit] : []
    })
  } catch {
    return []
  }
}

function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch {
    // Storage unavailable (quota, private mode): silent no-op
  }
}

function reducer(habits: Habit[], action: Action): Habit[] {
  switch (action.type) {
    case 'add':
      return [
        ...habits,
        { id: action.id, name: action.name, completedDates: [] },
      ]
    case 'toggle':
      return habits.map((h) =>
        h.id !== action.id
          ? h
          : {
              ...h,
              completedDates: h.completedDates.includes(action.date)
                ? h.completedDates.filter((d) => d !== action.date)
                : [...h.completedDates, action.date],
            },
      )
    case 'delete':
      return habits.filter((h) => h.id !== action.id)
  }
}

export function useHabits() {
  const [habits, dispatch] = useReducer(reducer, undefined, loadHabits)

  // Multi-tab is last-write-wins by design
  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const addHabit = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    dispatch({ type: 'add', id: crypto.randomUUID(), name: trimmed })
  }, [])

  // Returns true iff the habit became checked
  const toggleToday = (id: string): boolean => {
    const date = todayISO()
    const habit = habits.find((h) => h.id === id)
    if (!habit) return false
    const wasDone = habit.completedDates.includes(date)
    dispatch({ type: 'toggle', id, date })
    return !wasDone
  }

  const deleteHabit = useCallback((id: string) => {
    dispatch({ type: 'delete', id })
  }, [])

  // Derived per render; a day rollover is picked up on the next interaction
  const current = now()
  const today = toISO(current)
  const habitViews: HabitView[] = habits.map((h) => ({
    ...h,
    streak: computeStreak(h.completedDates, current),
    doneToday: h.completedDates.includes(today),
  }))

  return { habits: habitViews, addHabit, toggleToday, deleteHabit }
}
