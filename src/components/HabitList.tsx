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
      <div className="flex flex-col items-center gap-2 text-center text-muted">
        <svg
          viewBox="0 0 64 64"
          className="size-12 fill-none stroke-muted"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="14" cy="16" r="9" />
          <circle cx="50" cy="16" r="9" />
          <circle cx="32" cy="34" r="24" />
          <ellipse cx="32" cy="42" rx="11" ry="8.5" />
        </svg>
        <p>Пока нет привычек — добавьте первую</p>
      </div>
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
