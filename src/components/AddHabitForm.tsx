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
        className="min-w-0 flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <button type="submit" className="rounded border border-gray-300 px-4 py-2">
        Добавить
      </button>
    </form>
  )
}
