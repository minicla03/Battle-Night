'use client'

import { useEffect, useRef, useState } from 'react'
import { BrucoBoard } from '@/components/organisms/bruco-board'
import { FinalistaBoard } from '@/components/organisms/finalista-board'
import { GhigliottinaBoard } from '@/components/organisms/ghigliottina-board'
import { IntesaVincenteBoard } from '@/components/organisms/intesa-vincente-board'
import { IntroBoard } from '@/components/organisms/intro-board'
import { InversioneLogicaGrid } from '@/components/organisms/inversione-logica-grid'
import { MusicaDistortaBoard } from '@/components/organisms/musica-distorta-board'
import { TeamsBoard } from '@/components/organisms/teams-board'
import type { GameState, Phase } from '@/lib/battle-night/types'
import { DISTORTED_SONGS, GHIGLIOTTINA_SETS } from '@/lib/battle-night/types'

/** Render the right board for the given phase */
function renderBoard(state: GameState) {
  switch (state.currentPhase) {
    case 'INTRO':
      return <IntroBoard introRevealStep={state.introRevealStep} />
    case 'TEAMS':
      return <TeamsBoard scores={state.scores} />
    case 'MUSICA_DISTORTA':
      return (
        <MusicaDistortaBoard
          timer={state.timer}
          timerRunning={state.timerRunning}
          song={DISTORTED_SONGS[state.musicaIndex]}
          songIndex={state.musicaIndex}
          totalSongs={DISTORTED_SONGS.length}
          revealed={state.musicaRevealed}
        />
      )
    case 'INTESA_VINCENTE':
      return (
        <IntesaVincenteBoard
          timer={state.timer}
          timerRunning={state.timerRunning}
          currentWord={state.intesaWords[state.intesaWordIndex] ?? ''}
          wordIndex={state.intesaWordIndex}
          totalWords={state.intesaWords.length}
        />
      )
    case 'GHIGLIOTTINA':
      return (
        <GhigliottinaBoard
          currentSet={GHIGLIOTTINA_SETS[state.ghigliottinaSetIndex]}
          setIndex={state.ghigliottinaSetIndex}
          totalSets={GHIGLIOTTINA_SETS.length}
          timer={state.timer}
          timerRunning={state.timerRunning}
        />
      )
    case 'BRUCO':
      return (
        <BrucoBoard
          timer={state.timer}
          timerRunning={state.timerRunning}
          finishOrder={state.brucoFinishOrder}
        />
      )
    case 'FINALISTA':
      return <FinalistaBoard scores={state.scores} />
    case 'INVERSIONE_LOGICA':
      return (
        <InversioneLogicaGrid
          logicStep={state.logicStep}
          timer={state.timer}
          timerRunning={state.timerRunning}
        />
      )
    default:
      return <IntroBoard introRevealStep={state.introRevealStep} />
  }
}

type TransitionState = 'idle' | 'exiting' | 'entering'

const TRANSITION_MS = 350 // ms for each half

export function PhaseRenderer({ state }: { state: GameState }) {
  // The phase whose content is currently *visible* on screen
  const [visibleState, setVisibleState] = useState<GameState>(state)
  const [transition, setTransition] = useState<TransitionState>('idle')
  const pendingRef = useRef<GameState | null>(null)

  useEffect(() => {
    // Only animate when the phase changes (not on every state update)
    if (state.currentPhase === visibleState.currentPhase) {
      // Same phase — update visible state immediately (scores, timer, etc.)
      setVisibleState(state)
      return
    }

    // Phase changed → start exit animation, then swap content, then enter
    pendingRef.current = state
    setTransition('exiting')

    const exitTimer = setTimeout(() => {
      // Swap to the new phase content (invisible during blur)
      if (pendingRef.current) setVisibleState(pendingRef.current)
      setTransition('entering')

      const enterTimer = setTimeout(() => {
        setTransition('idle')
      }, TRANSITION_MS)

      return () => clearTimeout(enterTimer)
    }, TRANSITION_MS)

    return () => clearTimeout(exitTimer)
  }, [state.currentPhase]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep non-phase fields in sync without triggering animations
  useEffect(() => {
    if (transition === 'idle' && state.currentPhase === visibleState.currentPhase) {
      setVisibleState(state)
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  const animationStyle: React.CSSProperties =
    transition === 'exiting'
      ? { animation: `phaseOut ${TRANSITION_MS}ms ease-in-out both` }
      : transition === 'entering'
        ? { animation: `phaseIn ${TRANSITION_MS}ms ease-out both` }
        : {}

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={animationStyle}
    >
      {renderBoard(visibleState)}
    </div>
  )
}
