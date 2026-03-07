import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Interview from "@/app/models/Interview";
import Job from "@/app/models/Job";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const candidateId = searchParams.get("candidateId");

    if (!candidateId) {
      return NextResponse.json(
        { message: "candidateId is required" },
        { status: 400 }
      );
    }

    const interviews = await Interview.find({
      candidateId: candidateId,
    }).lean();

    console.log("Interviews Found:", interviews);

    const interviewsWithJob = await Promise.all(
      interviews.map(async (interview) => {
        console.log("Looking for jobId:", interview.jobId);

        const job = await Job.findOne({ jobId: interview.jobId }).lean();

        console.log("Job Found:", job);

        return {
          ...interview,
          jobRole: job ? job.title : "Unknown Role",
        };
      })
    );

    return NextResponse.json(interviewsWithJob);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}