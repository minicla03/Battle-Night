import { CountdownTimer } from '@/components/molecules/countdown-timer'
import { PhaseShell } from '@/components/organisms/phase-shell'
import type { GhigliottinaSet } from '@/lib/battle-night/types'

interface GhigliottinaBoardProps {
  currentSet: GhigliottinaSet
  setIndex: number
  totalSets: number
  timer: number
  timerRunning: boolean
}

const ACCENT_COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-primary)',
]

export function GhigliottinaBoard({ currentSet, setIndex, totalSets, timer, timerRunning }: GhigliottinaBoardProps) {
  return (
    <PhaseShell
      title="La Ghigliottina"
      subtitle="Cinque indizi, una sola parola che le unisce tutte."
    >
      {/* Clue grid — 3 top + 2 bottom, centred */}
      <div className="flex w-full max-w-5xl flex-col items-center gap-4">
        {/* Row 1: first 3 clues */}
        <div className="flex w-full items-stretch justify-center gap-4">
          {currentSet.clues.slice(0, 3).map((clue, i) => (
            <ClueCard key={clue} clue={clue} accent={ACCENT_COLORS[i]} />
          ))}
        </div>
        {/* Row 2: last 2 clues, same width as above cells */}
        <div className="flex w-full items-stretch justify-center gap-4">
          {currentSet.clues.slice(3).map((clue, i) => (
            <ClueCard key={clue} clue={clue} accent={ACCENT_COLORS[3 + i]} />
          ))}
        </div>
      </div>

      {/* Set indicator */}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Set {setIndex + 1} / {totalSets}
      </p>

      {/* Timer */}
      <CountdownTimer seconds={timer} running={timerRunning} size="md" />
    </PhaseShell>
  )
}

function ClueCard({ clue, accent }: { clue: string; accent: string }) {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-2xl border px-6 py-5 text-center"
      style={{
        borderColor: `color-mix(in oklch, ${accent} 45%, transparent)`,
        boxShadow: `0 0 28px color-mix(in oklch, ${accent} 18%, transparent)`,
        background: `color-mix(in oklch, ${accent} 7%, var(--color-card))`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <span
        className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl"
        style={{
          color: 'var(--color-foreground)',
          textShadow: `0 0 24px color-mix(in oklch, ${accent} 50%, transparent)`,
        }}
      >
        {clue}
      </span>
    </div>
  )
}
