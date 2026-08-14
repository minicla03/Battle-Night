'use client'

import { CountdownTimer } from '@/components/molecules/countdown-timer'
import { PhaseShell } from '@/components/organisms/phase-shell'
import { useEffect, useRef, useState } from 'react'

interface IntesaVincenteBoardProps {
  timer: number
  timerRunning: boolean
  currentWord: string
  wordIndex: number
  totalWords: number
}

export function IntesaVincenteBoard({
  timer,
  timerRunning,
  currentWord,
  wordIndex,
  totalWords,
}: IntesaVincenteBoardProps) {
  // Animate the word whenever it changes
  const [visible, setVisible] = useState(true)
  const prevWord = useRef(currentWord)

  useEffect(() => {
    if (prevWord.current === currentWord) return
    prevWord.current = currentWord
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 180)
    return () => clearTimeout(t)
  }, [currentWord])

  return (
    <PhaseShell
      title="L'Intesa Vincente"
      subtitle="Un giocatore suggerisce, l'altro indovina. Trenta secondi per fare punti."
    >
      <CountdownTimer seconds={timer} running={timerRunning} size="md" />

      {/* Word card */}
      <div className="flex w-full max-w-3xl flex-col items-center gap-4">
        <div
          className="relative flex w-full flex-col items-center justify-center rounded-3xl border px-10 py-10"
          style={{
            borderColor: 'color-mix(in oklch, var(--color-primary) 55%, transparent)',
            boxShadow:
              '0 0 60px color-mix(in oklch, var(--color-primary) 25%, transparent), inset 0 0 40px color-mix(in oklch, var(--color-primary) 8%, transparent)',
            background:
              'color-mix(in oklch, var(--color-card) 80%, transparent)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Decorative corner accents */}
          <span
            className="pointer-events-none absolute left-4 top-4 h-5 w-5 rounded-tl-lg border-l-2 border-t-2"
            style={{ borderColor: 'var(--color-primary)' }}
          />
          <span
            className="pointer-events-none absolute right-4 top-4 h-5 w-5 rounded-tr-lg border-r-2 border-t-2"
            style={{ borderColor: 'var(--color-primary)' }}
          />
          <span
            className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 rounded-bl-lg border-b-2 border-l-2"
            style={{ borderColor: 'var(--color-primary)' }}
          />
          <span
            className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 rounded-br-lg border-b-2 border-r-2"
            style={{ borderColor: 'var(--color-primary)' }}
          />

          <p
            className="font-display text-center font-bold uppercase tracking-widest transition-all duration-200"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              color: 'var(--color-foreground)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(12px)',
              textShadow: '0 0 40px color-mix(in oklch, var(--color-primary) 60%, transparent)',
            }}
          >
            {currentWord}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--color-muted-foreground)' }}>
            Parola
          </span>
          <span
            className="font-display text-lg font-bold tabular-nums"
            style={{ color: 'var(--color-primary)' }}
          >
            {wordIndex + 1}
          </span>
          <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            / {totalWords}
          </span>

          {/* Mini progress bar */}
          <div
            className="ml-2 h-1.5 w-32 overflow-hidden rounded-full"
            style={{ background: 'color-mix(in oklch, var(--color-primary) 20%, transparent)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${((wordIndex + 1) / totalWords) * 100}%`,
                background: 'var(--color-primary)',
                boxShadow: '0 0 8px var(--color-primary)',
              }}
            />
          </div>
        </div>
      </div>
    </PhaseShell>
  )
}
