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
    <li className="flex items-center gap-3 rounded-card border border-muted bg-paper px-4 py-3">
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={habit.doneToday}
          onChange={onToggle}
          className="size-6 shrink-0 cursor-pointer appearance-none rounded-md border-2 border-honey bg-paper checked:motion-safe:animate-check-pop checked:border-moss checked:bg-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
        />
        <span className="min-w-0 flex-1 truncate">{habit.name}</span>
      </label>
      {habit.streak >= 1 && (
        <span className="shrink-0 rounded-full bg-honey px-3 py-1 text-sm font-bold text-ink">
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
        className={`shrink-0 rounded-control border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey ${
          confirming
            ? 'border-honey bg-honey font-bold text-ink'
            : 'border-transparent text-muted hover:border-muted hover:text-ink'
        }`}
      >
        {confirming ? 'Точно?' : 'Удалить'}
      </button>
    </li>
  )
}
