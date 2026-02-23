import { evaluateAnswer } from "@/app/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { question, answer } = await req.json();

  const score = await evaluateAnswer(question, answer);

  return NextResponse.json({ score });
}
