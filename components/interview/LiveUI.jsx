"use client";

import React from "react";
import ResultPopup from "../ResultPopup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LiveUI({
  messages,
  videoRef,
  videoContainerRef,
  stopRecording,
  endInterview,
  showResult,
  averageScore,
  setShowResult,
  processing,
  setupPopup,
  title,
}) {

  const router = useRouter();

  const [showEndPopup, setShowEndPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showEndPopup && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      router.push("/login");
    }
  }, [showEndPopup, countdown, router]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900 p-8 flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          AI Live Interview
        </h1>

        <div className="text-sm text-gray-500">
          Stay focused on camera
        </div>
      </div>

      {/* MAIN INTERVIEW AREA */}
      <div className="flex flex-1 gap-10">

        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between w-1/2">

          {/* Interview Role */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold">
              Interview for this { title}
            </span>
          </div>

          {/* MESSAGE AREA */}
         <div className="flex flex-col space-y-4">

  {messages.slice(-2).map((m, i) => (
    <div
      key={i}
      className={`p-4 rounded-lg text-sm max-w-[90%] ${
        m.sender === "ai"
          ? "bg-blue-100 text-blue-900"
          : "bg-green-100 text-green-900 self-end"
      }`}
    >
      {m.sender === "ai" ? "🤖 " : "🧑 "} {m.text}
    </div>
  ))}

</div>

          {/* NOTE SECTION */}
          <div className="bg-blue-100 p-5 rounded-xl text-sm text-blue-900 mt-6">
            <b>⚠ Interview Rules</b>

            <p className="mt-2">
              If you switch tabs, minimize the browser, or press the End Interview
              button, the interview will automatically complete and may be marked
              as <b>cheated</b>.
            </p>

            <p className="mt-2">
              Please stay on this page until the interview finishes.
            </p>
          </div>

        </div>

        {/* RIGHT PANEL (CAMERA) */}
        <div
          ref={videoContainerRef}
          className="relative w-1/2 rounded-2xl overflow-hidden border-2 border-red-400 shadow-md bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover scale-x-[-1]"
          />

          <div className="absolute bottom-3 right-3 bg-white/80 px-3 py-1 rounded text-sm font-medium text-gray-900">
            You
          </div>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="flex justify-between items-center mt-6">

       <button
  onClick={() => {
    speechSynthesis.cancel();
    setShowEndPopup(true);
  }}
  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
>
  End Interview
</button>

        <button
          onClick={stopRecording}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition"
        >
          Submit Answer
        </button>

      </div>

      {/* RESULT POPUP */}
      {showResult && (
        <ResultPopup
          score={averageScore}
          onClose={() => setShowResult(false)}
        />
      )}

      {/* SETUP POPUP */}
      {setupPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Setting up your interview...
            </p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        </div>
      )}

      {/* PROCESSING POPUP */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Processing voice...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we analyze your answer
            </p>
          </div>
        </div>
      )}

      {/* END INTERVIEW POPUP */}
      {showEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-[350px]">

            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Interview Interrupted
            </h2>

            <p className="text-gray-600 mb-4">
              Pushing back to home page in
            </p>

            <div className="text-4xl font-bold text-blue-600">
              {countdown}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}