import axios from "axios";

 /* export async function evaluateAnswer(question, answer) {
  const prompt = `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Score the answer from 1 to 10 and respond ONLY in this format:
Score: <number>
`;

  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const text = res.data.candidates[0].content.parts[0].text;

  const scoreMatch = text.match(/\d+/);
  const score = scoreMatch ? parseInt(scoreMatch[0]) : 5;

  return { score };
} */


  export async function evaluateAnswer(question, answer) {
  console.log("🧪 Gemini Mock Mode Enabled");
  
  // simulate API delay (optional but realistic)
  await new Promise((res) => setTimeout(res, 800));

  return {
    score: 6,
  };
}
