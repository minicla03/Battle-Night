'use client'

import { useEffect, useRef, useState } from 'react'
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

/** SVG circular progress ring */
function Ring({ pct, danger, expired }: { pct: number; danger: boolean; expired: boolean }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const color = expired
    ? 'oklch(0.65 0.26 15)'   // red
    : danger
      ? 'oklch(0.72 0.22 30)' // orange
      : 'oklch(0.72 0.22 240)' // accent blue

  return (
    <svg
      className="absolute inset-0 -rotate-90"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {/* track */}
      <circle
        cx="60" cy="60" r={r}
        fill="none"
        stroke="oklch(0.28 0.04 275 / 0.4)"
        strokeWidth="6"
      />
      {/* progress */}
      <circle
        cx="60" cy="60" r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        style={{
          transition: 'stroke-dashoffset 0.9s linear, stroke 0.4s ease',
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      />
    </svg>
  )
}

export function CountdownTimer({
  seconds,
  running = false,
  size = 'lg',
  className,
}: CountdownTimerProps) {
  const danger  = seconds <= 10 && seconds > 0
  const expired = seconds === 0
  const isLg    = size === 'lg'

  // track the "starting" value to compute ring percentage
  const startRef = useRef(seconds)
  useEffect(() => {
    // reset start whenever timer goes up (new round / reset)
    if (seconds > startRef.current || !running) {
      startRef.current = seconds
    }
  }, [seconds, running])
  const pct = startRef.current > 0 ? seconds / startRef.current : 0

  // shake animation trigger on expire
  const [shaking, setShaking] = useState(false)
  const prevSeconds = useRef(seconds)
  useEffect(() => {
    if (prevSeconds.current > 0 && seconds === 0) {
      setShaking(true)
      const t = setTimeout(() => setShaking(false), 700)
      return () => clearTimeout(t)
    }
    prevSeconds.current = seconds
  }, [seconds])

  const textColor = expired
    ? 'text-destructive'
    : danger
      ? 'text-orange-400'
      : 'text-accent neon-glow-accent'

  const glowStyle = expired
    ? { textShadow: '0 0 16px oklch(0.65 0.26 15 / 0.9), 0 0 48px oklch(0.65 0.26 15 / 0.5)' }
    : danger
      ? { textShadow: '0 0 12px oklch(0.72 0.22 30 / 0.8), 0 0 36px oklch(0.72 0.22 30 / 0.4)' }
      : undefined

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {/* ring + number */}
      <div
        className={cn(
          'relative flex items-center justify-center',
          isLg ? 'h-44 w-44' : 'h-28 w-28',
          shaking && 'animate-bounce',
        )}
        style={shaking ? { animation: 'timerShake 0.6s ease-in-out' } : undefined}
      >
        {isLg && <Ring pct={pct} danger={danger} expired={expired} />}

        <span
          className={cn(
            'font-display font-black tabular-nums leading-none transition-colors duration-300',
            isLg ? 'text-7xl' : 'text-5xl',
            textColor,
            // danger pulse on the text
            running && danger && !expired && 'animate-pulse',
          )}
          style={glowStyle}
        >
          {format(seconds)}
        </span>

        {/* expired overlay flash */}
        {expired && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, oklch(0.65 0.26 15 / 0.15), transparent 70%)',
              animation: 'vsPulse 1s ease-in-out infinite',
            }}
          />
        )}
      </div>

      {/* status label */}
      <span
        className={cn(
          'text-xs font-bold uppercase tracking-[0.35em]',
          expired ? 'text-destructive' : danger ? 'text-orange-400' : 'text-muted-foreground',
        )}
      >
        {expired ? '⏰ Tempo Scaduto!' : running ? '▶ In Corso' : '⏸ In Pausa'}
      </span>
    </div>
  )
}
