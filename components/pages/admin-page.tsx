'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ControlButton } from '@/components/atoms/control-button'
import { AdminControls } from '@/components/organisms/admin-controls'
import { PhaseRenderer } from '@/components/organisms/phase-renderer'
import { useGameController } from '@/lib/battle-night/store'
import { PHASE_LABELS } from '@/lib/battle-night/types'
import { ExternalLink, Radio } from 'lucide-react'

export function AdminPage() {
  const ctrl = useGameController()
  const { state, hydrated, tick } = ctrl

  // Drive the countdown from the admin (single source of truth).
  useEffect(() => {
    if (!state.timerRunning) return
    const id = window.setInterval(() => tick(), 1000)
    return () => window.clearInterval(id)
  }, [state.timerRunning, tick])

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground neon-box-primary">
              <Radio className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Battle Night
              </h1>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Regia / Control Room
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-accent/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {hydrated ? PHASE_LABELS[state.currentPhase] : '—'}
            </span>
            <Link href="/display" target="_blank" rel="noopener noreferrer">
              <ControlButton variant="primary">
                <ExternalLink className="h-4 w-4" /> Apri Display
              </ControlButton>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Controls */}
          <div>
            <AdminControls ctrl={ctrl} />
          </div>

          {/* Live preview */}
          <aside className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Anteprima Live
            </span>
            <div className="sticky top-6 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background neon-box-primary">
              {/* Scaled-down mirror — 1280×720 shrunk to fit the 360-wide sidebar */}
              <div
                className="pointer-events-none absolute left-0 top-0 origin-top-left"
                style={{ width: 1280, height: 720, transform: 'scale(0.28125)' }}
              >
                <div className="relative flex h-full w-full flex-col overflow-hidden bg-background">
                  {/* Ambient backdrop */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(60% 60% at 20% 15%, color-mix(in oklch, var(--color-primary) 22%, transparent), transparent 70%), radial-gradient(55% 55% at 85% 85%, color-mix(in oklch, var(--color-accent) 20%, transparent), transparent 70%)',
                    }}
                  />
                  {/* Content area fills remaining space */}
                  <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                    <PhaseRenderer state={state} />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Il display pubblico si aggiorna automaticamente su tutte le
              schede aperte tramite <code>localStorage</code>. Apri
              <span className="text-accent"> /display</span> su un secondo
              schermo per la messa in onda.
            </p>
          </aside>
        </div>
      </div>
    </main>
  )
}
