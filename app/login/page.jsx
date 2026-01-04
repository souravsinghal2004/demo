"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function UserDashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  /* 🔥 CAMERA + MIC FORCE OFF (DO NOT REMOVE) */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(() => {
        // No active media — safe to ignore
      });
  }, []);

  /* AUTH GUARD */
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
  <div className="min-h-screen bg-gray-50">
  {/* Header */}
  <Header />

  <div className="flex">
    {/* Sidebar */}
    <aside className="w-64 bg-white border-r px-6 py-8">
      <h2 className="text-xl font-bold text-blue-600 mb-8">Candidate Panel</h2>

      <nav className="space-y-4 text-gray-700">
        <button
          onClick={() => router.push("/login")}
          className="block w-full text-left font-semibold text-blue-600"
        >
          💼 Available Jobs
        </button>

        <button
          onClick={() => router.push("/login/results")}
          className="block w-full text-left hover:text-blue-600"
        >
          📊 Interview Results
        </button>

        <button
          onClick={() => router.push("/login/feedback")}
          className="block w-full text-left hover:text-blue-600"
        >
          🧠 Skill Feedback
        </button>

        <button
          onClick={() => router.push("/login/profile")}
          className="block w-full text-left hover:text-blue-600"
        >
          📄 Profile & Resume
        </button>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome, {user?.firstName || "Candidate"}
      </h1>

      <p className="text-gray-600 mb-8">
        Browse available jobs and apply for AI-assisted interviews.
      </p>

      {/* Available Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-1">Frontend Developer</h3>
          <p className="text-sm text-gray-600 mb-3">React · Next.js · Tailwind</p>
          <Link
            href="/login/instructions"
            className="text-blue-600 text-sm hover:underline"
          >
            Give Interview →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-1">Backend Developer</h3>
          <p className="text-sm text-gray-600 mb-3">Node.js · Prisma · SQL</p>
          <Link
            href="/login/instructions"
            className="text-blue-600 text-sm hover:underline"
          >
            Give Interview →
          </Link>
        </div>
      </div>
    </main>
  </div>
</div>

  );
}
