import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest, params) {
    console.log(arguments)
    NextResponse.json({ word: 'world' })
}