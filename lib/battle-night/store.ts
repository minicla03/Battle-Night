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
  shuffleArray,
  STORAGE_KEY,
  type GameState,
  type Phase,
  type Team,
} from './types'

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
 * Reacts to the window `storage` event, which fires in OTHER tabs/windows
 * when the AdminPage mutates localStorage — the exact cross-view sync we want.
 * Also listens for a same-tab custom event so previews inside one tab stay live.
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

    // Ensure WebSocket server is started
    fetch('/api/ws').catch(console.error)

    let ws: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout

    function connect() {
      ws = new WebSocket(`ws://${window.location.hostname}:3001`)
      
      ws.onopen = () => {
        console.log('[BN] Display WS connected')
      }
      
      ws.onmessage = (event) => {
        try {
          const nextState = JSON.parse(event.data) as GameState
          setState(nextState)
          writeState(nextState) // Keep local storage in sync
        } catch (e) {
          console.error('[BN] WS parse error:', e)
        }
      }

      ws.onclose = () => {
        console.log('[BN] Display WS closed, reconnecting in 2s...')
        reconnectTimeout = setTimeout(connect, 2000)
      }
      
      ws.onerror = (err) => {
        console.error('[BN] Display WS error:', err)
        ws?.close()
      }
    }
    
    connect()

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setState(readState())
      }
    }
    const onLocal = () => setState(readState())

    window.addEventListener('storage', onStorage)
    window.addEventListener('battle-night:update', onLocal as EventListener)
    
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('battle-night:update', onLocal as EventListener)
      clearTimeout(reconnectTimeout)
      if (ws) {
        ws.onclose = null
        ws.close()
      }
    }
  }, [])

  return { state, hydrated }
}

/**
 * Read/write controller. Used by the AdminPage.
 * Every mutation persists to localStorage and dispatches a same-tab event
 * so an in-tab preview updates, while cross-tab sync flows via `storage`.
 */
export function useGameController() {
  const [state, setState] = useState<GameState>(() => ({
    ...createInitialState(),
    intesaWords: INTESA_WORD_POOL, // deterministic for SSR
  }))
  const [hydrated, setHydrated] = useState(false)
  const stateRef = useRef(state)
  stateRef.current = state
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    console.log('[BN] useGameController hydrating...')
    setState(readState())
    setHydrated(true)
    console.log('[BN] useGameController hydrated, state:', readState())

    // Ensure WebSocket server is started
    fetch('/api/ws').catch(console.error)

    let reconnectTimeout: NodeJS.Timeout

    function connect() {
      const ws = new WebSocket(`ws://${window.location.hostname}:3001`)
      
      ws.onopen = () => {
        console.log('[BN] Admin WS connected')
        wsRef.current = ws
        // Invia lo stato attuale al server appena connesso, così il server
        // ha l'ultimo stato da mandare ai Display che si connettono dopo
        ws.send(JSON.stringify(readState()))
      }
      
      ws.onmessage = (event) => {
        try {
          const nextState = JSON.parse(event.data) as GameState
          setState(nextState)
          writeState(nextState)
        } catch (e) {
          console.error('[BN] WS parse error:', e)
        }
      }

      ws.onclose = () => {
        console.log('[BN] Admin WS closed, reconnecting in 2s...')
        wsRef.current = null
        reconnectTimeout = setTimeout(connect, 2000)
      }
      
      ws.onerror = (err) => {
        console.error('[BN] Admin WS error:', err)
        ws.close()
      }
    }

    connect()

    // Keep in sync if another admin tab makes changes.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readState())
    }
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
      clearTimeout(reconnectTimeout)
      if (wsRef.current) {
        wsRef.current.onclose = null
        wsRef.current.close()
      }
    }
  }, [])

  const commit = useCallback((next: GameState) => {
    console.log('[BN] commit called, next state:', next)
    setState(next)
    writeState(next)
    window.dispatchEvent(new Event('battle-night:update'))
    
    // Invia il nuovo stato tramite WebSocket
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(next))
    }
    
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
    update({ musicaIndex: next, musicaRevealed: false })
  }, [update])
  const prevMusica = useCallback(() => {
    const prev = (stateRef.current.musicaIndex - 1 + DISTORTED_SONGS.length) % DISTORTED_SONGS.length
    update({ musicaIndex: prev, musicaRevealed: false })
  }, [update])
  const revealMusica = useCallback(() => update({ musicaRevealed: true }), [update])
  const hideMusica = useCallback(() => update({ musicaRevealed: false }), [update])

  const resetGame = useCallback(() => commit(createInitialState()), [commit])

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
    resetGame,
  }
}
