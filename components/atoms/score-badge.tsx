import { cn } from '@/lib/utils'

interface ScoreBadgeProps {
  value: number
  colorToken?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'text-lg px-3 py-1 min-w-12',
  md: 'text-3xl px-4 py-1.5 min-w-16',
  lg: 'text-6xl px-6 py-2 min-w-28',
}

export function ScoreBadge({
  value,
  colorToken,
  size = 'md',
  className,
}: ScoreBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl border font-display font-bold tabular-nums',
        'bg-background/60 backdrop-blur-sm',
        sizeClasses[size],
        className,
      )}
      style={
        colorToken
          ? {
              color: `var(--color-${colorToken})`,
              borderColor: `color-mix(in oklch, var(--color-${colorToken}) 60%, transparent)`,
              boxShadow: `0 0 16px color-mix(in oklch, var(--color-${colorToken}) 40%, transparent)`,
            }
          : undefined
      }
    >
      {value}
    </span>
  )
}
