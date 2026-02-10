import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { clerkId, name, email, role } = await req.json();

    await User.updateOne(
      { clerkId },
      {
        $set: {
          name,
          email,
          role,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("ERROR:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
