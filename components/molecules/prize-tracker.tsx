import { INITIAL_PRIZE_POOL } from '@/lib/battle-night/types'
import { cn } from '@/lib/utils'

interface PrizeTrackerProps {
  prizePool: number
  size?: 'md' | 'lg'
  className?: string
}

function formatEuro(value: number) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function PrizeTracker({
  prizePool,
  size = 'lg',
  className,
}: PrizeTrackerProps) {
  const pct = Math.min(100, Math.round((prizePool / INITIAL_PRIZE_POOL) * 100))

  return (
    <div className={cn('flex w-full flex-col items-center gap-3', className)}>
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Montepremi
      </span>
      <span
        className={cn(
          'font-display font-bold tabular-nums text-primary neon-glow-primary',
          size === 'lg' ? 'text-7xl md:text-8xl' : 'text-4xl',
        )}
      >
        {formatEuro(prizePool)}
      </span>
      <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 neon-box-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
