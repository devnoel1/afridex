import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import AccessToken from "../../models/AccessToken";
import { generateToken } from "../../utils/Utils";
import pwsEmailTmp from "../../emailTmps/pwsEmailTmp";

export default async function handler(req, res) {
  await dbConnect();

  // get request method
  const { method } = req;

  switch (method) {
    case "POST":
      // check request body
      const { email } = req.body;

      // check if email exist
      const user = await User.findOne({ email:email });

      console.log(user)

      if (!user)
        return res
          .status(422)
          .json({ success: false, message: "email address not found" });

      // check if user is verified
      if (user.email_verified_at)
        return res
          .status(422)
          .json({ success: false, message: "email already verified" });

      // generate token
      const secretToken = await generateToken();

      user.PasswordResetToken = secretToken;

      await user.save();

      pwsEmailTmp(user, secretToken);

      res.status(201).json({
        success: true,
        message: "check your email to verification token",
      });

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
