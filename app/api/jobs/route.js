import { connectDB } from "@/app/lib/mongo";
import Job from "@/app/models/Job";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const jobs = await Job.find().sort({ createdAt: -1 });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}