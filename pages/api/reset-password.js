import dbConnect from "../../lib/dbConnect";

import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  // get request method
  const { method } = req;

  switch (method) {
    case "POST":
      // get token from request
      let { password } = req.body;
      let { token } = req.body;

      if (!password || !token)
        return res.status(400).send({
          success: false,
          message: "password and token cannot be empty",
        });

      // get token
      const user = await User.findOne({ PasswordResetToken: token });

      // check if token exists
      if (!user)
        return res
          .status(400)
          .send({ success: false, message: "Invalid user token" });

      user.password = password;
      user.PasswordResetToken = "";
      await user.save();

      // response
      res
        .status(201)
        .send({ success: true, message: "Password changed successfully" });

      break;
    default:
      res.status(400).json({ success: false, message: "invalid request" });
      break;
  }
}
