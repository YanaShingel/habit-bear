import { AddHabitForm } from './components/AddHabitForm'
import { HabitList } from './components/HabitList'
import { useHabits } from './hooks/useHabits'

export function App() {
  const { habits, addHabit } = useHabits()

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <h1 className="text-center text-3xl font-bold">Habit Bear 🐻</h1>
      <AddHabitForm onAdd={addHabit} />
      <HabitList habits={habits} />
    </main>
  )
}
