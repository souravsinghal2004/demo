"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InterviewInstructionsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow-sm">

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Interview Instructions
        </h1>

        <p className="text-gray-600 mb-6">
          Please read the instructions carefully before starting the
          AI-assisted interview.
        </p>

        <ul className="space-y-4 text-gray-700 text-sm">
          <li>✅ Ensure a stable internet connection.</li>
    

          <li>✅ Answer all questions honestly and clearly.</li>
          <li>✅ You may be asked technical, logical, or role-specific questions.</li>
          <li>✅ Your responses will be evaluated by AI for early-stage assessment.</li>
          <li>✅ Final hiring decisions are made by human recruiters.</li>
          <li>⚠️ Do not refresh or close the tab during the interview.</li>
        </ul>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            ← Go Back
          </button>

          <button
            onClick={() => router.push("/login/permissions")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Start Interview
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          * This interview is AI-assisted and intended for preliminary candidate
          evaluation only.
        </p>
      </div>
    </div>
  );
}
