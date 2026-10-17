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
          className={`pointer-events-auto relative flex max-w-sm items-center gap-4 rounded-card border border-muted bg-paper p-6 pr-10 shadow-bear ${
            closing ? 'animate-celebrate-out' : 'animate-celebrate-in'
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full text-lg leading-none text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-honey"
          >
            ×
          </button>
          <svg
            viewBox="0 0 64 64"
            className="size-20 shrink-0"
            aria-hidden="true"
          >
            <circle cx="14" cy="16" r="9" className="fill-bear-fur" />
            <circle cx="50" cy="16" r="9" className="fill-bear-fur" />
            <circle cx="14" cy="16" r="4.5" className="fill-bear-snout" />
            <circle cx="50" cy="16" r="4.5" className="fill-bear-snout" />
            <circle cx="32" cy="34" r="24" className="fill-bear-fur" />
            <ellipse cx="32" cy="42" rx="11" ry="8.5" className="fill-bear-snout" />
            <circle cx="23" cy="29" r="2.5" className="fill-ink" />
            <circle cx="41" cy="29" r="2.5" className="fill-ink" />
            <ellipse cx="32" cy="38" rx="3.5" ry="2.5" className="fill-ink" />
            <path
              d="M27 44 Q32 48 37 44"
              className="fill-none stroke-ink"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-lg font-semibold italic">{celebration.phrase}</p>
        </div>
      )}
    </div>
  )
}
