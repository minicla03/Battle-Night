'use client'

import { PhaseRenderer } from '@/components/organisms/phase-renderer'
import { useGameStateReader } from '@/lib/battle-night/store'
import { PHASE_LABELS } from '@/lib/battle-night/types'

export function DisplayPage() {
  const { state, hydrated } = useGameStateReader()

  return (
    <main
      className="fixed inset-0 flex flex-col bg-background"
      aria-live="polite"
    >
      {/* Ambient neon backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 20% 15%, color-mix(in oklch, var(--color-primary) 22%, transparent), transparent 70%), radial-gradient(55% 55% at 85% 85%, color-mix(in oklch, var(--color-accent) 20%, transparent), transparent 70%)',
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Header brand strip */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-10 py-5">
        <span className="font-display text-xl font-bold uppercase tracking-widest text-foreground">
          Battle <span className="text-primary neon-glow-primary">Night</span>
        </span>
        <span className="rounded-full border border-accent/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {hydrated ? PHASE_LABELS[state.currentPhase] : 'Live'}
        </span>
      </header>

      {/* Phase content */}
      <div className="relative z-[1] flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <PhaseRenderer state={state} />
      </div>

      {/* Footer live indicator */}
      <footer className="relative z-10 flex shrink-0 items-center justify-center gap-2 px-10 py-4">
        <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          On Air
        </span>
      </footer>
    </main>
  )
}
