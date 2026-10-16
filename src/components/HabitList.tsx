import type { Habit } from '../hooks/useHabits'

type HabitListProps = {
  habits: Habit[]
}

export function HabitList({ habits }: HabitListProps) {
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
        <li
          key={habit.id}
          className="flex items-center rounded border border-gray-300 px-3 py-2"
        >
          <span className="truncate">{habit.name}</span>
        </li>
      ))}
    </ul>
  )
}
