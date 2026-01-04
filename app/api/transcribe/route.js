import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("🟢 Transcribe API hit");

    const audioBuffer = await req.arrayBuffer();
    console.log("🟢 Audio size:", audioBuffer.byteLength);

    const uploadRes = await fetch("https://api.assemblyai.com/v2/upload", {
      method: "POST",
      headers: {
        authorization: process.env.ASSEMBLYAI_API_KEY,
        "content-type": "application/octet-stream",
      },
      body: audioBuffer,
    });

    const uploadData = await uploadRes.json();
    console.log("🟢 Upload response:", uploadData);

    const transcriptRes = await fetch(
      "https://api.assemblyai.com/v2/transcript",
      {
        method: "POST",
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          audio_url: uploadData.upload_url,
        }),
      }
    );

    const transcriptData = await transcriptRes.json();
    console.log("🟢 Transcript job:", transcriptData);

    while (true) {
      const pollRes = await fetch(
        `https://api.assemblyai.com/v2/transcript/${transcriptData.id}`,
        {
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
          },
        }
      );

      const pollData = await pollRes.json();
      console.log("🟡 Poll status:", pollData.status);

      if (pollData.status === "completed") {
        return NextResponse.json({ text: pollData.text });
      }

      if (pollData.status === "error") {
        throw new Error(pollData.error);
      }

      await new Promise(r => setTimeout(r, 2000));
    }
  } catch (err) {
    console.error("🔴 Transcription failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
