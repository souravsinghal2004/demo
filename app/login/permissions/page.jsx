"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function InterviewPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const videoRef = useRef(null);
  const audioBoxRef = useRef(null);
  const streamRef = useRef(null);

  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState("");

  // Auth check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  // Enable camera & mic
  useEffect(() => {
    async function enableMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        detectAudio(stream);
        setMediaAllowed(true);
      } catch (err) {
        setError("Camera and microphone access is required to continue.");
      }
    }

    enableMedia();

    return () => stopMedia(); // cleanup on unmount
  }, []);

  // Audio detection logic
  function detectAudio(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 512;
    microphone.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function checkVolume() {
      analyser.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      setIsSpeaking(volume > 10); // threshold
      requestAnimationFrame(checkVolume);
    }

    checkVolume();
  }

  // Stop camera & mic
  function stopMedia() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  // Go back handler
  function handleGoBack() {
    stopMedia();
    router.back();
  }

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full p-8 rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Interview Setup
        </h1>

        <p className="text-gray-600 mb-6">
          Please enable your camera and microphone before starting the interview.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Camera Preview */}
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">🎥 Camera Preview</p>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-64 bg-black rounded-md object-cover"
              style={{ transform: "scaleX(-1)" }} // FIX MIRROR
            />
          </div>

          {/* Microphone Test */}
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">🎤 Microphone Test</p>
            <div
              ref={audioBoxRef}
              className={`h-64 rounded-md flex items-center justify-center text-gray-600 border-2 transition-all ${
                isSpeaking
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              {isSpeaking ? "Audio Detected ✔" : "Speak to test microphone"}
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-4">{error}</p>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handleGoBack}
            className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            ← Go Back
          </button>

          <button
  disabled={!mediaAllowed}
  onClick={() => router.push("/login/live")}
  className={`px-6 py-2 rounded-md text-white ${
    mediaAllowed
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-gray-400 cursor-not-allowed"
  }`}
>
  Proceed to Interview
</button>

        </div>

        <p className="text-xs text-gray-500 mt-6">
          * Audio & video are used only during the interview session.
        </p>
      </div>
    </div>
  );
}
