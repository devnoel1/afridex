import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: String, required: true, default: 0.0 },
    type: { type: String, required: true },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
