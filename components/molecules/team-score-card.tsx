import { ScoreBadge } from '@/components/atoms/score-badge'
import { TEAM_EMOJI, TEAM_SUBTITLE, TEAM_TOKENS, type Team } from '@/lib/battle-night/types'
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
  const isLg = size === 'lg'

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-3 rounded-2xl border-2 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300',
        leading && 'scale-[1.05]',
        className,
      )}
      style={{
        borderColor: `color-mix(in oklch, ${accent} ${leading ? '90%' : '40%'}, transparent)`,
        boxShadow: leading
          ? `0 0 40px color-mix(in oklch, ${accent} 50%, transparent), 0 0 80px color-mix(in oklch, ${accent} 20%, transparent)`
          : `0 0 16px color-mix(in oklch, ${accent} 18%, transparent)`,
        background: leading
          ? `radial-gradient(ellipse at 50% 20%, color-mix(in oklch, ${accent} 18%, transparent), transparent 65%), var(--color-card)`
          : undefined,
      }}
    >
      {/* top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-4 top-0 h-1.5 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* leader badge */}
      {leading && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[11px] font-black uppercase tracking-widest text-background whitespace-nowrap"
          style={{ backgroundColor: accent, boxShadow: `0 0 12px color-mix(in oklch, ${accent} 60%, transparent)` }}
        >
          👑 Leader
        </span>
      )}

      {/* emoji */}
      <span
        className={cn(isLg ? 'text-4xl' : 'text-2xl', 'leading-none')}
        style={{ filter: `drop-shadow(0 0 10px color-mix(in oklch, ${accent} 55%, transparent))` }}
      >
        {TEAM_EMOJI[team]}
      </span>

      {/* team label */}
      <div className="flex flex-col items-center gap-0.5">
        {isLg && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.4em]"
            style={{ color: `color-mix(in oklch, ${accent} 70%, white)` }}
          >
            {TEAM_SUBTITLE[team]}
          </span>
        )}
        <h3
          className={cn('font-display font-black uppercase tracking-wide', isLg ? 'text-xl' : 'text-base')}
          style={{
            color: accent,
            textShadow: `0 0 10px color-mix(in oklch, ${accent} 45%, transparent)`,
          }}
        >
          {team}
        </h3>
      </div>

      <ScoreBadge value={score} colorToken={token} size={size} />
    </div>
  )
}
