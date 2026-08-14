import { Scoreboard } from '@/components/molecules/scoreboard'
import { PhaseShell } from '@/components/organisms/phase-shell'
import type { Team } from '@/lib/battle-night/types'

interface TeamsBoardProps {
  scores: Record<Team, number>
}

export function TeamsBoard({ scores }: TeamsBoardProps) {
  return (
    <PhaseShell title="Le Squadre" subtitle="Quattro squadre. Una sola vittoria.">
      <div className="w-full max-w-6xl">
        <Scoreboard scores={scores} size="lg" />
      </div>
    </PhaseShell>
  )
}
