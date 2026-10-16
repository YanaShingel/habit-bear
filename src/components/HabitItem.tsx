import { useEffect, useState } from 'react'
import type { HabitView } from '../hooks/useHabits'

const CONFIRM_RESET_MS = 3000

type HabitItemProps = {
  habit: HabitView
  onToggle: () => void
  onDelete: () => void
}

export function HabitItem({ habit, onToggle, onDelete }: HabitItemProps) {
  const [confirming, setConfirming] = useState<boolean>(false)

  useEffect(() => {
    if (!confirming) return
    const timer = setTimeout(() => setConfirming(false), CONFIRM_RESET_MS)
    return () => clearTimeout(timer)
  }, [confirming])

  function handleDeleteClick() {
    if (confirming) onDelete()
    else setConfirming(true)
  }

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
      <button
        type="button"
        aria-label={
          confirming
            ? `Точно? Удалить «${habit.name}»`
            : `Удалить «${habit.name}»`
        }
        onClick={handleDeleteClick}
        className="shrink-0 rounded border border-gray-300 px-2 py-1 text-sm text-gray-600"
      >
        {confirming ? 'Точно?' : 'Удалить'}
      </button>
    </li>
  )
}
