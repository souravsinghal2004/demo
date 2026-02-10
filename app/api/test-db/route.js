import { connectDB } from "../../lib/mongo";

export async function GET(req) {
  try {
    await connectDB();
    return new Response(JSON.stringify({ status: "DB connected ✅" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ status: "DB failed ❌", error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
