import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: String,
  email: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
