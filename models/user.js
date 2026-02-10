import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: String,
  name: String,
  email: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
