import type { HabitView } from '../hooks/useHabits'
import { HabitItem } from './HabitItem'

type HabitListProps = {
  habits: HabitView[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Пока нет привычек — добавьте первую
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={() => onToggle(habit.id)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </ul>
  )
}
