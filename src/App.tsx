import { useEffect, useState } from 'react'
import { pickPhrase, type Celebration } from './bearPhrases'
import { AddHabitForm } from './components/AddHabitForm'
import { BearCelebration } from './components/BearCelebration'
import { HabitList } from './components/HabitList'
import { useHabits } from './hooks/useHabits'

const CELEBRATION_MS = 5000
// Keep in sync with --animate-celebrate-out duration in index.css
const CELEBRATION_EXIT_MS = 200

export function App() {
  const { habits, addHabit, toggleToday, deleteHabit } = useHabits()
  const [celebration, setCelebration] = useState<Celebration | null>(null)
  const [closing, setClosing] = useState(false)

  // Auto-close timer while shown
  useEffect(() => {
    if (!celebration || closing) return
    const timer = setTimeout(() => setClosing(true), CELEBRATION_MS)
    return () => clearTimeout(timer)
  }, [celebration, closing])

  // Unmount after the fade-out finishes
  useEffect(() => {
    if (!closing) return
    const timer = setTimeout(() => {
      setCelebration(null)
      setClosing(false)
    }, CELEBRATION_EXIT_MS)
    return () => clearTimeout(timer)
  }, [closing])

  // Escape closes the active celebration
  const isActive = celebration !== null
  useEffect(() => {
    if (!isActive) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setClosing(true)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isActive])

  function handleToggle(id: string) {
    if (toggleToday(id)) {
      setClosing(false)
      setCelebration({ id: Date.now(), phrase: pickPhrase() })
    }
  }

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <h1 className="text-center text-3xl font-bold">Habit Bear 🐻</h1>
      <AddHabitForm onAdd={addHabit} />
      <HabitList
        habits={habits}
        onToggle={handleToggle}
        onDelete={deleteHabit}
      />
      <BearCelebration
        celebration={celebration}
        closing={closing}
        onClose={() => setClosing(true)}
      />
    </main>
  )
}
