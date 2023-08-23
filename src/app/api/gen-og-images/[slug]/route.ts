import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    return NextResponse.json({ word: params.slug })
}