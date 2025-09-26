import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'

export async function GET() {
  try {
    await dbConnect()
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 })
  }
}
