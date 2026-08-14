import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  seconds: number
  running?: boolean
  size?: 'md' | 'lg'
  className?: string
}

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function CountdownTimer({
  seconds,
  running = false,
  size = 'lg',
  className,
}: CountdownTimerProps) {
  const danger = seconds <= 10
  const expired = seconds === 0

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <span
        className={cn(
          'font-display font-bold tabular-nums leading-none',
          size === 'lg' ? 'text-8xl md:text-9xl' : 'text-5xl',
          expired
            ? 'text-destructive neon-glow-accent'
            : danger
              ? 'text-destructive'
              : 'text-accent neon-glow-accent',
          running && danger && !expired && 'animate-pulse',
        )}
      >
        {format(seconds)}
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {expired ? 'Tempo Scaduto' : running ? 'In Corso' : 'In Pausa'}
      </span>
    </div>
  )
}
