import axios from "axios";

export const speechToText = async (audioUrl) => {
  const res = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    { audio_url: audioUrl },
    {
      headers: {
        authorization: process.env.ASSEMBLY_API_KEY,
      },
    }
  );

  return res.data.text;
};
