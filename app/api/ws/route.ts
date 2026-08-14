import { startWsServer } from '@/lib/battle-night/ws-server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    startWsServer()
    return NextResponse.json({ status: 'started' })
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }
}
