// pages/api/auth/getUser.js
import clientPromise from "@/app/lib/mongo";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("yourDbName");

    const user = await db.collection("users").findOne({
      clerkId: req.headers["clerk-id"], // or use your auth method
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ name: user.name, role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}