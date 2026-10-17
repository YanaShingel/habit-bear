import { useState } from 'react'
import type { FormEvent } from 'react'

type AddHabitFormProps = {
  onAdd: (name: string) => void
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) return
    onAdd(name)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Новая привычка…"
        maxLength={60}
        className="min-w-0 flex-1 rounded-control border border-muted bg-paper px-3 py-2 text-ink placeholder:text-muted focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      />
      <button type="submit" className="rounded-control border border-honey bg-honey px-4 py-2 font-bold text-ink hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
        Добавить
      </button>
    </form>
  )
}
