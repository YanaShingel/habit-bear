import { useEffect, useState } from 'react'
import { pickPhrase, type Celebration } from './bearPhrases'
import { AddHabitForm } from './components/AddHabitForm'
import { BearCelebration } from './components/BearCelebration'
import { HabitList } from './components/HabitList'
import { useHabits } from './hooks/useHabits'

const CELEBRATION_MS = 2000

export function App() {
  const { habits, addHabit, toggleToday } = useHabits()
  const [celebration, setCelebration] = useState<Celebration | null>(null)

  useEffect(() => {
    if (!celebration) return
    const timer = setTimeout(() => setCelebration(null), CELEBRATION_MS)
    return () => clearTimeout(timer)
  }, [celebration])

  function handleToggle(id: string) {
    if (toggleToday(id)) {
      setCelebration({ id: Date.now(), phrase: pickPhrase() })
    }
  }

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <h1 className="text-center text-3xl font-bold">Habit Bear 🐻</h1>
      <AddHabitForm onAdd={addHabit} />
      <HabitList habits={habits} onToggle={handleToggle} />
      <BearCelebration celebration={celebration} />
    </main>
  )
}
