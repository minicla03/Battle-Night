'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'accent' | 'neutral' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ControlButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  active?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:brightness-110 border-transparent',
  accent:
    'bg-accent text-accent-foreground hover:brightness-110 border-transparent',
  neutral:
    'bg-secondary text-secondary-foreground hover:bg-muted border-border',
  danger:
    'bg-destructive text-destructive-foreground hover:brightness-110 border-transparent',
  ghost:
    'bg-transparent text-foreground hover:bg-secondary border-border',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
}

export function ControlButton({
  variant = 'neutral',
  size = 'md',
  active = false,
  className,
  children,
  ...props
}: ControlButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border font-medium',
        'transition-all duration-150 outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'active:scale-[0.97]',
        variantClasses[variant],
        sizeClasses[size],
        active && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
