import mongoose from "mongoose";

const VerifyUserSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports =
  mongoose.models.VerifyUser || mongoose.model("VerifyUser", VerifyUserSchema);
