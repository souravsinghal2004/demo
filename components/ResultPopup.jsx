"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ResultPopup({ score, onClose }) {
  const router = useRouter();

  const handleClose = () => {
    onClose?.();
    router.push("/login");
  };

  const displayScore = typeof score === "number" ? score.toFixed(1) : "--";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Interview Complete!</h2>
        <p className="mb-4">Your average score: {displayScore} / 10</p>
        <button
          onClick={handleClose}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}