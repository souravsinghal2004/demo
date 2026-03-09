import { nvidia, MODEL } from "@/app/lib/nvidia";

export async function POST(req) {
  try {
    const { userMessage, candidateName, jobTitle, systemPrompt } = await req.json();

    // Initialize messages with systemPrompt
    const messages = [
      {
        role: "system",
        content: systemPrompt || `You are a professional technical interviewer for ${jobTitle}`,
      },
    ];

    // First call → inject candidate context
    if (candidateName && jobTitle) {
      messages.push({
        role: "user",
        content: `Candidate Name: ${candidateName}. Role applied: ${jobTitle}. Start the interview.`,
      });
    }

    // Add user answer if present
    if (userMessage) {
      messages.push({
        role: "user",
        content: userMessage,
      });
    }

    const completion = await nvidia.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiReply = completion.choices[0].message.content;

    return Response.json({ message: aiReply });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "AI failed" }, { status: 500 });
  }
}