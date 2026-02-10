import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Job from "@/app/models/Job";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const job = await Job.create(data);

    return NextResponse.json(job);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
