import type { HabitView } from '../hooks/useHabits'

type HabitItemProps = {
  habit: HabitView
  onToggle: () => void
}

export function HabitItem({ habit, onToggle }: HabitItemProps) {
  return (
    <li className="flex items-center gap-3 rounded border border-gray-300 px-3 py-2">
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={habit.doneToday}
          onChange={onToggle}
          className="size-5 shrink-0"
        />
        <span className="min-w-0 flex-1 truncate">{habit.name}</span>
      </label>
      {habit.streak >= 1 && (
        <span className="shrink-0 text-sm text-gray-600">
          🔥 {habit.streak}
        </span>
      )}
    </li>
  )
}
