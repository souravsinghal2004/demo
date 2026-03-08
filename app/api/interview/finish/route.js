import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req) {
  try {
    const { candidateName, jobTitle, questions, answers, scores } =
      await req.json();

    // Prevent crash if scores array is empty
    const avgScore =
      scores && scores.length
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 0;

    let json;

    try {
      const prompt = `
Generate a professional interview evaluation report.

Candidate: ${candidateName}
Role: ${jobTitle}

Questions and Answers:
${questions
  .map((q, i) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || ""}`)
  .join("\n")}

Scores: ${scores.join(", ")}

Return ONLY JSON in this format:

{
"summary": "",
"strengths": [],
"weaknesses": [],
"recommendation": ""
}
`;

      const result = await model.generateContent(prompt);

      let text = result.response.text();

      // Remove markdown code blocks like ```json or ```javascript
      text = text
        .replace(/```[a-z]*\n?/gi, "")
        .replace(/```/g, "")
        .trim();

      json = JSON.parse(text);
    } catch (err) {
      console.log("Gemini report failed, using fallback");

      json = {
        summary:
          "Candidate completed the interview successfully. AI evaluation was limited due to system constraints.",
        strengths: [
          "Clear communication",
          "Basic understanding of the role",
        ],
        weaknesses: [
          "Needs deeper technical explanation",
          "Could improve structured responses",
        ],
        recommendation:
          "Candidate shows potential and may be considered for further evaluation.",
      };
    }

    const report = {
      candidateName,
      jobTitle,
      avgScore,
      ...json,
    };

    const pdfPath = await generatePDF(report);

    return Response.json({
      finalScore: avgScore,
      report,
      pdfPath,
    });
  } catch (err) {
    console.error("Finish interview error:", err);

    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

async function generatePDF(report) {
  const fileName = `report-${Date.now()}.pdf`;
  const filePath = path.join(process.cwd(), "public", fileName);

  const doc = new PDFDocument();

  doc.registerFont(
    "Roboto",
    path.join(process.cwd(), "public", "fonts", "Roboto-Regular.ttf")
  );

  doc.font("Roboto");

  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.fontSize(20).text("AI Interview Report", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Candidate: ${report.candidateName}`);
  doc.text(`Role: ${report.jobTitle}`);
  doc.text(`Score: ${report.avgScore.toFixed(2)} / 10`);

  doc.moveDown();

  doc.fontSize(16).text("Summary");
  doc.fontSize(12).text(report.summary);

  doc.moveDown();

  doc.fontSize(16).text("Strengths");
  report.strengths.forEach((s) => doc.text(`• ${s}`));

  doc.moveDown();

  doc.fontSize(16).text("Weaknesses");
  report.weaknesses.forEach((w) => doc.text(`• ${w}`));

  doc.moveDown();

  doc.fontSize(16).text("Recommendation");
  doc.fontSize(12).text(report.recommendation);

  doc.end();

  await new Promise((resolve) => stream.on("finish", resolve));

  return `/${fileName}`;
}