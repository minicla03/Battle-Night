'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createInitialState,
  DISTORTED_SONGS,
  GHIGLIOTTINA_SETS,
  INITIAL_PRIZE_POOL,
  INTESA_WORD_POOL,
  LOGIC_TOTAL_STEPS,
  PHASES,
  TEAMS,
  shuffleArray,
  STORAGE_KEY,
  type GameState,
  type Phase,
  type Team,
} from './types'

const CHANNEL_NAME = 'battle-night:sync'

function readState(): GameState {
  if (typeof window === 'undefined') return createInitialState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createInitialState()
    const parsed = JSON.parse(raw) as Partial<GameState>
    // Merge with defaults so missing keys never break the UI.
    return { ...createInitialState(), ...parsed, scores: { ...createInitialState().scores, ...parsed.scores } }
  } catch {
    return createInitialState()
  }
}

function writeState(state: GameState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

/**
 * Read-only subscriber. Used by the DisplayPage.
 * Listens for state changes via:
 *   1. BroadcastChannel — instant same-browser cross-tab updates.
 *   2. window `storage` event — cross-tab fallback (fires in OTHER tabs).
 *   3. Polling every 1 s — universal fallback (e.g. different windows, edge cases).
 */
export function useGameStateReader(): { state: GameState; hydrated: boolean } {
  const [state, setState] = useState<GameState>(() => ({
    ...createInitialState(),
    intesaWords: INTESA_WORD_POOL, // deterministic for SSR
  }))
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(readState())
    setHydrated(true)

    // 1. BroadcastChannel — instant updates within the same browser
    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel(CHANNEL_NAME)
      channel.onmessage = (e: MessageEvent<GameState>) => {
        setState(e.data)
        writeState(e.data)
      }
    } catch {
      // BroadcastChannel not supported (very old browsers)
    }

    // 2. storage event — fires in OTHER tabs when localStorage changes
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setState(readState())
      }
    }

    // 3. Same-tab custom event (dispatched by useGameController)
    const onLocal = () => setState(readState())

    // 4. Polling fallback — 1 s interval
    const pollInterval = setInterval(() => {
      setState(readState())
    }, 1000)

    window.addEventListener('storage', onStorage)
    window.addEventListener('battle-night:update', onLocal as EventListener)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('battle-night:update', onLocal as EventListener)
      clearInterval(pollInterval)
      channel?.close()
    }
  }, [])

  return { state, hydrated }
}

/**
 * Read/write controller. Used by the AdminPage.
 * Every mutation persists to localStorage, broadcasts via BroadcastChannel,
 * and dispatches a same-tab event so in-tab previews update instantly.
 */
