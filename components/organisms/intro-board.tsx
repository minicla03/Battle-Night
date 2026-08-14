import { NeonTitle } from '@/components/atoms/neon-title'
import { TEAMS, TEAM_TOKENS } from '@/lib/battle-night/types'

export function IntroBoard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-8 text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.6em] text-accent neon-glow-accent">
        Live Game Show
      </span>
      <div className="flex flex-col items-center">
        <NeonTitle
          as="h1"
          color="primary"
          className="text-8xl leading-[0.85] md:text-[11rem]"
        >
          Battle
        </NeonTitle>
        <NeonTitle
          as="span"
          color="accent"
          className="text-8xl leading-[0.85] md:text-[11rem]"
        >
          Night
        </NeonTitle>
      </div>
      {/* <div className="flex flex-wrap items-center justify-center gap-3">
        {TEAMS.map((team) => (
          <span
            key={team}
            className="rounded-full border px-5 py-2 font-display text-lg font-semibold uppercase tracking-wide"
            style={{
              color: `var(--color-${TEAM_TOKENS[team]})`,
              borderColor: `color-mix(in oklch, var(--color-${TEAM_TOKENS[team]}) 60%, transparent)`,
              boxShadow: `0 0 16px color-mix(in oklch, var(--color-${TEAM_TOKENS[team]}) 30%, transparent)`,
            }}
          >
            {team}
          </span>
        ))}
      </div> */}
    </div>
  )
}
