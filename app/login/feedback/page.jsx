"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FeedbackPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h2 className="text-xl font-bold text-blue-600 mb-8">
          Candidate Panel
        </h2>

        <nav className="space-y-4 text-gray-700">
          <button onClick={() => router.push("/login")} className="block w-full text-left hover:text-blue-600">
            💼 Available Jobs
          </button>
          
          <button onClick={() => router.push("/login/results")} className="block w-full text-left hover:text-blue-600">
            📊 Interview Results
          </button>
          <button className="block w-full text-left font-semibold text-blue-600">
            🧠 Skill Feedback
          </button>
          <button onClick={() => router.push("/login/profile")} className="block w-full text-left hover:text-blue-600">
            📄 Profile & Resume
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Skill Feedback
        </h1>

        <p className="text-gray-600 mb-8">
          AI-generated feedback based on your interview responses to help you
          improve future performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Strengths */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-green-600">
              ✅ Strengths
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Strong understanding of core concepts</li>
              <li>Clear communication skills</li>
              <li>Good problem-solving approach</li>
            </ul>
          </div>

          {/* Improvements */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-yellow-600">
              ⚠️ Areas for Improvement
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Optimize time complexity explanations</li>
              <li>Provide more real-world examples</li>
              <li>Improve confidence in system design answers</li>
            </ul>
          </div>

        </div>

        {/* Ethics Note */}
        <p className="text-sm text-gray-500 mt-8">
          * Feedback is generated using AI to support candidate improvement.
          Final hiring decisions are made by recruiters.
        </p>
      </main>
    </div>
  );
}
