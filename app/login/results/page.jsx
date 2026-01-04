"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InterviewResultsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
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
         
          <button className="block w-full text-left font-semibold text-blue-600">
            📊 Interview Results
          </button>
          <button onClick={() => router.push("/login/feedback")} className="block w-full text-left hover:text-blue-600">
            🧠 Skill Feedback
          </button>
          <button onClick={() => router.push("/login/profile")} className="block w-full text-left hover:text-blue-600">
            📄 Profile & Resume
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Interview Results
        </h1>

        <p className="text-gray-600 mb-8">
          View AI-generated scores and recruiter shortlisting status for your
          previous interviews.
        </p>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Job Role</th>
                <th className="p-4">Interview Date</th>
                <th className="p-4">AI Score</th>
                <th className="p-4">Status</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4">Frontend Developer</td>
                <td className="p-4">12 Sep 2025</td>
                <td className="p-4 font-semibold">82%</td>
                <td className="p-4 text-green-600 font-medium">
                  Shortlisted
                </td>
                <td className="p-4">
                  <button className="text-blue-600 text-sm hover:underline">
                    View Feedback
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Backend Developer</td>
                <td className="p-4">08 Sep 2025</td>
                <td className="p-4 font-semibold">65%</td>
                <td className="p-4 text-yellow-600 font-medium">
                  Under Review
                </td>
                <td className="p-4">
                  <button className="text-blue-600 text-sm hover:underline">
                    View Feedback
                  </button>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Full Stack Developer</td>
                <td className="p-4">01 Sep 2025</td>
                <td className="p-4 font-semibold">48%</td>
                <td className="p-4 text-red-600 font-medium">
                  Not Shortlisted
                </td>
                <td className="p-4">
                  <button className="text-blue-600 text-sm hover:underline">
                    View Feedback
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500 mt-6">
          * AI scores assist in early-stage evaluation. Final decisions are made
          by recruiters.
        </p>
      </main>
    </div>
  );
}
