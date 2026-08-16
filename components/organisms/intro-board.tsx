'use client'

import { NeonTitle } from '@/components/atoms/neon-title'
import { TEAM_EMOJI, TEAM_SLOGAN, TEAM_TOKENS, TEAM_SUBTITLE, TEAMS } from '@/lib/battle-night/types'

interface IntroBoardProps {
  introRevealStep: number
}

export function IntroBoard({ introRevealStep }: IntroBoardProps) {
  const showTeams = introRevealStep > 0

  // floating particles
  const particles: { emoji: string; style: React.CSSProperties }[] = [
    { emoji: '⚡', style: { top: '8%', left: '5%', opacity: 0.4, fontSize: '3rem', animation: 'floatA 4s ease-in-out infinite' } },
    { emoji: '🔥', style: { top: '15%', right: '8%', opacity: 0.35, fontSize: '2.5rem', animation: 'floatB 5s ease-in-out infinite' } },
    { emoji: '✨', style: { bottom: '12%', left: '10%', opacity: 0.4, fontSize: '2rem', animation: 'floatA 3.5s ease-in-out infinite 0.8s' } },
    { emoji: '🏆', style: { bottom: '18%', right: '6%', opacity: 0.35, fontSize: '2.8rem', animation: 'floatB 4.5s ease-in-out infinite 1.2s' } },
    { emoji: '🌟', style: { top: '45%', left: '2%', opacity: 0.3, fontSize: '2rem', animation: 'floatA 6s ease-in-out infinite 0.5s' } },
    { emoji: '💥', style: { top: '55%', right: '3%', opacity: 0.3, fontSize: '2rem', animation: 'floatB 5.5s ease-in-out infinite 1.5s' } },
  ]

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 overflow-hidden px-8 text-center">
      {/* floating decorations */}
      {particles.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={p.style}
        >
          {p.emoji}
        </span>
      ))}

      {/* ── Title (always visible) ─────────────────────────── */}
      <div
        className="flex flex-col items-center gap-3"
        style={{ animation: 'fadeInUp 0.6s ease-out both' }}
      >
        <span className="text-sm font-semibold uppercase tracking-[0.6em] text-accent neon-glow-accent">
          🎬 Live Game Show
        </span>
        <div className="flex flex-col items-center leading-none">
          <NeonTitle
            as="h1"
            color="primary"
            className={showTeams ? 'text-6xl md:text-7xl' : 'text-8xl md:text-[11rem]'}
            style={{ transition: 'font-size 0.5s ease' }}
          >
            Battle
          </NeonTitle>
          <NeonTitle
            as="span"
            color="accent"
            className={showTeams ? 'text-6xl md:text-7xl' : 'text-8xl md:text-[11rem]'}
            style={{ transition: 'font-size 0.5s ease' }}
          >
            Night
          </NeonTitle>
        </div>
        {!showTeams && (
          <p className="mt-2 text-xl font-semibold text-muted-foreground" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
            Quattro squadre. Una sola notte. Nessuna pietà.
          </p>
        )}
      </div>

      {/* ── Teams (revealed one by one) ───────────────────── */}
      {showTeams && (
        <div
          className="w-full max-w-5xl"
          style={{ animation: 'fadeInUp 0.5s ease-out both' }}
        >
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {TEAMS.map((team, i) => {
              const accent = `var(--color-${TEAM_TOKENS[team]})`
              const visible = i < introRevealStep
              return (
                <div
                  key={team}
                  className="relative flex flex-col items-center gap-3 rounded-2xl border-2 bg-card/70 p-5 backdrop-blur-md"
                  style={{
                    borderColor: visible ? `color-mix(in oklch, ${accent} 70%, transparent)` : 'rgba(255,255,255,0.04)',
                    boxShadow: visible ? `0 0 36px color-mix(in oklch, ${accent} 30%, transparent)` : 'none',
                    background: visible
                      ? `radial-gradient(ellipse at 50% 30%, color-mix(in oklch, ${accent} 12%, transparent), transparent 70%), var(--color-card)`
                      : 'var(--color-card)',
                    opacity: visible ? 1 : 0.15,
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
                    transition: 'all 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div
                    className="absolute inset-x-4 top-0 h-1 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                      opacity: visible ? 1 : 0,
                      transition: 'opacity 0.4s 0.2s',
                    }}
                  />
                  <span
                    className="text-5xl leading-none"
                    style={{ filter: `drop-shadow(0 0 12px color-mix(in oklch, ${accent} 60%, transparent))` }}
                  >
                    {TEAM_EMOJI[team]}
                  </span>
                  <div className="flex flex-col items-center gap-0.5">
                    <span
                      className="font-display text-[10px] font-semibold uppercase tracking-[0.4em]"
                      style={{ color: `color-mix(in oklch, ${accent} 75%, white)` }}
                    >
                      {TEAM_SUBTITLE[team]}
                    </span>
                    <span
                      className="font-display text-2xl font-black uppercase"
                      style={{
                        color: accent,
                        textShadow: `0 0 12px color-mix(in oklch, ${accent} 50%, transparent)`,
                      }}
                    >
                      {team}
                    </span>
                  </div>
                  <p
                    className="text-[11px] italic leading-tight"
                    style={{ color: `color-mix(in oklch, ${accent} 65%, white)` }}
                  >
                    &ldquo;{TEAM_SLOGAN[team]}&rdquo;
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
