import { connectDB } from "@/app/lib/mongo";
import Job from "@/app/models/Job";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function JobDetailsPage({ params }) {
  await connectDB();

  // ✅ REQUIRED in Next.js 16
  const { jobId } = await params;

  console.log("PARAM ID:", jobId);

  // since you're using Mongo _id in URL
  const job = await Job.findById(jobId).lean();

  if (!job) {
    console.log("JOB NOT FOUND IN DB");
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">

        <Link
          href="/login"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Jobs
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-4">{job.company}</p>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.jobType}</p>
          <p><strong>Start:</strong> {job.startDate}</p>
          <p><strong>Duration:</strong> {job.duration}</p>
        </div>

        {/* Stipend */}
        {job.stipend && (
          <p className="mb-2">
            <strong>Stipend:</strong>{" "}
            ₹{job.stipend?.min} - ₹{job.stipend?.max} / month
          </p>
        )}

        {/* Apply By */}
        {job.applyBy && (
          <p className="mb-4">
            <strong>Apply By:</strong>{" "}
            {new Date(job.applyBy).toLocaleDateString()}
          </p>
        )}

        {/* Applicants */}
        {job.applicants !== undefined && (
          <p className="mb-6 text-gray-500">
            {job.applicants}+ applicants
          </p>
        )}

        <hr className="my-6" />

        {/* About */}
        {job.about && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">About the Role</h2>
            <p>{job.about}</p>
          </div>
        )}

        {/* Responsibilities */}
        {job.responsibilities?.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Responsibilities</h2>
            <ul className="list-disc ml-6 space-y-1">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements?.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Requirements</h2>
            <ul className="list-disc ml-6 space-y-1">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-2">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interview Button */}
        <Link
  href={`/login/instructions?jobId=${job._id}&title=${encodeURIComponent(job.title)}`}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Give Interview
        </Link>

      </div>
    </div>
  );
}