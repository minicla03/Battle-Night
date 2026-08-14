import React from 'react'
import { NeonTitle } from '@/components/atoms/neon-title'
import { cn } from '@/lib/utils'

interface PhaseShellProps {
  title: string
  subtitle?: string
  eyebrow?: string
  children?: React.ReactNode
  className?: string
}

export function PhaseShell({
  title,
  subtitle,
  eyebrow = 'Battle Night',
  children,
  className,
}: PhaseShellProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center overflow-y-auto px-6 py-4 text-center',
        className,
      )}
    >
      {/* Inner wrapper: centered when content fits, top-aligned when overflowing */}
      <div className="flex w-full flex-col items-center gap-3 my-auto">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-accent neon-glow-accent">
            {eyebrow}
          </span>
          <NeonTitle as="h1" className="text-4xl leading-[0.95] md:text-5xl">
            {title}
          </NeonTitle>
          {subtitle && (
            <p className="max-w-3xl text-pretty text-sm text-muted-foreground md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
