import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Interview from "@/app/models/Interview";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const interview = await Interview.create(data);

    return NextResponse.json(interview);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
