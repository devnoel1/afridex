import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  balance: { type: String, required: true, default: 0.00 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports =
  mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
