'use client'

import { PhaseShell } from '@/components/organisms/phase-shell'
import { TEAMS } from '@/lib/battle-night/types'
import type { Team } from '@/lib/battle-night/types'

interface BrucoBoardProps {
  timer: number
  timerRunning: boolean
  finishOrder: Team[]
}

const WINNER_STYLE = {
  glow: 'var(--color-accent)',
  border: 'color-mix(in oklch, var(--color-accent) 70%, transparent)',
  bg: 'color-mix(in oklch, var(--color-accent) 10%, var(--color-card))',
}

export function BrucoBoard({ finishOrder }: BrucoBoardProps) {
  const winners = finishOrder.slice(0, 2)
  const hasWinners = winners.length > 0

  return (
    <>
      <style>{`
        @keyframes bruco-crawl {
          0%   { transform: translateX(0px) scaleX(1); }
          25%  { transform: translateX(8px) scaleX(1.08); }
          50%  { transform: translateX(0px) scaleX(0.94); }
          75%  { transform: translateX(-6px) scaleX(1.05); }
          100% { transform: translateX(0px) scaleX(1); }
        }
        @keyframes winner-pop {
          0%   { transform: scale(0.7) translateY(20px); opacity: 0; }
          60%  { transform: scale(1.08) translateY(-4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes confetti-spin {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(360deg) scale(1.15); }
        }
        @keyframes float-up {
          0%   { transform: translateY(0px); opacity: 0.7; }
          50%  { transform: translateY(-12px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.7; }
        }
      `}</style>

      <PhaseShell
        title="Il Bruco"
        subtitle="Gattonare tenendosi alle caviglie — i primi due al traguardo vincono!"
      >
        {!hasWinners ? (
          /* ── WAITING STATE: animated crawling caterpillars ── */
          <div className="flex w-full max-w-xl flex-col gap-4">
            {TEAMS.map((team, idx) => (
              <CaterpillarLane key={team} team={team} delay={idx * 0.4} />
            ))}
            <p
              className="mt-2 text-center text-sm font-semibold uppercase tracking-[0.3em]"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              In attesa del via…
            </p>
          </div>
        ) : (
          /* ── RESULTS STATE: winner podium ── */
          <div className="flex flex-col items-center gap-6">
            {/* Decorative top ring */}
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-4xl"
              style={{
                background: 'color-mix(in oklch, var(--color-accent) 12%, var(--color-card))',
                boxShadow: '0 0 40px color-mix(in oklch, var(--color-accent) 30%, transparent), 0 0 80px color-mix(in oklch, var(--color-accent) 15%, transparent)',
                animation: 'confetti-spin 6s linear infinite',
              }}
            >
              🏆
            </div>

            {/* Winner cards */}
            <div className="flex flex-col items-center gap-3 w-full max-w-sm">
              {winners.map((team, pos) => {
                return (
                  <div
                    key={team}
                    className="flex w-full items-center gap-4 rounded-2xl border px-6 py-4"
                    style={{
                      borderColor: WINNER_STYLE.border,
                      background: WINNER_STYLE.bg,
                      boxShadow: `0 0 30px color-mix(in oklch, ${WINNER_STYLE.glow} 20%, transparent)`,
                      animation: `winner-pop 0.6s cubic-bezier(.34,1.56,.64,1) ${pos * 0.2}s both`,
                    }}
                  >
                    <span className="text-3xl" style={{ animation: `float-up 2s ease-in-out ${pos * 0.3}s infinite` }}>
                      🥇
                    </span>
                    <div className="flex flex-col">
                      <span
                        className="font-display text-2xl font-black uppercase tracking-wide"
                        style={{
                          color: 'var(--color-foreground)',
                          textShadow: `0 0 20px ${WINNER_STYLE.glow}`,
                        }}
                      >
                        {team}
                      </span>
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: WINNER_STYLE.glow }}
                      >
                        1° posto
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Still waiting for 2nd if only 1 finished */}
            {winners.length === 1 && (
              <p
                className="text-sm font-semibold uppercase tracking-[0.25em]"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                In attesa del secondo bruco…
              </p>
            )}
          </div>
        )}
      </PhaseShell>
    </>
  )
}

function CaterpillarLane({ team, delay }: { team: Team; delay: number }) {
  const segments = [0.9, 0.75, 0.85, 0.7, 0.8]
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-28 shrink-0 text-right text-sm font-bold text-foreground"
        style={{ opacity: 0.8 }}
      >
        {team}
      </span>
      {/* Track */}
      <div
        className="relative h-6 flex-1 overflow-visible rounded-full"
        style={{ background: 'color-mix(in oklch, var(--color-primary) 6%, var(--color-card))' }}
      >
        {/* Caterpillar body: chain of circles */}
        <div
          className="absolute inset-y-0 left-4 flex items-center gap-0.5"
          style={{
            animation: `bruco-crawl ${1.4 + delay * 0.15}s ease-in-out infinite`,
            animationDelay: `${delay * 0.3}s`,
          }}
        >
          {segments.map((scale, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: `${scale * 18}px`,
                height: `${scale * 18}px`,
                background: `color-mix(in oklch, var(--color-primary) ${55 + i * 8}%, var(--color-accent))`,
                boxShadow: `0 0 6px color-mix(in oklch, var(--color-primary) 50%, transparent)`,
                opacity: 0.85 + i * 0.03,
              }}
            />
          ))}
          {/* Head */}
          <div
            className="relative rounded-full"
            style={{
              width: 20,
              height: 20,
              background: 'var(--color-accent)',
              boxShadow: '0 0 10px var(--color-accent)',
            }}
          >
            {/* Eyes */}
            <div className="absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-background" />
            <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-background" />
          </div>
        </div>
      </div>
    </div>
  )
}
