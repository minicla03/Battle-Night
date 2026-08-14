/**
 * WebSocket relay server (Node.js / server-side only).
 *
 * - Runs on a dedicated port (default 3001) so it works independently
 *   of the Next.js HTTP server — no upgrade-intercept tricks needed.
 * - Keeps the last known state in memory so new clients receive it
 *   immediately upon connection.
 * - All connected clients receive every state update (broadcast).
 * - Uses a global variable so Next.js hot-reload in dev mode doesn't
 *   spawn multiple servers.
 */

import { WebSocketServer, WebSocket } from 'ws'

export const WS_PORT = parseInt(process.env.WS_PORT ?? '3001', 10)

// ── Singleton guard ──────────────────────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var __battleNightWss: WebSocketServer | undefined
  // eslint-disable-next-line no-var
  var __battleNightLastState: string | undefined
}

export function startWsServer() {
  if (global.__battleNightWss) {
    console.log(`[BN-WS] Server already running on port ${WS_PORT}`)
    return
  }

  const wss = new WebSocketServer({ port: WS_PORT })
  global.__battleNightWss = wss

  wss.on('listening', () => {
    console.log(`[BN-WS] WebSocket relay server listening on port ${WS_PORT}`)
  })

  wss.on('connection', (ws: WebSocket) => {
    console.log(`[BN-WS] Client connected (total: ${wss.clients.size})`)

    // Send the current state to the new client immediately
    if (global.__battleNightLastState) {
      ws.send(global.__battleNightLastState)
    }

    ws.on('message', (data: Buffer) => {
      const raw = data.toString()
      global.__battleNightLastState = raw

      // Broadcast to every OTHER connected client
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(raw)
        }
      })
    })

    ws.on('close', () => {
      console.log(`[BN-WS] Client disconnected (total: ${wss.clients.size})`)
    })

    ws.on('error', (err) => {
      console.error('[BN-WS] Client error:', err.message)
    })
  })

  wss.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `[BN-WS] Port ${WS_PORT} already in use. Another instance may be running.`,
      )
    } else {
      console.error('[BN-WS] Server error:', err)
    }
  })
}
