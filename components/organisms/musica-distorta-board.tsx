'use client'

import { CountdownTimer } from '@/components/molecules/countdown-timer'
import { PhaseShell } from '@/components/organisms/phase-shell'
import type { DistortedSong } from '@/lib/battle-night/types'
import { Music, Music2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MusicaDistortaBoardProps {
  timer: number
  timerRunning: boolean
  song: DistortedSong
  songIndex: number
  totalSongs: number
  revealed: boolean
}

/** Animated audio wave bars — only rendered when actively playing */
function WaveBars() {
  const bars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45, 0.75, 0.55]
  return (
    <div className="flex items-end justify-center gap-1" style={{ height: 32 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: `${h * 32}px`,
            background: `color-mix(in oklch, var(--color-primary) ${60 + i * 4}%, var(--color-accent))`,
            boxShadow: `0 0 6px color-mix(in oklch, var(--color-primary) 60%, transparent)`,
            animation: `wave-bar ${0.6 + i * 0.07}s ease-in-out infinite alternate`,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}

/** Scrambled characters effect for hidden text */
function HiddenText({ text, chars = 12 }: { text: string; chars?: number }) {
  const [display, setDisplay] = useState('???')
  useEffect(() => {
    const glyphs = '▓░▒█▄▀◆●■▪'
    const scramble = () =>
      Array.from({ length: chars }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join('')
    setDisplay(scramble())
    const id = setInterval(() => setDisplay(scramble()), 120)
    return () => clearInterval(id)
  }, [chars])
  return (
    <span className="font-mono tracking-widest" style={{ color: 'color-mix(in oklch, var(--color-primary) 50%, transparent)' }}>
      {display}
    </span>
  )
}

export function MusicaDistortaBoard({
  timer,
  timerRunning,
  song,
  songIndex,
  totalSongs,
  revealed,
}: MusicaDistortaBoardProps) {
  return (
    <PhaseShell
      title="Musica Distorta"
      subtitle={revealed ? 'Risposta rivelata!' : 'Ascolta e indovina il brano…'}
    >
      {/* Main card */}
      <div
        className="relative flex w-full max-w-2xl flex-col items-center gap-3 overflow-hidden rounded-3xl border px-6 py-5 text-center transition-all duration-700"
        style={{
          borderColor: revealed
            ? 'color-mix(in oklch, var(--color-accent) 60%, transparent)'
            : 'color-mix(in oklch, var(--color-primary) 40%, transparent)',
          boxShadow: revealed
            ? '0 0 60px color-mix(in oklch, var(--color-accent) 30%, transparent)'
            : '0 0 40px color-mix(in oklch, var(--color-primary) 15%, transparent)',
          background: revealed
            ? 'color-mix(in oklch, var(--color-accent) 6%, var(--color-card))'
            : 'color-mix(in oklch, var(--color-card) 85%, transparent)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Top row: badge + timer */}
        <div className="flex w-full items-center justify-between">
          <span
            className="rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-widest"
            style={{
              borderColor: revealed
                ? 'color-mix(in oklch, var(--color-accent) 60%, transparent)'
                : 'color-mix(in oklch, var(--color-primary) 50%, transparent)',
              background: 'var(--color-background)',
              color: revealed ? 'var(--color-accent)' : 'var(--color-primary)',
            }}
          >
            Brano {songIndex + 1} / {totalSongs}
          </span>
          <CountdownTimer seconds={timer} running={timerRunning} size="md" />
        </div>

        {/* Icon + wave in a row */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{
              background: revealed
                ? 'color-mix(in oklch, var(--color-accent) 15%, transparent)'
                : 'color-mix(in oklch, var(--color-primary) 12%, transparent)',
            }}
          >
            {revealed
              ? <Music className="h-6 w-6" style={{ color: 'var(--color-accent)' }} />
              : <Music2 className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
            }
          </div>
          {timerRunning && !revealed && <WaveBars />}
        </div>

        {/* Hint */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          {song.hint}
        </p>

        {/* Title / Artist */}
        <div className="flex flex-col items-center gap-1">
          {revealed ? (
            <>
              <p
                className="font-display text-3xl font-black uppercase tracking-wide leading-tight"
                style={{
                  color: 'var(--color-foreground)',
                  textShadow: '0 0 32px color-mix(in oklch, var(--color-accent) 50%, transparent)',
                }}
              >
                {song.title}
              </p>
              <p
                className="font-display text-lg font-bold"
                style={{ color: 'var(--color-accent)' }}
              >
                {song.artist}
              </p>
              <p
                className="text-sm font-semibold tabular-nums"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {song.year}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-2xl font-black">
                <HiddenText text={song.title} chars={song.title.length} />
              </p>
              <p className="font-display text-lg font-bold">
                <HiddenText text={song.artist} chars={song.artist.length} />
              </p>
            </>
          )}
        </div>
      </div>
    </PhaseShell>
  )
}
