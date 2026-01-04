"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
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
          Recruiter Panel
        </h2>

        <nav className="space-y-4 text-gray-700">
          <button className="block w-full text-left hover:text-blue-600">
            📄 My Job Listings
          </button>
          <button className="block w-full text-left hover:text-blue-600">
            🎤 Interviews
          </button>
          <button className="block w-full text-left hover:text-blue-600">
            📊 Candidate Insights
          </button>
          <button className="block w-full text-left hover:text-blue-600">
            📈 Interview Analytics
          </button>
          <button className="block w-full text-left hover:text-blue-600">
            ⚙️ Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user.firstName}
        </h1>

        <p className="text-gray-600 mb-8">
          Manage job postings, review candidates, and conduct AI-assisted
          interviews — final hiring decisions remain yours.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Jobs */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">📄 Job Listings</h3>
            <p className="text-gray-600 text-sm mb-4">
              View and manage jobs you have posted.
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              View Jobs →
            </button>
          </div>

          {/* Interviews */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">🎤 Interviews</h3>
            <p className="text-gray-600 text-sm mb-4">
              Schedule and review AI-assisted interviews.
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              Manage Interviews →
            </button>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">⚙️ Settings</h3>
            <p className="text-gray-600 text-sm mb-4">
              Update your profile and recruitment preferences.
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              Edit Settings →
            </button>
          </div>

          {/* Extra Feature 1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">📊 Candidate Insights</h3>
            <p className="text-gray-600 text-sm mb-4">
              AI-generated scores, skill match, and shortlisting recommendations.
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              View Insights →
            </button>
          </div>

          {/* Extra Feature 2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">📈 Interview Analytics</h3>
            <p className="text-gray-600 text-sm mb-4">
              Analyze interview completion rates and candidate performance trends.
            </p>
            <button className="text-blue-600 text-sm hover:underline">
              View Analytics →
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
