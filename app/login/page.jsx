"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function UserDashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* FETCH JOBS */
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  /* AUTH GUARD */
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  /* SAVE USER */
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    fetch("/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clerkId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        email: user.primaryEmailAddress?.emailAddress,
        role: "CANDIDATE",
      }),
    });
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r px-6 py-8">
          <h2 className="text-xl font-bold text-blue-600 mb-8">
            Candidate Panel
          </h2>

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

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p>Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p>No jobs available.</p>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
                >
                  <h3 className="text-xl font-semibold mb-1">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-gray-600">{job.company}</p>
                    <span className="text-blue-600 text-sm border border-blue-600 px-3 py-1 rounded-full">
                      Actively hiring
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>
                      🏠 {job.workMode || "Work from home"}
                    </span>

                    {job.stipend && (
                      <span>
                        💰 ₹{job.stipend?.min} - ₹{job.stipend?.max}/month
                      </span>
                    )}

                    {job.duration && (
                      <span>⏳ {job.duration}</span>
                    )}
                  </div>

                  {job.about && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {job.about}
                    </p>
                  )}

                  {job.skills?.length > 0 && (
                    <div className="text-sm text-gray-600 mb-4">
                      {job.skills.join(" • ")}
                    </div>
                  )}

                  <Link
                    href={`/login/jobs/${job._id}`}
                    className="inline-block mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Job
                  </Link>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}