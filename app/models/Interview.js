import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  interviewId: String,
  jobId: String,
  candidateId: String,
  recruiterId: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  aiScore: Number,
  confidenceScore: Number,
  audioPath: String,
  cheatingDetected: Boolean,
  aiFeedback: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 👇 FORCE collection name to "interview"
export default mongoose.models.Interview ||
  mongoose.model("Interview", InterviewSchema, "interview");