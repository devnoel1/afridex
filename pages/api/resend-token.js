import { verifyEmailTmp } from "../../emailTmps/verifyEmailTmp";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import AccessToken from "../../models/AccessToken";

export default async function handler(req, res) {
  await dbConnect();
  // get method
  const { method } = req;

  switch (method) {
    case "POST":
      // check request body
      const { email } = req.body;

      // get user by email
      const user = User.findBy({ email });

      // check if email exist
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "email not found" });

      // get existing token from verify table
      const token = await  AccessToken.findById(user.email);

      // send email
      verifyEmailTmp(user, token.token);

      res.status(201).json({
        success: true,
        message: "A new OTP has been sent to your email",
      });

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
