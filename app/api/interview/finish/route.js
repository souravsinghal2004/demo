import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const scores = body?.scores || [];

    if (!Array.isArray(scores) || scores.length === 0) {
      return NextResponse.json({ finalScore: 0 });
    }

    const avg =
      scores.reduce((a, b) => a + b, 0) / scores.length;

    return NextResponse.json({ finalScore: avg });
  } catch (err) {
    console.error("Finish API error:", err);
    return NextResponse.json({ finalScore: 0 });
  }
}
