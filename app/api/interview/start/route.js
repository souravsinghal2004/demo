// app/api/interview/start/route.js
import { connectDB } from "@/app/lib/mongo";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  try {
    const { job, candidateName, candidateRole } = await req.json();

    if (!candidateName || !job) {
      return new Response(
        JSON.stringify({ error: "Missing candidateName or job" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();

    // Generate greeting
    const greetResult = await model.generateContent(
      `You are a polite AI interviewer. Greet the candidate named ${candidateName} for the role ${candidateRole || "the applied role"}.`
    );
    const greeting = (await greetResult.response).text();

    // Generate first question
    const q1Result = await model.generateContent(
      `Candidate ${candidateName} applied for ${candidateRole || "this role"} (${job}). Generate the first interview question relevant to their role. Return only the question text.`
    );
    const firstQuestion = (await q1Result.response).text();

    return new Response(
      JSON.stringify({ greeting, questions: [firstQuestion] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Interview start error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}