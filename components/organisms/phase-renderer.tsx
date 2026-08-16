import React from 'react'
import { BrucoBoard } from '@/components/organisms/bruco-board'
import { GhigliottinaBoard } from '@/components/organisms/ghigliottina-board'
import { IntesaVincenteBoard } from '@/components/organisms/intesa-vincente-board'
import { IntroBoard } from '@/components/organisms/intro-board'
import { InversioneLogicaGrid } from '@/components/organisms/inversione-logica-grid'
import { MusicaDistortaBoard } from '@/components/organisms/musica-distorta-board'
import { TeamsBoard } from '@/components/organisms/teams-board'
import type { GameState } from '@/lib/battle-night/types'
import { DISTORTED_SONGS, GHIGLIOTTINA_SETS } from '@/lib/battle-night/types'

export function PhaseRenderer({ state }: { state: GameState }) {
  let content: React.ReactNode

  switch (state.currentPhase) {
    case 'INTRO':
      content = <IntroBoard introRevealStep={state.introRevealStep} />
      break
    case 'TEAMS':
      content = <TeamsBoard scores={state.scores} />
      break
    case 'MUSICA_DISTORTA':
      content = (
        <MusicaDistortaBoard
          timer={state.timer}
          timerRunning={state.timerRunning}
          song={DISTORTED_SONGS[state.musicaIndex]}
          songIndex={state.musicaIndex}
          totalSongs={DISTORTED_SONGS.length}
          revealed={state.musicaRevealed}
        />
      )
      break
    case 'INTESA_VINCENTE':
      content = (
        <IntesaVincenteBoard
          timer={state.timer}
          timerRunning={state.timerRunning}
          currentWord={state.intesaWords[state.intesaWordIndex] ?? ''}
          wordIndex={state.intesaWordIndex}
          totalWords={state.intesaWords.length}
        />
      )
      break
    case 'GHIGLIOTTINA':
      content = (
        <GhigliottinaBoard
          currentSet={GHIGLIOTTINA_SETS[state.ghigliottinaSetIndex]}
          setIndex={state.ghigliottinaSetIndex}
          totalSets={GHIGLIOTTINA_SETS.length}
        />
      )
      break
    case 'BRUCO':
      content = (
        <BrucoBoard
          timer={state.timer}
          timerRunning={state.timerRunning}
          finishOrder={state.brucoFinishOrder}
        />
      )
      break
    case 'INVERSIONE_LOGICA':
      content = (
        <InversioneLogicaGrid
          logicStep={state.logicStep}
          timer={state.timer}
          timerRunning={state.timerRunning}
        />
      )
      break
    default:
      content = <IntroBoard introRevealStep={state.introRevealStep} />
  }

  return <div className="flex h-full w-full items-center justify-center">{content}</div>
}
