import { ScoreBadge } from '@/components/atoms/score-badge'
import { NeonTitle } from '@/components/atoms/neon-title'
import { MATCHUPS, TEAM_EMOJI, TEAM_TOKENS, type Team, TEAMS } from '@/lib/battle-night/types'

interface TeamsBoardProps {
  scores: Record<Team, number>
}

/** Large score card — scores are the hero element */
function TeamScoreHero({
  team,
  score,
  leading,
}: {
  team: Team
  score: number
  leading: boolean
}) {
  const accent = `var(--color-${TEAM_TOKENS[team]})`

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-center gap-3 rounded-3xl border-2 py-8 px-4 text-center backdrop-blur-md transition-all duration-300"
      style={{
        borderColor: `color-mix(in oklch, ${accent} ${leading ? '85%' : '35%'}, transparent)`,
        boxShadow: leading
          ? `0 0 60px color-mix(in oklch, ${accent} 40%, transparent), inset 0 0 32px color-mix(in oklch, ${accent} 10%, transparent)`
          : `0 0 20px color-mix(in oklch, ${accent} 16%, transparent)`,
        background: `radial-gradient(ellipse at 50% 20%, color-mix(in oklch, ${accent} ${leading ? '18%' : '8%'}, transparent), transparent 65%), var(--color-card)`,
        transform: leading ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {/* top gradient bar */}
      <div
        className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* leader crown */}
      {leading && (
        <span
          className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest text-background"
          style={{ backgroundColor: accent, boxShadow: `0 0 14px color-mix(in oklch, ${accent} 60%, transparent)` }}
        >
          👑 Leader
        </span>
      )}

      {/* emoji */}
      <span
        className="text-4xl leading-none"
        style={{ filter: `drop-shadow(0 0 10px color-mix(in oklch, ${accent} 55%, transparent))` }}
      >
        {TEAM_EMOJI[team]}
      </span>

      {/* team name */}
      <h2
        className="font-display text-xl font-black uppercase tracking-wide"
        style={{
          color: accent,
          textShadow: `0 0 12px color-mix(in oklch, ${accent} 45%, transparent)`,
        }}
      >
        {team}
      </h2>

      {/* ★ SCORE — the real hero ★ */}
      <ScoreBadge value={score} colorToken={TEAM_TOKENS[team]} size="lg" />
    </div>
  )
}

/** VS divider between two teams */
function VsDivider() {
  return (
    <div className="flex shrink-0 flex-col items-center justify-center px-2">
      <span
        className="text-3xl font-black leading-none select-none"
        style={{
          color: '#fff',
          textShadow:
            '0 0 10px rgba(255,255,255,0.9), 0 0 28px rgba(255,220,50,0.7), 0 0 56px rgba(255,140,0,0.5)',
          animation: 'vsPulse 1.4s ease-in-out infinite',
        }}
      >
        VS
      </span>
      <span className="text-xl" style={{ animation: 'vsPulse 1.4s ease-in-out infinite 0.25s' }}>⚡</span>
    </div>
  )
}

export function TeamsBoard({ scores }: TeamsBoardProps) {
  const max = Math.max(...TEAMS.map((t) => scores[t]))

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 py-4">
      {/* eyebrow */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.55em] text-accent neon-glow-accent">
          Battle Night
        </span>
        <NeonTitle as="h1" color="primary" className="text-4xl md:text-5xl">
          Classifica
        </NeonTitle>
      </div>

      {/* matchup rows */}
      <div className="w-full max-w-5xl space-y-4">
        {MATCHUPS.map(([a, b], i) => (
          <div key={i} className="flex items-stretch gap-3">
            <TeamScoreHero team={a} score={scores[a]} leading={max > 0 && scores[a] === max} />
            <VsDivider />
            <TeamScoreHero team={b} score={scores[b]} leading={max > 0 && scores[b] === max} />
          </div>
        ))}
      </div>
    </div>
  )
}
