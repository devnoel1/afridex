import dbConnect from "../../lib/dbConnect";

import VerifyUser from "../../models/VerifyUser";

import moment from "moment";

export default async function handler(req, res) {
  await dbConnect();

  // get request method
  const { method } = req;

  switch (method) {
    case "POST":
      // get token from request
      const { tokenId } = req.body;

      // get token
      const token = VerifyUser.findOne({ token: tokenId });

      // check if token exists
      if (!token)
        res.status(400).send({ success: false, message: "Invalid token" });

      // get user
      await User.findByIdAndUpdate(token.user, {
        email_verified_at: moment().format("MM/DD/YYYY hh:mm:ss"),
      });

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
