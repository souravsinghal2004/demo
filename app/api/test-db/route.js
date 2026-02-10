import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function GET(req, res) {
  try {
    await connectDB();
    return new Response(JSON.stringify({ status: "DB connected ✅" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: "DB connection failed ❌", error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
