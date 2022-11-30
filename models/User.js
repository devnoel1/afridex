// models/User.js

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    emailVerifiedAt: { type: String, required: false },
    verified:{type: Boolean,default: 0},
    secretToken: {
      type: String,
    },
    PasswordResetToken: {
      type: String,
    },
    wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wallet" }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // console.log("just before")
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  // console.log("hey")
  const token = jwt.sign({ _id: user._id.toString() }, "auth-token");
  user.tokens = user.tokens.concat({ token });
  // console.log(user.tokens)
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async ({ user_id, password }) => {
  const user = await User.findOne({
    $or: [{ email: user_id }, { user_id: user_id }],
  });

  if (!user) {
    throw new Error("Invalid Credentials!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials!");
  }
  return user;
};

mongoose.models = {};

var User = mongoose.model('User', UserSchema);

export default User;

// module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
