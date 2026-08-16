'use client'

import { ControlButton } from '@/components/atoms/control-button'
import { ControlPanel } from '@/components/molecules/control-panel'
import type { useGameController } from '@/lib/battle-night/store'
import {
  DISTORTED_SONGS,
  GHIGLIOTTINA_SETS,
  LOGIC_QUESTIONS,
  LOGIC_TOTAL_STEPS,
  PHASE_LABELS,
  PHASES,
  TEAMS,
  TEAM_EMOJI,
  TEAM_TOKENS,
} from '@/lib/battle-night/types'
import {
  Bug,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Layers,
  ListOrdered,
  Minus,
  Music,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Scissors,
  Shuffle,
  Sparkles,
  Square,
  Timer,
  Trophy,
  Volume2,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

type Controller = ReturnType<typeof useGameController>

const SCORE_DELTAS = [1, 2, 5, 10, 25, 50]
const TIMER_PRESETS = [15, 30, 45, 60, 90, 120, 180]

/** Audio player wired to the Musica Distorta section */
function MusicaAudioPlayer({ ctrl }: { ctrl: Controller }) {
  const { state } = ctrl
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const song = DISTORTED_SONGS[state.musicaIndex]
  const src = `/songs/${song.audioFile}`

  // When song changes: reload the audio element and reset
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.pause()
    el.load()
    // If playing was requested before song change it got reset to false in store
  }, [state.musicaIndex])

  // Sync play/pause state from store
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (state.musicaPlaying) {
      el.play().catch(() => {
        // autoplay blocked — silently fail, user needs to interact first
        ctrl.pauseMusica()
      })
    } else {
      el.pause()
    }
  }, [state.musicaPlaying]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync volume from store
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.volume = state.musicaVolume
  }, [state.musicaVolume])

  const handleStop = () => {
    const el = audioRef.current
    if (el) { el.pause(); el.currentTime = 0 }
    ctrl.pauseMusica()
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden audio element */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={src} preload="auto" onEnded={() => ctrl.pauseMusica()} />

      {/* File badge */}
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2">
        <Music className="h-4 w-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
        <span className="truncate text-xs font-mono text-muted-foreground">{song.audioFile}</span>
      </div>

      {/* Transport controls */}
      <div className="flex items-center gap-2">
        {state.musicaPlaying ? (
          <ControlButton variant="neutral" onClick={ctrl.pauseMusica}>
            <Pause className="h-4 w-4" /> Pausa
          </ControlButton>
        ) : (
          <ControlButton variant="accent" onClick={ctrl.playMusica}>
            <Play className="h-4 w-4" /> Riproduci
          </ControlButton>
        )}
        <ControlButton variant="ghost" onClick={handleStop}>
          <Square className="h-4 w-4" /> Stop
        </ControlButton>
      </div>

      {/* Volume slider */}
      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 shrink-0" style={{ color: 'var(--color-muted-foreground)' }} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={state.musicaVolume}
          onChange={(e) => ctrl.setMusicaVolume(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${state.musicaVolume * 100}%, color-mix(in oklch, var(--color-border) 60%, transparent) ${state.musicaVolume * 100}%)`,
            accentColor: 'var(--color-accent)',
          }}
          aria-label="Volume"
        />
        <span className="w-8 text-right text-xs font-semibold tabular-nums text-muted-foreground">
          {Math.round(state.musicaVolume * 100)}%
        </span>
      </div>
    </div>
  )
}

export function AdminControls({ ctrl }: { ctrl: Controller }) {
  const { state } = ctrl

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

      {/* 1 — Fase di Gioco */}
      <ControlPanel
        title="Fase di Gioco"
        icon={<Layers className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <div className="flex flex-wrap gap-2">
          {PHASES.map((phase) => (
            <ControlButton
              key={phase}
              size="sm"
              variant={state.currentPhase === phase ? 'primary' : 'neutral'}
              active={state.currentPhase === phase}
              onClick={() => ctrl.setPhase(phase)}
            >
              {PHASE_LABELS[phase]}
            </ControlButton>
          ))}
        </div>
        <div className="flex gap-2">
          <ControlButton variant="ghost" size="sm" onClick={ctrl.prevPhase}>
            Fase Precedente
          </ControlButton>
          <ControlButton variant="accent" size="sm" onClick={ctrl.nextPhase}>
            Fase Successiva
          </ControlButton>
        </div>
      </ControlPanel>

      {/* 1b — Intro: presentazione squadre */}
      {state.currentPhase === 'INTRO' && (
        <ControlPanel
          title="Intro – Presentazione Squadre"
          icon={<Sparkles className="h-4 w-4" />}
          className="xl:col-span-2"
        >
          <div className="flex flex-col gap-3">
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Squadre rivelate:
              </span>
              <div className="flex gap-1.5">
                {TEAMS.map((team, i) => (
                  <span
                    key={team}
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold transition-all duration-300"
                    style={{
                      background: i < state.introRevealStep
                        ? `color-mix(in oklch, var(--color-${TEAM_TOKENS[team]}) 25%, transparent)`
                        : 'color-mix(in oklch, var(--color-border) 40%, transparent)',
                      color: i < state.introRevealStep
                        ? `var(--color-${TEAM_TOKENS[team]})`
                        : 'var(--color-muted-foreground)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: i < state.introRevealStep
                        ? `color-mix(in oklch, var(--color-${TEAM_TOKENS[team]}) 50%, transparent)`
                        : 'transparent',
                    }}
                  >
                    {TEAM_EMOJI[team]} {team}
                  </span>
                ))}
              </div>
            </div>

            {/* Main action buttons */}
            <div className="flex flex-wrap gap-2">
              <ControlButton
                variant="primary"
                disabled={state.introRevealStep >= TEAMS.length}
                onClick={ctrl.revealNextIntroTeam}
              >
                <Sparkles className="h-4 w-4" />
                {state.introRevealStep === 0
                  ? 'Presenta prima squadra'
                  : state.introRevealStep >= TEAMS.length
                    ? 'Tutte rivelate ✓'
                    : `Rivela ${TEAMS[state.introRevealStep]}`
                }
              </ControlButton>
              <ControlButton
                variant="ghost"
                size="sm"
                disabled={state.introRevealStep === 0}
                onClick={ctrl.resetIntroReveal}
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </ControlButton>
            </div>
          </div>
        </ControlPanel>
      )}

      <ControlPanel title="Timer" icon={<Timer className="h-4 w-4" />}>
        <div className="flex items-center justify-between">
          <span className="font-display text-4xl font-bold tabular-nums text-accent">
            {Math.floor(state.timer / 60)}:
            {(state.timer % 60).toString().padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {state.timerRunning ? (
              <ControlButton variant="neutral" onClick={ctrl.pauseTimer}>
                <Pause className="h-4 w-4" /> Pausa
              </ControlButton>
            ) : (
              <ControlButton
                variant="accent"
                onClick={ctrl.startTimer}
                disabled={state.timer === 0}
              >
                <Play className="h-4 w-4" /> Avvia
              </ControlButton>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TIMER_PRESETS.map((s) => (
            <ControlButton
              key={s}
              size="sm"
              variant="ghost"
              onClick={() => ctrl.resetTimer(s)}
            >
              <RotateCcw className="h-3 w-3" />
              {s}s
            </ControlButton>
          ))}
        </div>
      </ControlPanel>

      {/* 3 — Punteggi (fase TEAMS) */}
      <ControlPanel
        title="Punteggi"
        icon={<Trophy className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TEAMS.map((team) => (
            <div
              key={team}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 p-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-8 w-1.5 rounded-full"
                  style={{ backgroundColor: `var(--color-${TEAM_TOKENS[team]})` }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{team}</span>
                  <span
                    className="font-display text-xl font-bold tabular-nums"
                    style={{ color: `var(--color-${TEAM_TOKENS[team]})` }}
                  >
                    {state.scores[team]}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                {SCORE_DELTAS.map((d) => (
                  <ControlButton
                    key={`plus-${d}`}
                    size="sm"
                    variant="accent"
                    aria-label={`Aggiungi ${d} punti a ${team}`}
                    onClick={() => ctrl.changeScore(team, d)}
                  >
                    <Plus className="h-3 w-3" />
                    {d}
                  </ControlButton>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ControlPanel>

      {/* 4 — Musica Distorta */}
      <ControlPanel
        title="Musica Distorta"
        icon={<Music className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <div className="flex flex-col gap-4">
          {/* Navigation row */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-primary">
              Brano {state.musicaIndex + 1} / {DISTORTED_SONGS.length}
            </span>
            <div className="flex gap-2">
              <ControlButton size="sm" variant="ghost" onClick={ctrl.prevMusica}>
                <ChevronLeft className="h-4 w-4" /> Prec.
              </ControlButton>
              <ControlButton size="sm" variant="primary" onClick={ctrl.nextMusica}>
                Succ. <ChevronRight className="h-4 w-4" />
              </ControlButton>
            </div>
          </div>

          {/* Song info card */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {DISTORTED_SONGS[state.musicaIndex].hint}
                </p>
                <p className="font-display text-xl font-bold text-foreground">
                  {DISTORTED_SONGS[state.musicaIndex].title}
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                  {DISTORTED_SONGS[state.musicaIndex].artist} · {DISTORTED_SONGS[state.musicaIndex].year}
                </p>
              </div>
              <div
                className="flex shrink-0 flex-col items-center rounded-xl px-3 py-1.5"
                style={{
                  background: 'color-mix(in oklch, var(--color-accent) 15%, transparent)',
                  border: '1px solid color-mix(in oklch, var(--color-accent) 40%, transparent)',
                }}
              >
                <span className="font-display text-2xl font-black" style={{ color: 'var(--color-accent)' }}>
                  +{DISTORTED_SONGS[state.musicaIndex].points}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {DISTORTED_SONGS[state.musicaIndex].points === 1 ? 'punto' : 'punti'}
                </span>
              </div>
            </div>
          </div>

          {/* Reveal controls */}
          <div className="flex gap-2">
            {state.musicaRevealed ? (
              <ControlButton variant="neutral" onClick={ctrl.hideMusica}>
                <EyeOff className="h-4 w-4" /> Nascondi risposta
              </ControlButton>
            ) : (
              <ControlButton variant="accent" onClick={ctrl.revealMusica}>
                <Eye className="h-4 w-4" /> Rivela risposta
              </ControlButton>
            )}
          </div>

          {/* Audio player */}
          <div
            className="rounded-xl border px-4 py-3"
            style={{
              borderColor: 'color-mix(in oklch, var(--color-primary) 25%, transparent)',
              background: 'color-mix(in oklch, var(--color-primary) 4%, transparent)',
            }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
              🎵 Player Audio (Admin)
            </p>
            <MusicaAudioPlayer ctrl={ctrl} />
          </div>
        </div>
      </ControlPanel>

      {/* 5 — Intesa Vincente */}
      <ControlPanel
        title="Intesa Vincente – Parole"
        icon={<Shuffle className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Parola corrente</span>
            <span className="font-display text-2xl font-bold text-foreground">
              {state.intesaWords[state.intesaWordIndex] ?? '—'}
            </span>
            <span className="text-xs text-muted-foreground">
              {state.intesaWordIndex + 1} / {state.intesaWords.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <ControlButton variant="primary" onClick={ctrl.nextIntesaWord}>
              <ChevronRight className="h-4 w-4" /> Parola Successiva
            </ControlButton>
            <ControlButton variant="ghost" onClick={ctrl.reshuffleIntesaWords}>
              <Shuffle className="h-4 w-4" /> Rimescola
            </ControlButton>
          </div>
        </div>
      </ControlPanel>

      {/* 6 — La Ghigliottina */}
      <ControlPanel
        title="La Ghigliottina – Set"
        icon={<Scissors className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-primary">
              Set {state.ghigliottinaSetIndex + 1} / {GHIGLIOTTINA_SETS.length}
            </span>
            <div className="flex gap-2">
              <ControlButton size="sm" variant="ghost" onClick={ctrl.prevGhigliottinaSet}>
                <ChevronLeft className="h-4 w-4" /> Prec.
              </ControlButton>
              <ControlButton size="sm" variant="primary" onClick={ctrl.nextGhigliottinaSet}>
                Succ. <ChevronRight className="h-4 w-4" />
              </ControlButton>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {GHIGLIOTTINA_SETS[state.ghigliottinaSetIndex].clues.map((clue) => (
              <div
                key={clue}
                className="flex items-center justify-center rounded-xl border border-primary/30 bg-primary/8 px-2 py-2 text-center"
              >
                <span className="text-sm font-bold text-foreground">{clue}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/8 px-4 py-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Soluzione:</span>
            <span className="font-display text-lg font-bold text-accent">
              {GHIGLIOTTINA_SETS[state.ghigliottinaSetIndex].solution}
            </span>
          </div>
        </div>
      </ControlPanel>

      {/* 7 — Il Bruco */}
      <ControlPanel
        title="Il Bruco – Ordine di Arrivo"
        icon={<Bug className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap min-h-8">
            {state.brucoFinishOrder.length === 0 ? (
              <span className="text-sm text-muted-foreground">Nessun arrivo registrato</span>
            ) : (
              state.brucoFinishOrder.map((team, i) => (
                <span
                  key={team}
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold"
                  style={{
                    borderColor: i <= 1
                      ? 'color-mix(in oklch, var(--color-accent) 60%, transparent)'
                      : 'color-mix(in oklch, #94a3b8 50%, transparent)',
                    background: i <= 1
                      ? 'color-mix(in oklch, var(--color-accent) 10%, transparent)'
                      : 'color-mix(in oklch, #94a3b8 8%, transparent)',
                    color: i <= 1 ? 'var(--color-accent)' : '#94a3b8',
                  }}
                >
                  {i <= 1 ? '🥇' : '🏅'} {team}
                </span>
              ))
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TEAMS.map((team) => {
              const pos = state.brucoFinishOrder.indexOf(team)
              const finished = pos !== -1
              const isWinner = pos === 0 || pos === 1
              return (
                <ControlButton
                  key={team}
                  variant={finished ? (isWinner ? 'accent' : 'neutral') : 'primary'}
                  disabled={finished}
                  onClick={() => ctrl.setBrucoFinish(team)}
                >
                  {finished ? (isWinner ? `🥇 ${team}` : `${team} ✓`) : team}
                </ControlButton>
              )
            })}
          </div>
          <div className="flex gap-2 border-t border-border pt-2">
            <ControlButton
              variant="ghost"
              size="sm"
              disabled={state.brucoFinishOrder.length === 0}
              onClick={ctrl.undoBrucoFinish}
            >
              <RotateCcw className="h-3 w-3" /> Annulla ultimo
            </ControlButton>
            <ControlButton
              variant="danger"
              size="sm"
              disabled={state.brucoFinishOrder.length === 0}
              onClick={ctrl.resetBruco}
            >
              <RotateCcw className="h-3 w-3" /> Reset gara
            </ControlButton>
          </div>
        </div>
      </ControlPanel>

      {/* 8 — Inversione Logica */}
      <ControlPanel
        title="Inversione Logica"
        icon={<ListOrdered className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        {state.logicStep >= LOGIC_TOTAL_STEPS ? (
          <p className="font-display text-lg font-bold text-accent">Sequenza completata! ✓</p>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-primary">
                Passo {state.logicStep + 1} / {LOGIC_TOTAL_STEPS}
              </span>
            </div>
            <p className="text-base font-semibold leading-snug text-foreground">
              {LOGIC_QUESTIONS[state.logicStep]?.question}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(['A', 'B'] as const).map((letter) => {
                const q = LOGIC_QUESTIONS[state.logicStep]
                const text = letter === 'A' ? q?.optionA : q?.optionB
                const isCorrect = q?.correct === letter
                return (
                  <div
                    key={letter}
                    className="flex items-center gap-2 rounded-xl border px-4 py-2.5"
                    style={{
                      borderColor: isCorrect
                        ? 'color-mix(in oklch, #22c55e 40%, transparent)'
                        : 'color-mix(in oklch, #ef4444 30%, transparent)',
                      background: isCorrect
                        ? 'color-mix(in oklch, #22c55e 8%, transparent)'
                        : 'color-mix(in oklch, #ef4444 6%, transparent)',
                    }}
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold"
                      style={{
                        background: isCorrect
                          ? 'color-mix(in oklch, #22c55e 20%, transparent)'
                          : 'color-mix(in oklch, #ef4444 18%, transparent)',
                        color: isCorrect ? '#22c55e' : '#ef4444',
                      }}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-foreground">{text}</span>
                    <span
                      className="ml-auto text-xs font-bold"
                      style={{ color: isCorrect ? '#22c55e' : '#ef4444' }}
                    >
                      {isCorrect ? '✓ Corretta' : '✗ Errata'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
          <ControlButton
            variant="ghost"
            onClick={ctrl.decrementLogic}
            disabled={state.logicStep === 0}
          >
            <Minus className="h-4 w-4" /> Passo Indietro
          </ControlButton>
          <ControlButton
            variant="primary"
            onClick={ctrl.incrementLogic}
            disabled={state.logicStep >= LOGIC_TOTAL_STEPS}
          >
            <Plus className="h-4 w-4" /> Passo Avanti
          </ControlButton>
          <ControlButton variant="danger" onClick={ctrl.errorReset}>
            <RotateCcw className="h-4 w-4" /> Errore (Reset)
          </ControlButton>
        </div>
      </ControlPanel>

      {/* 9 — Controllo Partita */}
      <ControlPanel
        title="Controllo Partita"
        icon={<RotateCcw className="h-4 w-4" />}
        className="xl:col-span-2"
      >
        <ControlButton variant="danger" onClick={ctrl.resetGame}>
          <RotateCcw className="h-4 w-4" /> Reset Completo Partita
        </ControlButton>
      </ControlPanel>

    </div>
  )
}
