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
      const { token } = req.body;

      if (!token || token == "")
        res.status(400).send({ success: false, message: "token cannot be empty" });

      // get token
      const checkToken = User.findOne({ secretToken: token });

      // check if token exists
      if (!checkToken)
        res.status(400).send({ success: false, message: "Invalid token" });

      // response
      res
        .status(201)
        .send({ success: true, message: "Token accepted, Please change your password" });

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
