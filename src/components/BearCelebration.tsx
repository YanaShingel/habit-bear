import type { Celebration } from '../bearPhrases'

type BearCelebrationProps = {
  // Current phrase, or null when idle
  celebration: Celebration | null
  // True while the fade-out plays
  closing: boolean
  onClose: () => void
}

// The aria-live region is always mounted so announcements fire reliably.
// The card is keyed by id so a re-check remounts it and restarts the animation.
export function BearCelebration({
  celebration,
  closing,
  onClose,
}: BearCelebrationProps) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 flex items-center justify-center p-4"
    >
      {celebration && (
        <div
          key={celebration.id}
          className={`pointer-events-auto relative flex max-w-xs flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-xl ${
            closing ? 'animate-celebrate-out' : 'animate-celebrate-in'
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full text-lg leading-none text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ×
          </button>
          <svg
            viewBox="0 0 64 64"
            className="size-24"
            aria-hidden="true"
          >
            <circle cx="14" cy="16" r="9" fill="#8b5a2b" />
            <circle cx="50" cy="16" r="9" fill="#8b5a2b" />
            <circle cx="14" cy="16" r="4.5" fill="#d9a066" />
            <circle cx="50" cy="16" r="4.5" fill="#d9a066" />
            <circle cx="32" cy="34" r="24" fill="#8b5a2b" />
            <ellipse cx="32" cy="42" rx="11" ry="8.5" fill="#d9a066" />
            <circle cx="23" cy="29" r="2.5" fill="#222" />
            <circle cx="41" cy="29" r="2.5" fill="#222" />
            <ellipse cx="32" cy="38" rx="3.5" ry="2.5" fill="#222" />
            <path
              d="M27 44 Q32 48 37 44"
              fill="none"
              stroke="#222"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-lg font-semibold">{celebration.phrase}</p>
        </div>
      )}
    </div>
  )
}
