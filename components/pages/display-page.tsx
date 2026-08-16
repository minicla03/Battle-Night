'use client'

import { PhaseRenderer } from '@/components/organisms/phase-renderer'
import { useGameStateReader } from '@/lib/battle-night/store'
import { PHASE_LABELS } from '@/lib/battle-night/types'

export function DisplayPage() {
  const { state, hydrated } = useGameStateReader()

  return (
    <main
      className="scanlines fixed inset-0 flex flex-col bg-background"
      aria-live="polite"
    >
      {/* Cinematic ambient backdrop — more dramatic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(55% 55% at 15% 10%, color-mix(in oklch, var(--color-primary) 28%, transparent), transparent 65%)',
            'radial-gradient(50% 50% at 88% 88%, color-mix(in oklch, var(--color-accent) 24%, transparent), transparent 65%)',
            'radial-gradient(35% 40% at 50% 100%, color-mix(in oklch, var(--color-primary) 14%, transparent), transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Header brand strip ─────────────────────────────── */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span
            className="font-display text-2xl font-black uppercase tracking-widest text-foreground"
            style={{ letterSpacing: '0.15em' }}
          >
            Battle{' '}
            <span className="text-primary neon-glow-primary">Night</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
            Live Game Show
          </span>
        </div>

        {/* Phase pill */}
        <div className="flex items-center gap-3">
          {/* On-air pulse */}
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" style={{ boxShadow: '0 0 8px oklch(0.65 0.26 15 / 0.8)' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-destructive">
              On Air
            </span>
          </div>

          <div
            className="rounded-full border border-accent/50 bg-card/60 px-5 py-1.5 backdrop-blur-sm"
            style={{ boxShadow: '0 0 14px color-mix(in oklch, var(--color-accent) 20%, transparent)' }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {hydrated ? PHASE_LABELS[state.currentPhase] : '—'}
            </span>
          </div>
        </div>
      </header>

      {/* ── Phase content ──────────────────────────────────── */}
      <div className="relative z-[1] flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <PhaseRenderer state={state} />
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="relative z-10 flex shrink-0 items-center justify-center gap-3 px-10 py-3">
        <div
          className="h-px flex-1 max-w-32"
          style={{ background: 'linear-gradient(90deg, transparent, var(--color-border))' }}
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.5em] text-muted-foreground/60">
          Battle Night © 2026
        </span>
        <div
          className="h-px flex-1 max-w-32"
          style={{ background: 'linear-gradient(90deg, var(--color-border), transparent)' }}
        />
      </footer>
    </main>
  )
}
