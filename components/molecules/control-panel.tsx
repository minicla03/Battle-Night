import React from 'react'
import { cn } from '@/lib/utils'

interface ControlPanelProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ControlPanel({
  title,
  icon,
  children,
  className,
}: ControlPanelProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm',
        className,
      )}
    >
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}
