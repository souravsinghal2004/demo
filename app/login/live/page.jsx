"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LiveInterviewPage() {
  const router = useRouter();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const initializedRef = useRef(false);

  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(0);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    initMedia();
    addAI("Please introduce yourself.");
    speakAI("Please introduce yourself.");

    return cleanup;
  }, []);

  async function initMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });

    streamRef.current = stream;
    videoRef.current.srcObject = stream;

    startRecording();
  }

  /* ---------------- SPEECH ---------------- */

  function speakAI(text) {
    const u = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();

    const maleVoice =
      voices.find(v =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("google"))
      ) || voices.find(v => v.lang.startsWith("en"));

    if (maleVoice) u.voice = maleVoice;

    u.rate = 1;
    u.pitch = 0.9;
    u.volume = 1;

    speechSynthesis.speak(u);
  }

  const addAI = text =>
    setMessages(m => [...m, { sender: "ai", text }]);

  const addUser = text =>
    setMessages(m => [...m, { sender: "user", text }]);

  /* ---------------- RECORDING ---------------- */

  function startRecording() {
    audioChunksRef.current = [];

    const recorder = new MediaRecorder(streamRef.current);
    recorderRef.current = recorder;

    recorder.onstart = () => {
      setRecording(true);
      console.log("🎙️ Recording started");
    };

    recorder.ondataavailable = e => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      setRecording(false);
      console.log("🛑 Recording stopped");

      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      if (audioBlob.size < 2000) {
        startRecording();
        return;
      }

      // Popup + timer
      setShowPopup(true);
      setTimer(0);
      timerRef.current = setInterval(
        () => setTimer(t => +(t + 0.1).toFixed(1)),
        100
      );

      const text = await sendToAPI(audioBlob);

      clearInterval(timerRef.current);
      setShowPopup(false);

      if (text) addUser(text);

      startRecording();
    };

    recorder.start();
  }

  function stopRecording() {
    if (recorderRef.current?.state !== "inactive") {
      recorderRef.current.stop();
    }
  }

  /* ---------------- API ---------------- */

  async function sendToAPI(blob) {
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: blob,
      });

      const data = await res.json();
      return data.text || "";
    } catch (err) {
      console.error("❌ Transcription failed:", err);
      return "";
    }
  }

  /* ---------------- END INTERVIEW ---------------- */

  function endInterview() {
    if (recorderRef.current?.state !== "inactive") {
      recorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    router.push("/");
  }

  /* ---------------- CLEANUP ---------------- */

  function cleanup() {
    clearInterval(timerRef.current);
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="h-screen bg-black text-white p-6 flex flex-col">
      <h1 className="text-xl mb-4">Live Interview</h1>

      <div className="grid md:grid-cols-3 gap-6 flex-1">
        {/* AI BOX */}
        <div className="border rounded-xl p-4 flex flex-col items-center justify-center">
          <img
            src="/ai-avatar.png"
            alt="AI"
            className="w-40 h-40 object-contain mb-4"
          />
          <p className="text-lg font-semibold">AI Interviewer</p>
        </div>

        {/* VIDEO */}
        <div className="border rounded-xl p-2">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full rounded object-cover scale-x-[-1]"
          />
        </div>

        {/* CHAT */}
        <div className="border rounded-xl p-4 flex flex-col">
          <h3 className="mb-2">Interview Chat</h3>
          <div className="flex-1 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.sender === "ai" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-[75%] ${
                    m.sender === "ai"
                      ? "bg-gray-800"
                      : "bg-blue-600"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={endInterview}
          className="px-6 py-2 rounded-md bg-red-600"
        >
          End Interview
        </button>

        <button
          onClick={stopRecording}
          className={`px-6 py-2 rounded-md ${
            recording ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          Submit Audio
        </button>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 px-6 py-4 rounded-xl text-center">
            <p className="text-lg font-semibold">Processing…</p>
            <p className="mt-2 text-sm text-gray-300">{timer}s</p>
          </div>
        </div>
      )}
    </div>
  );
}
