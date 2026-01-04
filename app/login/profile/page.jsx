"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
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
          
          <button onClick={() => router.push("/login/results")} className="block w-full text-left hover:text-blue-600">
            📊 Interview Results
          </button>
          <button onClick={() => router.push("/login/feedback")} className="block w-full text-left hover:text-blue-600">
            🧠 Skill Feedback
          </button>
          <button className="block w-full text-left font-semibold text-blue-600">
            📄 Profile & Resume
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Profile & Resume
        </h1>

        {/* Profile Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{user.fullName}</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Resume</h2>

          <p className="text-gray-600 text-sm mb-4">
            Upload or update your resume to improve AI-based job matching.
          </p>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            Upload Resume
          </button>
        </div>
      </main>
    </div>
  );
}
