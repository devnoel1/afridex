import dbConnect from "../../lib/dbConnect";

import User from "../../models/User";
import AccessToken from "../../models/AccessToken";

import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();

  // get request method
  const { method } = req;

  switch (method) {
    case "POST":
      // get token from request
      const { otp } = req.body;

      if (!otp || otp == "")
        return res
          .status(400)
          .send({ success: false, message: "otp cannot be empty" });

      // get token
      const checkToken = await AccessToken.findOne({ token:otp });

      // check if token exists
      if (!checkToken)
        return res
          .status(400)
          .send({ success: false, message: "Invalid token" });

      // get user
      const user  = await User.findOne({email:checkToken.email})

      user.emailVerifiedAt = moment().format("MM/DD/YYYY hh:mm:ss")
      user.verified = 1

      await user.save()

      // response
      res
        .status(201)
        .send({ success: true, message: "account verified successfully " });

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
