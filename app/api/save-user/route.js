import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { clerkId, name, email, role } = body;

    const existing = await User.findOne({ clerkId });

    if (!existing) {
      await User.create({
        clerkId,
        name,
        email,
        role,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
