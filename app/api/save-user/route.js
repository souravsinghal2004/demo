import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { clerkId, name, email, role } = await req.json();

    if (!clerkId || !email) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Check if user already exists
    const [rows] = await db.query(
      "SELECT * FROM users WHERE clerk_id = ?",
      [clerkId]
    );

    if (rows.length === 0) {
      // Insert new user
      await db.query(
        "INSERT INTO users (clerk_id, name, email, role) VALUES (?, ?, ?, ?)",
        [clerkId, name, email, role]
      );

      return NextResponse.json({ message: "User saved" });
    }

    return NextResponse.json({ message: "User already exists" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
