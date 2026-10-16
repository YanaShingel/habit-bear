import { useCallback, useEffect, useReducer } from 'react'

export type Habit = {
  id: string
  name: string
  // Local ISO dates 'YYYY-MM-DD'; empty until toggling is implemented
  completedDates: string[]
}

type Action = { type: 'add'; id: string; name: string }

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

  return { habits, addHabit }
}
