'use client'

import { useEffect, useState } from 'react'
import { NeonTitle } from '@/components/atoms/neon-title'
import { TEAM_EMOJI, TEAM_SLOGAN, TEAM_SUBTITLE, TEAM_TOKENS, TEAMS, type Team } from '@/lib/battle-night/types'

interface FinalistaBoardProps {
  scores: Record<Team, number>
}

export function FinalistaBoard({ scores }: FinalistaBoardProps) {
  const [revealed, setRevealed] = useState(false)
  const [drumroll, setDrumroll] = useState(true)

  // find winner(s) — handle ties
  const max = Math.max(...TEAMS.map((t) => scores[t]))
  const winners = TEAMS.filter((t) => scores[t] === max)
  const isTie = winners.length > 1

  // animation sequence: drumroll for 2s, then reveal
  useEffect(() => {
    setRevealed(false)
    setDrumroll(true)
    const t1 = setTimeout(() => setDrumroll(false), 2200)
    const t2 = setTimeout(() => setRevealed(true), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [max]) // re-animate if scores change

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">

      {/* ── Background glow rings (winner colors) ───────────── */}
      {revealed && winners.map((team) => (
        <div
          key={team}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(55% 55% at 50% 50%, color-mix(in oklch, var(--color-${TEAM_TOKENS[team]}) 18%, transparent), transparent 70%)`,
            animation: 'vsPulse 2.5s ease-in-out infinite',
          }}
        />
      ))}

      {/* ── Drumroll phase ───────────────────────────────────── */}
      {drumroll && (
        <div
          className="flex flex-col items-center gap-6"
          style={{ animation: 'fadeInUp 0.5s ease-out both' }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.6em] text-accent neon-glow-accent">
            Battle Night — Gioco Finale
          </span>
          <NeonTitle as="h1" color="primary" className="text-5xl md:text-6xl">
            E il finalista è…
          </NeonTitle>
          {/* animated dots */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-4 w-4 rounded-full bg-primary"
                style={{
                  animation: `vsPulse 0.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                  boxShadow: '0 0 12px color-mix(in oklch, var(--color-primary) 60%, transparent)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Reveal phase ────────────────────────────────────── */}
      {revealed && (
        <div
          className="flex flex-col items-center gap-6 w-full max-w-3xl"
          style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.6em] text-accent neon-glow-accent">
            {isTie ? '🏆 Pareggio! Entrambi al finale' : '🏆 Accede alla finale'}
          </span>

          {/* Winner card(s) */}
          <div className={`flex w-full gap-6 ${isTie ? 'justify-center' : 'justify-center'}`}>
            {winners.map((team) => {
              const accent = `var(--color-${TEAM_TOKENS[team]})`
              return (
                <div
                  key={team}
                  className="relative flex flex-col items-center gap-5 rounded-3xl border-2 px-10 py-10 backdrop-blur-md"
                  style={{
                    borderColor: `color-mix(in oklch, ${accent} 80%, transparent)`,
                    boxShadow: [
                      `0 0 60px color-mix(in oklch, ${accent} 45%, transparent)`,
                      `0 0 120px color-mix(in oklch, ${accent} 22%, transparent)`,
                      `inset 0 0 40px color-mix(in oklch, ${accent} 10%, transparent)`,
                    ].join(', '),
                    background: `radial-gradient(ellipse at 50% 30%, color-mix(in oklch, ${accent} 20%, transparent), transparent 65%), var(--color-card)`,
                    animation: 'vsPulse 2.8s ease-in-out infinite',
                  }}
                >
                  {/* top bar */}
                  <div
                    className="absolute inset-x-0 top-0 h-2 rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                  />

                  {/* crown badge */}
                  <span
                    className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-black uppercase tracking-widest text-background"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 20px color-mix(in oklch, ${accent} 70%, transparent)`,
                    }}
                  >
                    👑 Finalista
                  </span>

                  {/* huge emoji */}
                  <span
                    className="text-8xl leading-none"
                    style={{
                      filter: `drop-shadow(0 0 24px color-mix(in oklch, ${accent} 70%, transparent))`,
                      animation: 'floatA 3s ease-in-out infinite',
                    }}
                  >
                    {TEAM_EMOJI[team]}
                  </span>

                  {/* team identity */}
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.5em]"
                      style={{ color: `color-mix(in oklch, ${accent} 75%, white)` }}
                    >
                      {TEAM_SUBTITLE[team]}
                    </span>
                    <span
                      className="font-display text-6xl font-black uppercase leading-none"
                      style={{
                        color: accent,
                        textShadow: [
                          `0 0 20px color-mix(in oklch, ${accent} 70%, transparent)`,
                          `0 0 60px color-mix(in oklch, ${accent} 40%, transparent)`,
                        ].join(', '),
                      }}
                    >
                      {team}
                    </span>
                  </div>

                  {/* score */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                      Punteggio
                    </span>
                    <span
                      className="font-display text-7xl font-black tabular-nums"
                      style={{
                        color: accent,
                        textShadow: `0 0 24px color-mix(in oklch, ${accent} 60%, transparent)`,
                      }}
                    >
                      {scores[team]}
                    </span>
                  </div>

                  {/* slogan */}
                  <p
                    className="max-w-xs text-sm italic leading-snug"
                    style={{ color: `color-mix(in oklch, ${accent} 65%, white)` }}
                  >
                    &ldquo;{TEAM_SLOGAN[team]}&rdquo;
                  </p>
                </div>
              )
            })}
          </div>

          {/* next step hint */}
          <p
            className="mt-2 text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground"
            style={{ animation: 'fadeInUp 0.5s ease-out 0.6s both' }}
          >
            → Prossimo: L&apos;Inversione Logica
          </p>
        </div>
      )}
    </div>
  )
}