export function useGameController() {
  const [state, setState] = useState<GameState>(() => ({
    ...createInitialState(),
    intesaWords: INTESA_WORD_POOL, // deterministic for SSR
  }))
  const [hydrated, setHydrated] = useState(false)
  const stateRef = useRef(state)
  stateRef.current = state
  const channelRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    console.log('[BN] useGameController hydrating...')
    setState(readState())
    setHydrated(true)
    console.log('[BN] useGameController hydrated, state:', readState())

    // Open BroadcastChannel for instant cross-tab sync
    try {
      channelRef.current = new BroadcastChannel(CHANNEL_NAME)
    } catch {
      // BroadcastChannel not supported
    }

    // Keep in sync if another admin tab makes changes.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readState())
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('storage', onStorage)
      channelRef.current?.close()
      channelRef.current = null
    }
  }, [])

  const commit = useCallback((next: GameState) => {
    console.log('[BN] commit called, next state:', next)
    setState(next)
    writeState(next)
    // Broadcast to other tabs/windows in the same browser
    channelRef.current?.postMessage(next)
    // Same-tab custom event so in-tab preview updates
    window.dispatchEvent(new Event('battle-night:update'))
    console.log('[BN] commit done, localStorage:', window.localStorage.getItem(STORAGE_KEY))
  }, [])

  const update = useCallback(
    (partial: Partial<GameState>) => {
      commit({ ...stateRef.current, ...partial })
    },
    [commit],
  )

  // --- Phase controls ---
  const setPhase = useCallback((phase: Phase) => update({ currentPhase: phase }), [update])

  const nextPhase = useCallback(() => {
    const i = PHASES.indexOf(stateRef.current.currentPhase)
    update({ currentPhase: PHASES[Math.min(i + 1, PHASES.length - 1)] })
  }, [update])

  const prevPhase = useCallback(() => {
    const i = PHASES.indexOf(stateRef.current.currentPhase)
    update({ currentPhase: PHASES[Math.max(i - 1, 0)] })
  }, [update])

  // --- Score controls ---
  const changeScore = useCallback(
    (team: Team, delta: number) => {
      const scores = { ...stateRef.current.scores }
      scores[team] = Math.max(0, scores[team] + delta)
      update({ scores })
    },
    [update],
  )

  // --- Timer controls ---
  const startTimer = useCallback(() => update({ timerRunning: true }), [update])
  const pauseTimer = useCallback(() => update({ timerRunning: false }), [update])
  const resetTimer = useCallback(
    (seconds = 60) => update({ timer: seconds, timerRunning: false }),
    [update],
  )
  const tick = useCallback(() => {
    const cur = stateRef.current
    if (!cur.timerRunning) return
    const nextT = Math.max(0, cur.timer - 1)
    update({ timer: nextT, timerRunning: nextT > 0 })
  }, [update])

  // --- Prize controls ---
  const halvePrize = useCallback(
    () => update({ prizePool: Math.round(stateRef.current.prizePool / 2) }),
    [update],
  )
  const resetPrize = useCallback(() => update({ prizePool: INITIAL_PRIZE_POOL }), [update])

  // --- Logic step controls ---
  const incrementLogic = useCallback(
    () =>
      update({
        logicStep: Math.min(LOGIC_TOTAL_STEPS, stateRef.current.logicStep + 1),
      }),
    [update],
  )
  const decrementLogic = useCallback(
    () => update({ logicStep: Math.max(0, stateRef.current.logicStep - 1) }),
    [update],
  )
  const errorReset = useCallback(() => update({ logicStep: 0 }), [update])

  // --- Intesa Vincente word controls ---
  const nextIntesaWord = useCallback(() => {
    const cur = stateRef.current
    const next = cur.intesaWordIndex + 1
    if (next >= cur.intesaWords.length) {
      // All words used: reshuffle and restart
      update({ intesaWords: shuffleArray(INTESA_WORD_POOL), intesaWordIndex: 0 })
    } else {
      update({ intesaWordIndex: next })
    }
  }, [update])

  const reshuffleIntesaWords = useCallback(
    () => update({ intesaWords: shuffleArray(INTESA_WORD_POOL), intesaWordIndex: 0 }),
    [update],
  )

  // --- Ghigliottina set controls ---
  const nextGhigliottinaSet = useCallback(() => {
    const next = (stateRef.current.ghigliottinaSetIndex + 1) % GHIGLIOTTINA_SETS.length
    update({ ghigliottinaSetIndex: next })
  }, [update])

  const prevGhigliottinaSet = useCallback(() => {
    const prev = (stateRef.current.ghigliottinaSetIndex - 1 + GHIGLIOTTINA_SETS.length) % GHIGLIOTTINA_SETS.length
    update({ ghigliottinaSetIndex: prev })
  }, [update])

  // --- Bruco race controls ---
  const setBrucoFinish = useCallback(
    (team: Team) => {
      const cur = stateRef.current.brucoFinishOrder
      // Ignore if already finished
      if (cur.includes(team)) return
      update({ brucoFinishOrder: [...cur, team] })
    },
    [update],
  )
  const undoBrucoFinish = useCallback(() => {
    const cur = stateRef.current.brucoFinishOrder
    if (cur.length === 0) return
    update({ brucoFinishOrder: cur.slice(0, -1) })
  }, [update])
  const resetBruco = useCallback(() => update({ brucoFinishOrder: [] }), [update])

  // --- Musica Distorta controls ---
  const nextMusica = useCallback(() => {
    const next = (stateRef.current.musicaIndex + 1) % DISTORTED_SONGS.length
    update({ musicaIndex: next, musicaRevealed: false, musicaPlaying: false })
  }, [update])
  const prevMusica = useCallback(() => {
    const prev = (stateRef.current.musicaIndex - 1 + DISTORTED_SONGS.length) % DISTORTED_SONGS.length
    update({ musicaIndex: prev, musicaRevealed: false, musicaPlaying: false })
  }, [update])
  const revealMusica = useCallback(() => update({ musicaRevealed: true }), [update])
  const hideMusica = useCallback(() => update({ musicaRevealed: false }), [update])
  const playMusica = useCallback(() => update({ musicaPlaying: true }), [update])
  const pauseMusica = useCallback(() => update({ musicaPlaying: false }), [update])
  const setMusicaVolume = useCallback((v: number) => update({ musicaVolume: v }), [update])

  const resetGame = useCallback(() => commit(createInitialState()), [commit])

  // --- Intro reveal controls ---
  const revealNextIntroTeam = useCallback(() => {
    const next = Math.min(TEAMS.length, stateRef.current.introRevealStep + 1)
    update({ introRevealStep: next })
  }, [update])

  const resetIntroReveal = useCallback(
    () => update({ introRevealStep: 0 }),
    [update],
  )

  return {
    state,
    hydrated,
    setPhase,
    nextPhase,
    prevPhase,
    changeScore,
    startTimer,
    pauseTimer,
    resetTimer,
    tick,
    halvePrize,
    resetPrize,
    incrementLogic,
    decrementLogic,
    errorReset,
    nextIntesaWord,
    reshuffleIntesaWords,
    setBrucoFinish,
    undoBrucoFinish,
    resetBruco,
    nextGhigliottinaSet,
    prevGhigliottinaSet,
    nextMusica,
    prevMusica,
    revealMusica,
    hideMusica,
    playMusica,
    pauseMusica,
    setMusicaVolume,
    resetGame,
    revealNextIntroTeam,
    resetIntroReveal,
  }
}
