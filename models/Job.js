import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  jobType: String, // Frontend, Backend etc

  recruiterId: {
    type: String, // clerkId of recruiter
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
