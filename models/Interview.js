import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },

  candidateId: String,  // clerkId
  recruiterId: String,  // clerkId

  startedAt: Date,
  endedAt: Date,

  score: Number,   // 0–100
  result: String,  // PASS / FAIL / PENDING

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
