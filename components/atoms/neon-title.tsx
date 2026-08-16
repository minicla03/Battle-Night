import { cn } from '@/lib/utils'

type NeonColor = 'primary' | 'accent' | 'foreground'

interface NeonTitleProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  color?: NeonColor
  className?: string
  style?: React.CSSProperties
}

const colorClasses: Record<NeonColor, string> = {
  primary: 'text-primary neon-glow-primary',
  accent: 'text-accent neon-glow-accent',
  foreground: 'text-foreground',
}

export function NeonTitle({
  children,
  as: Tag = 'h2',
  color = 'primary',
  className,
  style,
}: NeonTitleProps) {
  return (
    <Tag
      className={cn(
        'font-display font-bold uppercase tracking-tight text-balance',
        colorClasses[color],
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}
