import mongoose from "mongoose";

const User = new mongoose.Schema({
  userName: String,
  aadharNo: Number,
  income: Number,
  status: String,
  reasonForDenial: String,
});

export default mongoose.models.User || mongoose.model("User", User);
