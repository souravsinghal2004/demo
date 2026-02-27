import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },

    title: String,
    company: String,
    location: String,

    workMode: {
      type: String,
      enum: ["WORK_FROM_HOME", "ONSITE", "HYBRID"]
    },

    jobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "INTERNSHIP"]
    },

    startDate: String,
    duration: String,

    stipend: {
      min: Number,
      max: Number,
      currency: String
    },

    applyBy: Date,

    applicants: {
      type: Number,
      default: 0
    },

    about: String,

    responsibilities: [String],
    requirements: [String],
    goodToHave: [String],
    benefits: [String],

    skills: [String],

    createdBy: String
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);