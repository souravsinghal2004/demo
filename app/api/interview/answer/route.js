import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function POST(req) {
  try {
    const { question, answer, context, history } = await req.json();

    const prompt = `
You are a professional technical interviewer.

Job Context:
${context}

Previous Interview Conversation:
${history || "No previous answers yet."}

Current Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON in this format:

{
"score": number,
"feedback": "short feedback about the answer",
"nextQuestion": "next interview question relevant to the role"
}

IMPORTANT:
- Do NOT include markdown
- Do NOT include \`\`\`
- Return ONLY JSON
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    // Clean response if model accidentally adds markdown
    const clean = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      console.log("AI returned invalid JSON:", clean);

      parsed = {
        score: 5,
        feedback: "AI response parsing failed. Default evaluation applied.",
        nextQuestion: "Can you explain another concept related to this role?",
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI evaluation failed" },
      { status: 500 }
    );
  }
}