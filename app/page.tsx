import Link from 'next/link'
import { NeonTitle } from '@/components/atoms/neon-title'
import { TEAMS, TEAM_TOKENS } from '@/lib/battle-night/types'
import { MonitorPlay, SlidersHorizontal } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 55% at 20% 15%, color-mix(in oklch, var(--color-primary) 22%, transparent), transparent 70%), radial-gradient(50% 50% at 85% 85%, color-mix(in oklch, var(--color-accent) 20%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.5em] text-accent neon-glow-accent">
          Live Game Show Dashboard
        </span>

        <div className="flex flex-col items-center">
          <NeonTitle
            as="h1"
            color="primary"
            className="text-7xl leading-[0.85] md:text-9xl"
          >
            Battle
          </NeonTitle>
          <NeonTitle
            as="span"
            color="accent"
            className="text-7xl leading-[0.85] md:text-9xl"
          >
            Night
          </NeonTitle>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card/60 p-6 text-left backdrop-blur-sm transition-all hover:border-primary hover:neon-box-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <SlidersHorizontal className="h-6 w-6" />
            </span>
            <span className="font-display text-2xl font-bold text-foreground">
              Regia
            </span>
            <span className="text-sm text-muted-foreground">
              Pannello di controllo per gestire fasi, punteggi, timer e
              montepremi in tempo reale.
            </span>
          </Link>

          <Link
            href="/display"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card/60 p-6 text-left backdrop-blur-sm transition-all hover:border-accent hover:neon-box-accent"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <MonitorPlay className="h-6 w-6" />
            </span>
            <span className="font-display text-2xl font-bold text-foreground">
              Display Pubblico
            </span>
            <span className="text-sm text-muted-foreground">
              Vista a schermo intero per il pubblico. Si sincronizza
              automaticamente con la regia.
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
