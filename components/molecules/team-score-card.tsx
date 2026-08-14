import { ScoreBadge } from '@/components/atoms/score-badge'
import { TEAM_TOKENS, type Team } from '@/lib/battle-night/types'
import { cn } from '@/lib/utils'

interface TeamScoreCardProps {
  team: Team
  score: number
  leading?: boolean
  size?: 'sm' | 'lg'
  className?: string
}

export function TeamScoreCard({
  team,
  score,
  leading = false,
  size = 'lg',
  className,
}: TeamScoreCardProps) {
  const token = TEAM_TOKENS[team]
  const accent = `var(--color-${token})`

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-3 rounded-2xl border bg-card/70 p-6 backdrop-blur-sm transition-all',
        leading && 'scale-[1.03]',
        className,
      )}
      style={{
        borderColor: `color-mix(in oklch, ${accent} ${leading ? '90%' : '45%'}, transparent)`,
        boxShadow: leading
          ? `0 0 28px color-mix(in oklch, ${accent} 55%, transparent)`
          : `0 0 12px color-mix(in oklch, ${accent} 20%, transparent)`,
      }}
    >
      {/* top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-1 rounded-full"
        style={{ backgroundColor: accent }}
      />
      {leading && (
        <span
          className="absolute -top-3 right-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-background"
          style={{ backgroundColor: accent }}
        >
          Leader
        </span>
      )}
      <h3
        className="font-display text-xl font-bold uppercase tracking-wide"
        style={{ color: accent }}
      >
        {team}
      </h3>
      <ScoreBadge value={score} colorToken={token} size={size} />
    </div>
  )
}
