import { TeamScoreCard } from '@/components/molecules/team-score-card'
import { TEAMS, type Team } from '@/lib/battle-night/types'
import { cn } from '@/lib/utils'

interface ScoreboardProps {
  scores: Record<Team, number>
  size?: 'sm' | 'lg'
  className?: string
}

export function Scoreboard({ scores, size = 'lg', className }: ScoreboardProps) {
  const max = Math.max(...TEAMS.map((t) => scores[t]))

  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 gap-4 lg:grid-cols-4',
        className,
      )}
    >
      {TEAMS.map((team) => (
        <TeamScoreCard
          key={team}
          team={team}
          score={scores[team]}
          size={size}
          leading={max > 0 && scores[team] === max}
        />
      ))}
    </div>
  )
}
