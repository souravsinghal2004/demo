import { connectDB } from "@/app/lib/mongo";
import Job from "@/app/models/Job";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;   // ✅ FIX HERE

    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}